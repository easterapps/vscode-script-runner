<h1>Script Runner for VS Code</h1>


- [What is Script Runner](#what-is-script-runner)
- [How to setup Script Runner](#how-to-setup-script-runner)
- [Use your defined Commands from Command Palette](#use-your-defined-commands-from-command-palette)
- [Use your defined Commands from Status Bar](#use-your-defined-commands-from-status-bar)
- [Use keyboard shortcut for specific defined commands](#use-keyboard-shortcut-for-specific-defined-commands)

## What is Script Runner

Run command line scripts (with parameters) directly from #VSCode with a configured form. 
Create and customize your own commands to simplify your way of working.



Follow the instructions [How to setup Script Runner](#how-to-setup-script-runner) to use this extension.



## How to setup Script Runner

1. Use `ctrl+shift+P` or `F1` to invoke the Command Palette
2. Type `Preferences: Open Settings (JSON)`
3. Add/copy basic configuration to ``settings.json``


```json
  "script-runner.statusBar" : false,
  "script-runner.commands": {
    "commands": [
      
      
    ],
    "variables": {
  
    }
  }
   ```

4. Add command definitions to ``commands``

```json
      {
        "identifier": "test",
        "description": "Test Runner",
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
            "options": ["Option 1", "Option 2", "Option 3"]
          }
        ]
      }
```
5. Define variables for all command definitions in ``variables``
```json
"variables": {
  "$tmp": "./"
}
```

## Use your defined Commands from Command Palette
1. Use `ctrl+shift+P` or `F1` to invoke the Command Palette.
2. Type `Script Runner: Run`.
3. Your list of commands will appear, you can then select the one to execute.
4. If your command has a form, the questions will be displayed.
5. The command will be executed.


9. You can bind a keyboard shortcut to the command. Keyboard Shortcuts `script-runner.$command_identifier$`.

## Use your defined Commands from Status Bar
If you enable the statusbar item, it will be placed at the right corner of the bottom status bar.
```json
"script-runner.statusBar" : true,
```

## Use keyboard shortcut for specific defined commands
You can bind a keyboard shortcut to the command. Keyboard Shortcuts `script-runner.$command_identifier$`.

