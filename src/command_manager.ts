import { IConfiguration } from "./configuration";
import { workspace, Disposable, window, commands } from "vscode";
import { CommandRunner } from "./command_runner";

export class CommandManager {
	private commandRunner: CommandRunner;
	private registeredCommands: { [id: string]: Disposable } = {};
	public constructor(commandRunner: CommandRunner) {
		this.commandRunner = commandRunner;

	}

	public registerCustomCommands() {
		const configuration = workspace.getConfiguration().get<IConfiguration>('script-runner.definitions');

		if (!configuration) {
			return;
		}

		// Unregister commands
		for (let key in this.registeredCommands) {
			this.registeredCommands[key].dispose();
		}
		this.registeredCommands = {};

		const configurationCommands = configuration.commands || [];
		for (const command of configurationCommands) {
			if (!command.identifier) {
				continue;
			}

			// Command with this identifier is already registered
			if (this.registeredCommands[command.identifier]) {
				window.showErrorMessage(command.identifier + ' is already registered. Make sure to assign a unique identifier to each of your commands!');
				continue;
			}

			this.registeredCommands[command.identifier] = commands.registerCommand('script-runner.' + command.identifier, () => {
				console.log(command);
				this.commandRunner.executeCommand(command);
			});



		}
	}

}
