import * as fs from "fs";
import * as glob from "glob";

const FileController = {

  FindStrInTextFile: (filename: string, str: string) => {
    const contents = fs.readFileSync(filename, 'utf-8');
    const result = contents.includes(str);
    return result;
  },

  CreateNew: (newfile: string, target: string, courrentpath: string) => {
    var splitFIle = newfile.split(courrentpath);
    var file = splitFIle[1];
    if (file.split('/').length > 1) {
      var getlastvalue = file.split('/')[file.split('/').length - 1];
      fs.mkdir(target + file.replace(getlastvalue, ''), (error: any) => { })
    }
    fs.copyFile(newfile, target + '' + file, (err: any) => {
      if (err) throw err;
    });
  },

  CreateInitFile: (folder: string, generatelogname: string, dateandhours: string) => {
    glob(folder + '/**', function (er, files) {
      if (er) {
        console.log(er)
        return;
      }
      var writeStream = fs.createWriteStream(generatelogname + '/init-' + dateandhours + '.txt');

      for (var i = 0; i < files.length; i++) {
        if (i != 0 && files[i].indexOf('project-controller') == -1) writeStream.write(files[i] + '\n');
      }

      writeStream.end();
    })
  },

  CreateLogsFolder: (name: string) => {
    fs.mkdir(name, (error) => { })
  }

}

export default FileController;