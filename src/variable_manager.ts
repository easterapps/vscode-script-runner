import { workspace } from "vscode";
import { strtr } from "./strtr";
import { IConfiguration } from "./configuration";

export class VariableManager {
	public getVariables(): { [id: string]: string } {
		const configuration = workspace.getConfiguration().get<IConfiguration>('script-runner.commands');

		if (!configuration) {
			return {};
		}

		// We do this because configuration.variables is a proxy to the data, so we can't use it as a dumb object
		const configurationVariables = configuration.variables || {};
		let variables: { [id: string]: string } = {};
		for (let key in configurationVariables) {
			variables[key] = configurationVariables[key];
		}

		return variables;
	};

	public resolveVariables(text: string, variables: { [id: string]: string }) {
		return strtr(text, variables);
	}
}
