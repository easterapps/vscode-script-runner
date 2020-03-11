import * as vscode from 'vscode';

export class Terminal {
    static termName: string = 'Script Runner';
    static term?: vscode.Terminal;
    static terminalOptions: vscode.TerminalOptions;

    static getTerminal(options: vscode.TerminalOptions) {
        if (!Terminal.term || this.terminalOptions.cwd != options.cwd) {
            options.name = this.termName;
            this.terminalOptions = options;

            Terminal.term = vscode.window.createTerminal(options);
            Terminal.term.show(true);

            // if user closes the terminal, delete our reference:
            vscode.window.onDidCloseTerminal(event => {
                if (Terminal.getTerminal(options) && event.name === Terminal.termName) {
                    this.term = undefined;
                }
            });
        }

        return Terminal.term;
    }
}
