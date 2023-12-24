---
description: Text Editors - Customizations/Plugins/Hacks for Sublime, VS Code and Vim
date: 2020-07-14
---

# Text Editors

If you love coding text editors are your sharp tools. Customizing them to your needs will help you save time and increase productivity.

## Sublime Text

### How to use Python script with Key Bindings

We will create a sample package that will display time on status bar when we press keys `ctrl+shift+c`, just for demonstrating.

- Create a new python file inside Users Package Library. On Mac with Sublime Text 3 it can be created at: `Users/yourname/Library/Application Support/Sublime Text 3/Packages/User/any_name.py`

- In the python file add following content:

```py
import sublime
import sublime_plugin
import time

class MyCustomMessageCommand(sublime_plugin.WindowCommand):
    
    # Command shows message on Status Bar
    def run(self):
        now = time.strftime("%c")
        message = "The time is " + now
        sublime.status_message(message)
```

- Add the key bindings:

```py
[
  {
    "keys" : ["ctrl+shift+c"], 
    "command" : "my_custom_message" 
  }
]
```

As you can see that the python class name becomes the command name with _ added.

Now on pressing `ctrl+shift+c` you can execute this python file which displays the time on status bar in this case.

You can use this feature to unlimited possibilities. I used it to add timestamp to file whenever it was saved.

References:

- <https://forum.sublimetext.com/t/automatically-updated-timestamp/7156/7>

### Extending Sublime Text for Markdown Support

If you want more syntax highlighting and better preview of what you write then you can extend Sublime Text by installing  package, follow steps below:

- Type: ``Cmd + Shift + P`` to open package manager.
- Then type ``install package`` and hit enter. This will provide you list of available packages from packagecontrol.io
- Next when you get dropdown type ``Markdown`` and this will list you all markdown related packages.
- You can select ``Markdown Editing`` to install the package. This provides much better highlighting and preview.

I, personally, didn't like it much and was a bit distracting for me. So I removed this package. But you may like it.

Removing a package from Sublime Text:

- press ``Cmd + Shift + P`` and
- then type ``remove package``. This will give you list of packages installed and
- next select ``Markdown Editing`` to remove it.


## VS Code

VS Code is general purpose light weight highly customizable text editor. Suports remote environment editing.



### Settings

You can customize settings either via GUI or via modifying JSON `ctrl shift p` and type `preferences`. It has three levels:

- **Workspace** is specifically to a folder or project level and overrides all other settings. File is located at `.\.vscode\settings.json` in project folder can have all the modifications. It can be part of your git to keep others in sync.
- **User** apply to all the projects of a user. Path is `~/.config/Code/User/settings.json`
- **Global** applies to all users on a system.


**Sync Settings** - VS Code can be logged in using GitHub to start sync settings.

- Extensions can be disabled when not in use.
- open `~/.config/Code/User/settings.json` to add extension configurations
- add below codes within the curly braces

**Proxy Settings**

You may be behind a proxy server and need proxy settings to allow http requests to happen. To add proxy to vs code add following key-value in `settings.json`:

```json
"http.proxy": "http://<username>:<password>@<url>:<port>",
```

### Extensions

They are developed to enhance the functionality of VS Code. Each extension has settings that can be added to VS Code JSON settings at all level workspace, user ot global.

### Snippets

- what - they are code template with place holders
- run - there can be invoked with `ctrl+space` or binded to key
- create - it can language specific or global. It can be defined in `Code/User/snippets/markdown.json` to be language specific. Each snippet has a name (key), under which (nested key:value) we define prefix, body and description. prefix triggers and body is inserted. Body can have variables and placeholders: $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the same ids are connected. Eg:

  ```json
  "Print to console": {
      "prefix": "log",
      "body": [
          "console.log('$1');",
          "$2"
      ],
      "description": "Log output to console"
  }
  ```

