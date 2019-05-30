const vscode = require('vscode');
const cpf = require("@fnando/cpf/dist/node");
const cnpj = require("@fnando/cnpj/dist/node");

function activate(context) {
  var commands = [
    vscode.commands.registerCommand('br-tax-id-generator.cnpj', generateCNPJ),
    vscode.commands.registerCommand('br-tax-id-generator.cpf', generateCPF)
  ];

  commands.forEach(function (command) {
    context.subscriptions.push(command);
  });
}

function insertText(text) {
  var editor = vscode.window.activeTextEditor;
  editor.edit(
    edit => editor.selections.forEach(
      selection => {
        edit.delete(selection);
        edit.insert(selection.start, text);
      }
    )
  );
}

const options = [{label: "Yes", picked: true}, {label: "No"}]
const showQuickPickOptions = [options, { placeHolder: 'Only digits?' }]

function generateCNPJ() {
  generate(cnpj.generate);
}
function generateCPF() {
  generate(cpf.generate);
}

function generate(generator) {
  vscode.window.showQuickPick(...showQuickPickOptions)
    .then(selection => {
      if (!selection) return;
      insertText(generator(selection.label === 'No'));
    });
}

exports.activate = activate;
