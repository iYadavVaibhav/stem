# Regex

Regex are in simple terms "a sequence of characters that define a search pattern"

- basic is `*.gif` where * means anything.

- `Position` of search
  - `^` - starts with - `^Simple` - any line that start with this
  - `$` - ends with - `park$` - any line that end with this

- `Frequency` of occurrence
  - `*` - 0 or more - `ab*` a followed by zero or more b's
  - `+` - 1 or more - `ab+` - the letter a followed by one or more b's
  - `?` - 0 or 1 - ab? - zero or just one b
  - `{n}` - n exactly - ab{2} - the letter a followed by exactly two b's
  - `{n,}` - n or more - ab{2,} - the letter a followed by at least two b's
  - `{n,y}` - n to y occurrence - ab{1,3} - the letter a followed by between one and three b's

- `Class` of characters - list or range, and are case-sensitive
  - Range - `[a-z]` or `[A-Z]` or `[0-9]`
  - List - `[a,d,p,w]` or `[adpwKRM]` - match any single character
  - Mix - `[A-Z2-4pw]` - matches range A-Z, 2-4 and literally p, and literally w
  - Except - `[^abXyP-Q]` and character except what is in

- `Flags` to search for special types of characters without needing to list them in a range
  - `.` m any character
  - `\s` - whitespace - `\S` opposite
  - `\w` - word - `\W` not a word
  - `\d` - digit (number) - `\D` not a digit
  - `\b` - word boundary - `ate\b` finds ate at end of word, eg, plate but not gates.- `\B` not boundary

- Other
  - `\n` `\r` `\t` `\0` - new line, carriage, tab, null
  - `|` - or - `The (?:cat|dog) jumps` matches cat or dog

- Regex Groups
  - In Find: you can use regex with "capturing groups," e.g. `I want to find (group1) and (group2)`, using parentheses
  - In Replace: you can refer to the capturing groups via $1, $2 etc.
  - Eg, **VS Code** - to use what you found in replace use `$1`, eg, find `<h1>(.+)</h1>`, replace `<b>$1</b>`. Replaces `<h1>Todo</h1>` with `<b>Todo</b>`
  - more [here](https://stackoverflow.com/a/61291370/1055028).

## Regex in JavaScript

```javascript
// find and replace with space globally for all occurance
someString.replaceAll(new RegExp('[:,/,.]','g'),' ')

// replace an occurance in string
someString.replace(/h1/,'h2')
```

## Snippets

- multiline with one line `\s\n+` `\n`
- remove end whitespace `\s+\n` `\n`

- Remove single line comments // from code:

  - `\/\/.*$\n` - Finds all single line comments starting with //.
    - `\/\/` - string has //
    - `.*` - then has anything after that
    - `$\n` - then matches next line as well.

**Remove Trailing whitespace**

- Find: `\s+$`
- Replace: ``

**Remove trailing whitespace** from only those lines that **have text**

- Find: `(\S+)(\s+)$`
- Replace: `$1`
- It finds trailing text as first group `(\S+)`, then trailing whitespace just after text as second group `(\s+)` and at end of line `$`.
- Then replaces both groups by just the first group `$1`.

**Whatsapp from Markdown**

- This snippet lets you convert markdown to be formatted in most correct way for whatsapp chat.
- Find `**` Replace `*`. Finds bold, makes them bold for Whatsapp.
- Find `#+ (.+)\n` Replace `*$1*\n`. Finds headings, replaces them with bold line.

## Links

- Check and Validate on [Regex101](https://regex101.com/)

