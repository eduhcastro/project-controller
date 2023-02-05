import * as vscode from 'vscode';
import FileController from './controllers/FileController';
import UtilsController from './controllers/UtilsController';

var Loaded = false;

/**
 * ProjectController
 * 
 * @description An extension for Visual Studio. Have full control of your 
 * projects, editing/creating new files.
 * @author Eduardo Castro <Skillerm>
 * @version 2.0.0
 */
var ProjectController;

export function activate(context: vscode.ExtensionContext) {

	//console.log('Congratulations, your extension "project-logs" is now active!');

	/**
	 * Folder
	 * @description Get courrent path of the folder
	 * @return string
	 */
	const Folder = vscode.workspace.workspaceFolders?.map(folder => folder.uri.path)[0].substring(1) ?? "UNDEFINED";

	/**
	 * NameLogs
	 * @description Get name of the folder logs, is project-controller-date
	 * @return string
	 */
	const NameLogs = UtilsController.GenerateLogName(Folder);

	ProjectController = vscode.commands.registerCommand('project-controller.init', () => {

		// Doesn't let the project start more than once
		if (Loaded) {
			vscode.window.showInformationMessage('Project Controller already initialized!');
			return;
		}

		Loaded = true;

		// Create folder to logs
		FileController.CreateLogsFolder(NameLogs);

		// Create file Txt Contain all files in project
		FileController.CreateInitFile(NameLogs);



		/**
		 * Watcher
		 * 
		 * @param Folder
		 * @description Watch all files in folder
		 * @decrapted 
		 */
		//var watcher = chokidar.watch(Folder, { ignored: /^\./, persistent: true });
		// watcher.on('add', function (path, stats) {
		// 
		/**
		 * @note Every time Chokidar starts it reads all files as new files, for
		 * now my method was to save all current files in a txt and do a check
		 */
		// 
		// 	path = path.replace(/\\/g, "/");
		// 
		// 	// Check if file is in folder logs
		// 	if (path.indexOf('project-controller') == -1 && !FileController.FindStrInTextFile(NameLogs + '/init-' + UtilsController.GetDate() + '.txt', path)) {
		// 		FileController.CreateNew(path, NameLogs, Folder) // --> Or copy :p
		// 		vscode.window.showInformationMessage('New file added in project-controller');
		// 	}
		// })
		// 
		// 	.on('change', function (path) {
		// 		path = path.replace(/\\/g, "/");
		// 		if (path.indexOf('project-controller') == -1) { // --> Ignore files edited in folders contain project-logs
		// 			FileController.CreateNew(path, NameLogs, Folder) // --> Or copy :p
		// 			vscode.window.showInformationMessage('File changed in project-controller');
		// 		}
		// 	})
		// .on('unlink', function (path) { console.log('File', path, 'has been removed'); })
		// .on('error', function (error) { console.error('Error happened', error); })


		vscode.window.showInformationMessage('Project Controller Loaded!');
	})

	let onSaveCleaner = vscode.workspace.onDidSaveTextDocument((e) => {

		var path = e.fileName.replace(/\\/g, "/");
		if (path.indexOf('project-controller') == -1) { // --> Ignore files edited in folders contain project-logs
			FileController.CreateNew(path, NameLogs, Folder) // --> Or copy :p
			FileController.WriteInitFile(NameLogs, `${path} - ${UtilsController.GetFullDate()}`);
			vscode.window.showInformationMessage('Change made to the project-controller!');
		}

	});

	context.subscriptions.push(ProjectController);
	context.subscriptions.push(onSaveCleaner);
}

// This method is called when your extension is deactivated
export function deactivate() {
	vscode.window.showInformationMessage('Project Controller Unloaded!');
}

