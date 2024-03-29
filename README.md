<h1>cmd exec for VS Code</h1>

![version](https://vsmarketplacebadge.apphb.com/version/easterapps.script-runner.png)
![version](https://vsmarketplacebadge.apphb.com/rating-star/easterapps.script-runner.png)

- [What is cmd exec](#what-is-cmd-exec)
- [How to setup cmd exec](#how-to-setup-cmd-exec)
- [Full Configuration Sample](#full-configuration-sample)
- [Usage](#usage)
  - [Use your defined Commands from Command Palette](#use-your-defined-commands-from-command-palette)
  - [Use your defined Commands from Status Bar](#use-your-defined-commands-from-status-bar)
  - [Use keyboard shortcut for specific defined commands](#use-keyboard-shortcut-for-specific-defined-commands)
- [Use a different shell](#use-a-different-shell)
- [Contributing](#contributing)

## What is cmd exec

Run command line scripts (with parameters) directly from #VSCode with a configured form.
Create and customize your own commands to simplify your way of working.

Follow the instructions [How to setup cmd exec](#how-to-setup-script-runner) to use this extension.

## How to setup cmd exec

1. Use `ctrl+shift+P` or `F1` to invoke the Command Palette
2. Type `Preferences: Open Settings (JSON)`
3. Add/copy basic configuration to `settings.json`

```json
  "script-runner.statusBar" : false,
  "script-runner.definitions": {
    "commands": [


    ],
    "variables": {

    }
  }
```

4. Add command definitions to `commands`

Sample command definition:

```json
{
  "identifier": "test",
  "description": "Test Runner",
  "command": "echo $var1 $var2",
  "working_directory": "./",
  "form": [
    {
      "variable": "$var1",
      "question": "What is $var1?",
      "default": "Test 1"
    },
    {
      "variable": "$var2",
      "question": "What is $var2?",
      "options": ["Option 1", "Option 2", "Option 3"]
    }
  ]
}
```

5. Define variables for all command definitions in `variables`

```json
"variables": {
  "$tmp": "./"
}
```

| Name                   | Description                                                                                            | Required | Type    |
| ---------------------- | ------------------------------------------------------------------------------------------------------ | -------- | ------- |
| `identifier`           | Identifier used to do key binding. Use alphanumerical and hyphen/underscore only.                      | yes      | string  |
| `description`          | Description of the command.                                                                            | yes      | string  |
| `command`              | Command to execute (with variables).                                                                   | yes      | string  |
| `working_directory`    | The working directory in which to execute the script.                                                  |          | string  |
| `form`                 | A list of questions to ask in order to obtain values for variables.                                    |          | array   |
| `variable`             | The variable name.                                                                                     |          | string  |
| `question`             | The question to ask the user.                                                                          |          | string  |
| `password`             | Input is a password. Default is false.  Suggestion: use also show_in_console: false                    |          | boolean |
| `default`              | The default value to put in the field. Only for text inputs.                                           |          | string  |
| `defaultValuePath`     | Overrides the default value with the current file path. Empty if no file open. password option ignored |          | boolean |
| `defaultValueFilename` | Overrides the default value with the current filename. Empty if no file open. password option ignored  |          | boolean |
| `options`              | List of options (string)                                                                               |          | array   |
| `variables`            | List of variables (string)                                                                             |          | array   |

## Full Configuration Sample

```json
"script-runner.statusBar": true,
"script-runner.definitions": {
    "commands": [
      {
        "identifier": "test",
        "description": "Test Runner 1",
        "command": "echo $var1 $var2",
        "working_directory": "$tmp",
        "form": [
          {
            "variable": "$var1",
            "question": "What is $var1?",
            "default": "Test 1"
          },
          {
            "variable": "$var2",
            "question": "What is $var2?",
            "options": [
              "Option 1",
              "Option 2",
              "Option 3"
            ]
          }
        ]
      },
      {
        "identifier": "test2",
        "description": "Test Runner 2",
        "command": "echo $var1 ",
        "working_directory": "$tmp",
        "form": [
          {
            "variable": "$var1",
            "question": "What is $var1?",
            "default": "Test 1"
          }
        ]
      },
      {
        "identifier": "filepath1",
        "description": "Filepath",
        "command": "echo $path ",
        "working_directory": "$tmp",
        "form": [
          {
            "variable": "$path",
            "question": "What is the path",
            "defaultValuePath": true
          }
        ]
      }
    ],
    "variables": {
      "$tmp": "./"
    }
  }

```

## Usage

### Use your defined Commands from Command Palette

1. Use `ctrl+shift+P` or `F1` to invoke the Command Palette.
2. Type `Script Runner: Run`.
3. Your list of commands will appear, you can then select the one to execute.
4. If your command has a form, the questions will be displayed.
5. The command will be executed.

### Use your defined Commands from Status Bar

If you enable the statusbar item, it will be placed at the right corner of the bottom status bar.

```json
"script-runner.statusBar" : true,
```

### Use keyboard shortcut for specific defined commands

You can bind a keyboard shortcut to the command. Keyboard Shortcuts `script-runner.$command_identifier$`.

## Use a different shell

```json
"script-runner.customShell.enabled": true,
"script-runner.customShell.path": "/bin/sh",
```

## Contributing

File bugs, feature requests in [Github Issues](https://github.com/easterapps/vscode-script-runner/issues).

**Leave a review on [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=easterapps.script-runner).**