- more here [Code Visualstudio - User defined snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

### Key Bindings

- it can be updated in JSON. `ctrl shifp p > shortcuts json`. In a list you can add your mappings. Eg:


  ```json
  [
      {
          "key": "ctrl+alt+s",
          "command": "macros.url2mkd", // ext.command
      },
      {
          "key": "ctrl+alt+d",
          "command": "editor.action.insertSnippet",
          "when": "editorTextFocus && editorLangId == 'markdown'",
          "args": {
              "snippet": "\n\n```${1:python}\n$0\n```\n", // or name of snippet
          }
      },
  ]
  ```



### Ext: Flake8 in VS Code

It is one of the best linter for Python. A linter is a tool to help you improve your code. It advises you about code quality by displaying warnings and errors.

**Install** - `pip install flake8`

**Configure** - In VS Code settings

```json
// Flake8 - ignore rules
"python.linting.flake8Args": [
    "--max-line-length=120",
    "--ignore=E402,E501,W293,E302,E303,W391",
],
// E402 - Module level import not at top of file
// E501 - Line lengths are recommended to be no greater than 79 characters
// W293 - Blank line contains whitespace
// E302 - 2 blank lines
// E303 - too many blank lines
// W391 - blank line at end of file
```

### Ext: Better Jinja

Better code formatting, highlighting and intellisense for Jinja Templates. From select-language-mode `ctrl+k m` select `jinja-html`.

Congigure the settings with following for better and auto association of files:

```json
// Jinja Settings
"files.associations": {
    "*.html": "jinja-html"
},
"emmet.includeLanguages": {
    "jinja2": "html",
    "jinja-html": "html",
},
"[jinja]": {
    "editor.defaultFormatter": "vscode.html-language-features",
    "editor.detectIndentation": false,
    "editor.tabSize": 2,
    "editor.formatOnSave": true,
},
"[jinja-html]": {
    "editor.defaultFormatter": "vscode.html-language-features",
    "editor.detectIndentation": false,
    "editor.tabSize": 2,
    "editor.formatOnSave": true,
},

```

Link: [StackOverflow - jinja highlighting](https://stackoverflow.com/a/72761998/1055028)

### Ext: Macro in VS Code

You can use Macro in VS Code using extention [macro-commander](https://marketplace.visualstudio.com/items?itemName=jeff-hykin.macro-commander)

- You can run a sequence of vscode commands
- Run javascript with access to vscode object
- open terminal and run sequence of commands
- combine all above

```javascript
var a=await vscode.env.clipboard.readText();
await window.showInformationMessage(`IN : ${a}`);
b = await new URL(a);
c = await b.hostname.split('.')
        .slice(0,-1) // remove domain ext
        .join(' ')
        .replaceAll(new RegExp('[.,\\\\-,\\\\/,:]','g'),' ')+' -'
    +b.pathname.replace(/\\..+/,'') // remove page extension from path
     .replaceAll(new RegExp('[.,\\\\-,\\\\/,:]','g'),' '); // remove . - / : from path

d = await c.split(' ')
    .map(function(word) {return (word.charAt(0).toUpperCase() + word.slice(1))})
    .join(' ');

await window.showInformationMessage(`OUT: ${d}`);
await vscode.env.clipboard.writeText(`[${d}](${a})`)
```

### Ext: Markdown in VS Code

Markdownlint disable rules:

```json
    "markdownlint.config": {
        "default": true,
        "MD007": { "indent": 4 }
    }
```

cSpell disable code check in Markdown code blocks:

```json
    "cSpell.languageSettings": [
        {
            // use with Markdown files
            "languageId": "markdown",
            // Exclude code inline and multiline both
            "ignoreRegExpList": [
                "^\\s*```[\\s\\S]*?^\\s*```",
                "\\s`[\\s\\S]*?\\s*`",
            ]
        }
    ],
```

- Links
  - [Code Visualstudio - Editing Tips-and-tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks#_editing-hacks)

## PyCharm

- Keyboard Shortcuts
  - Back and forth - `ctrl-alt-left` ro `ctrl-alt-right`

