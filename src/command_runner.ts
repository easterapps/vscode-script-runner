
import { workspace, window, OutputChannel, TerminalOptions } from "vscode";
import { IConfiguration, ICommandConfiguration, IFormConfiguration } from "./configuration";
import { VariableManager } from "./variable_manager";
import { Terminal } from "./terminal";

export class CommandRunner {
	private outputChannel: OutputChannel;
	private variableManager: VariableManager;

	public constructor(variableManager: VariableManager) {
		this.variableManager = variableManager;

		this.outputChannel = window.createOutputChannel('Script Runner');

	}

	public executeCommand(command: ICommandConfiguration) {
		const executeCommandInShell = () => {
			let builtCommand = command.command;
			let currentTerminal;
			let options: TerminalOptions;


			if (!builtCommand) {
				window.showErrorMessage('The executed command does not define a command to execute. Nothing will be executed.');
				return;
			}

			builtCommand = this.variableManager.resolveVariables(builtCommand, variables);

			if (!builtCommand) {
				window.showErrorMessage('The executed command produced an empty command string. Nothing will be executed.');
				return;
			}



			const useCustomShell = workspace.getConfiguration().get<Boolean>('script-runner.customShell.enabled');

			if (useCustomShell) {

				options = {
					cwd: command.working_directory ? this.variableManager.resolveVariables(command.working_directory, variables) : undefined,
					shellPath: workspace.getConfiguration().get<string>('script-runner.customShell.path'),
				};

			} else {
				options = {
					cwd: command.working_directory ? this.variableManager.resolveVariables(command.working_directory, variables) : undefined,
				};

			}
			currentTerminal = Terminal.getTerminal(options);
			currentTerminal.sendText(builtCommand);
			this.outputChannel.appendLine('Executing command: ' + builtCommand + ' with options ' + JSON.stringify(options));
		};

		const variables: { [id: string]: string } = this.variableManager.getVariables();
		const form = command.form || [];
		if (form && form.length > 0) {
			let currentStep = 0;
			const firstStep = form[currentStep];

			const askQuestion = (step: IFormConfiguration) => {
				if (step.options) {
					return window.showQuickPick(step.options, {
						placeHolder: step.question,
						ignoreFocusOut: true,
					});
				} else {

					return window.showInputBox({
						prompt: step.question,
						value: step.default,
						password: step.password,
						ignoreFocusOut: true,
					});
				}
			};

			const instantiateQuestion = (step: IFormConfiguration): any => {
				console.log('Displaying question', step.question);
				return askQuestion(step).then((value?: string) => {
					console.log(step.question);
					console.log(value);
					if (!value) {
						return;
					}

					variables[step.variable] = value;
					++currentStep;

					if (!form[currentStep]) {
						executeCommandInShell();
						return;
					}

					return instantiateQuestion(form[currentStep]);
				});
			};

			return instantiateQuestion(firstStep);
		} else {
			executeCommandInShell();
		}
	}

	public runCommand() {
		const configuration = workspace.getConfiguration().get<IConfiguration>('script-runner.definitions');

		if (!configuration) {
			return;
		}

		const configurationCommands = configuration.commands || [];
		const commands: { [id: string]: ICommandConfiguration } = {};
		const items: Array<string> = [];
		for (const command of configurationCommands) {
			if (!command.description) {
				continue;
			}

			commands[command.description] = command;
			items.push(command.description);
		}

		window.showQuickPick(items, {
			placeHolder: 'Which command do you want to run?',
			ignoreFocusOut: true,
		}).then((value?: string) => {
			if (!value) {
				return;
			}


			const command = commands[value];

			this.executeCommand(command);
		});
	}

}
