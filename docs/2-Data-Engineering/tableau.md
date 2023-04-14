---
description: Tableau Notes
date: 2022-05-15
---

# Tableau

Tableau is a data analysis and visualization tool.

## Date Calculations

Here are some basic common calculations that helo in making **KPIs** and easy working with dates to find YOYs and MOMs

- Month-Year to Business Date `DATEPARSE('yyyy-MM-dd',[Business Month]+'-01')`
- Month-Year to Business Year - `Left([Business Month],4)`
- Max Date - `{MAX([Business Date])}`

- Monthly

```javascript
IF ( DATEDIFF('month', [Business Date], [Max Date], 'monday') = 0  AND DAY([Business Date])<=DAY([Max Date]))
THEN 'Current Month'
ELSEIF ( 
    DATEDIFF('month', [Business Date], [Max Date], 'monday') = 1
    //AND
    //DAY([Business Date])<=DAY([Max Date])
)
THEN 'Last Month'
ELSEIF ( 
    DATEDIFF('month', [Business Date], [Max Date], 'monday') = 12 
    // AND DAY([Business Date])<=DAY([Max Date])
)
THEN 'Last Year Month'
END
```

- Rolling 13 months

```javascript
[Business Date] > DATEADD('month',-13,{MAX([Business Date])})
and
[Business Date] <= {MAX([Business Date])}
```

- yearly

```javascript
IF ( DATEDIFF('year', [Business Date], [Max Date], 'monday') = 0   AND MONTH([Business Date])<=MONTH([Max Date]))
THEN 'Current Year'
ELSEIF ( 
    DATEDIFF('year', [Business Date], [Max Date], 'monday') = 1  
    AND ( 
            (  MONTH([Business Date]) <= MONTH([Max Date])  ) 
            //OR 
            //( 
                // ( MONTH([Business Date])=MONTH([Max Date]) ) AND ( DAY([Business Date])<=DAY([Max Date]) ) 
            //)
        )
)
THEN 'Last Year'
END
```

- CM `SUM(IIF([Monthly]=='Current Month',[Closed Customers],NULL))`

- MOM

```javascript
(
    SUM(IIF ([Monthly] == 'Current Month',[Users],0)) - 
    SUM(IIF ([Monthly] == 'Last Month',[Users],0) ) 
)
/
SUM(IIF ([Monthly] == 'Last Month',[Users],0))
```

- MOM up `IF [Closed Customers MOM] > 0 THEN "▲" END`
- MOM Donw `IF [Closed Customers MOM] <= 0 THEN "▼" END`

- YOY

```javascript
( SUM(IIF ([Yearly] == 'Current Year',[Closed Customers],0)) - SUM(IIF ([Yearly] == 'Last Year',[Closed Customers],0) ) )
/
SUM(IIF ([Yearly] == 'Last Year',[Closed Customers],0))
```

- YOY Up `IF [Closed Customers YOY] > 0 THEN "▲" END`
- YOY Donw `IF [Closed Customers YOY] <= 0 THEN "▼" END`
- YTD `SUM(IIF([Yearly] == 'Current Year',[Closed Customers],0))`

**KPI Format**

- small arrows `0%  ⯅; -0% ⯆; 0%⠀⠀;` ⯇ ⯈ ⯅ ⯆
- ⮜ ⮞ ⮝ ⮟ `0%  ⮝; -0% ⮟; 0%⠀⠀;`  \(U+2800\)
- 🡄 🡆 🡅 🡇 `0%  🡅; -0% 🡇; 0%⠀⠀;`
- more arrows - <http://xahlee.info/comp/unicode_arrows.html>

TUG Austia - <https://github.com/tableau/community-tableau-server-insights> - readymade events

**Number Tweaks**

Number standardize between 0 and 1 per category for trend line colors

```javascript
(
    SUM([Value ]) - WINDOW_MIN(SUM([Value ])) 
)
 /
(
    WINDOW_MAX(SUM([Value ])) - WINDOW_MIN(SUM([Value ])) 
)
```


## Tableau JS Embedd API

- Everything starts by loading a `viz`, this can be a dashboard or a sheet. Viz gives you `workbook` and Async callback function.
- `workbook` has `sheets`, but can have only one `activeSheet`, like active Tab. You can only do operations on activeSheet.
- Operations are `Async` and return a promise, so they can be chained.
  - Change Param  - `changeParameterValueAsync("param_name", value)`
  - Change Filter - `applyFilterAsync("filter_name", values, tableau.FilterUpdateType.REPLACE)`
  - Change ActiveSheet - `activateSheetAsync("sheet_name")` this can be dashboard or sheet
  - Get Data - `getSummaryDataAsync(data_options)` - returns table object with data and columns

Network calls are made when you call Async funcitons, else it is a JS execution only.

Read Data:

- create sheet with all columns added to row pill.
- activate this sheet,
- then do `getData`,
- to skip chache, increment counter.

Writeback:

- Add a proc as data source. Proc to have at least three inputs, Switch, Value and Counter.
- Create these params in workbook
  - `switch`
    - 0 - no action
    - 1 - CREATE/insert
    - 2 - UPDATE
    - 3 - DELETE
  - `psv` - pipe separated values
  - `counter` - increment it whenever you want tableu to skip cache and call database server.
- Create sheet `exec_proc`, whenever this sheet is activated, it will execute proc depending on the three params above.

```js
async function execProcTabeauAsync(switch,psv) {
    await workbook.changeParameterValueAsync("psv", psv);
    await workbook.changeParameterValueAsync("counter", ++counter);
    await workbook.changeParameterValueAsync("switch", switch);
    await workbook.activateSheetAsync("exec_proc");
    console.log('Action: ' + switch + '; Completed at: ' + new Date($.now()).toISOString());
    return await workbook.changeParameterValueAsync("switch", 0);
}
```

## Writeback

Parameters Required

- `w_mega_string`
- `w_increment`
- `w_action_switch`

- For each field to write
  - `reset_field1`

Create New

- Add sheet `add_button`, use `blank_db` having text "+ Add new record"
- Add sheet to dashboard
- Add actions
  - go to `create_record` sheet
  - reset `field`
  - set param `action_switch` to 0

## Links

- Data Structuring for Analysis - <https://help.tableau.com/current/pro/desktop/en-us/data_structure_for_analysis.htm>
- [Linkedin - Writeback to MS SQL using Proc](https://www.linkedin.com/pulse/how-tableau-writeback-microsoft-sql-server-withtout-using-daugaard/)
