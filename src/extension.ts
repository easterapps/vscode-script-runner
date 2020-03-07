'use strict';

import * as vscode from 'vscode';
import { CommandManager } from './command_manager';
import { CommandRunner } from './command_runner';
import { VariableManager } from './variable_manager';
import { workspace } from "vscode";

let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
export function activate(context: vscode.ExtensionContext) {
	const outputChannel: vscode.OutputChannel = vscode.window.createOutputChannel('Script Runner');
	const variableManager = new VariableManager;
	const commandRunner = new CommandRunner(variableManager);
	const commandManager = new CommandManager(commandRunner);

	// Initial command registration
	commandManager.registerCustomCommands();



	const onDidChangeConfiguration = vscode.workspace.onDidChangeConfiguration(() => {
		outputChannel.appendLine('Configuration changed... Refreshing...');
		commandManager.registerCustomCommands();
		outputChannel.appendLine('Refresh done!');
		updateStatusBarItem(context);
	});

	const runCommand = vscode.commands.registerCommand('script-runner.run', () => commandRunner.runCommand());


	setupStatusBar();
	updateStatusBarItem(context);

	context.subscriptions.push(
		onDidChangeConfiguration,
		runCommand,
		statusBarItem
	);
}

export function setupStatusBar() {
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = 'script-runner.run';
	statusBarItem.text = `Script Runner`;
}
export function updateStatusBarItem(context: vscode.ExtensionContext): void {

	const statusBar = workspace.getConfiguration().get<Boolean>('script-runner.statusBar');

	if (statusBar) {
		statusBarItem.show();
	} else {
		statusBarItem.hide();
	}

}


// this method is called when your extension is deactivated
export function deactivate() {
}
