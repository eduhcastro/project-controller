const vscode = require("vscode");

class SideBarProvider extends vscode.WebviewViewProvider {
  constructor(extensionUri) {
    super();
    this.extensionUri = extensionUri;
    this.view;
  }
  resolveWebviewView(webviewView) {
    this.webviewView = webviewView;
    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
    };
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    webviewView.webview.onDidReceiveMessage((data) => {
      switch (data.type) {
        case "onInfo": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case "onError": {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
      }
    });
  }
  revive(panel) {
    this.view = panel;
  }
  _getHtmlForWebview(webview) {
    
    return `!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
          <title>Document</title>
        </head>

        <body>
          <div>Hello world</div>
        </body>
      </html>`;
  }
}
module.exports = SideBarProvider;