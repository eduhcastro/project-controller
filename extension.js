// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed


var path = require("path");
var chokidar = require('chokidar');
var fs = require("fs");
var glob = require("glob")



function checkIfContainsSync(filename, str) {
	const contents = fs.readFileSync(filename, 'utf-8');
	const result = contents.includes(str);
	return result;
}

function createNewFileInLogs(newfile, target, courrentpath) {
	var file = newfile.split(courrentpath);
	file = file[1];
	if (file.split('/').length > 1) {
		var getlastvalue = file.split('/')[file.split('/').length - 1];
		fs.mkdir(target + file.replace(getlastvalue, ''), (error) => { })
	}
	fs.copyFile(newfile, target + '' + file, (err) => {
		if (err) throw err;
	});
}



/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	var folder = vscode.workspace.workspaceFolders?.map(folder => folder.uri.path)
	folder = folder[0].substring(1)
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "project-logs" is now active!');

	console.log(folder)
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('project-logs.init', function () {

		// get date now
		var date = new Date();
		var dateNow = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		var onlydatenothours = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
		// directory path
		const LogsProjectFolder = folder + '/project-logs-' + onlydatenothours;

		// get only files in folder
		var files = fs.readdirSync(folder, { withFileTypes: true });

		// options is optional
		glob(folder + '/**', function (er, files) {
			if (er) {
				console.log(er)
				return;
			}
			var writeStream = fs.createWriteStream(LogsProjectFolder + '/init-' + onlydatenothours + '.txt');

			for (var i = 0; i < files.length; i++) {
				if (i != 0 && files[i].indexOf('project-logs') == -1) writeStream.write(files[i] + '\n');
			}

			writeStream.end();
			//	console.log(files)
			// files is an array of filenames.
			// If the `nonull` option is set, and nothing
			// was found, then files is ["**/*.js"]
			// er is an error object or null.
		})
		// create new directory
		fs.mkdir(LogsProjectFolder, (error) => { })

		var watcher = chokidar.watch(folder, { ignored: /^\./, persistent: true });
		//console.log(files[0].type)
		watcher
			.on('add', function (path, stats) {

				path = path.replace(/\\/g, "/");
				if (path.indexOf('project-logs') == -1 && !checkIfContainsSync(LogsProjectFolder + '/init-' + onlydatenothours + '.txt', path)) {
					createNewFileInLogs(path, LogsProjectFolder, folder)
					vscode.window.showInformationMessage('New file added in project-logs');
				}
			})

			.on('change', function (path) {
				path = path.replace(/\\/g, "/");
				if (path.indexOf('project-logs') == -1) {
					createNewFileInLogs(path, LogsProjectFolder, folder)
					vscode.window.showInformationMessage('File changed in project-logs');
				}
			})
			//.on('unlink', function (path) { console.log('File', path, 'has been removed'); })
			//.on('error', function (error) { console.error('Error happened', error); })


		vscode.window.showInformationMessage('Project Logs Loaded!');


	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
