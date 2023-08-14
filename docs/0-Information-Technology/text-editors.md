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

- **Setting**
  - it can be get at three levels - Global / User / Workspace, either via GUI or via modifying JSON.
  - press `ctrl shift p` then type `preferences` to open GUI or JSON settings.
  - **Workspace** is specifically to a folder or project level and overrides all other settings. `.\.vscode\settings.json` in project folder can have all the modifications.
  - **User Settings** apply to all the projects of a user.

- **Snippets**
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

- **Key Bindings**
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






- **Sync Settings** - VS Code can be logged in using GitHub to start sync settings.

- Extensions can be disabled when not in use.
- open `~/.config/Code/User/settings.json` to add extension configurations
- add below codes within the curly braces

### Macro in VS Code

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

### Markdown in VS Code

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

