export interface IConfiguration {
	commands: ICommandConfiguration[];
	variables: IVariableConfiguration;
}

export interface ICommandConfiguration {
	identifier: string;
	description: string;
	command: string;
	working_directory: string;
	form?: IFormConfiguration[];
	show_in_console?: boolean;
}

export interface IFormConfiguration {
	variable: string;
	question: string;
	default?: string;
	password?: boolean;
	options?: string[];
	defaultValuePath?: boolean;
	defaultValueFilename?: boolean;
}

export type IVariableConfiguration = { [id: string]: string };
