import * as fs from "fs";
import * as fs2 from "fs-extra";

const FileController = {

  FindStrInTextFile: (filename: string, str: string) => {
    const contents = fs.readFileSync(filename, 'utf-8');
    const result = contents.includes(str);
    return result;
  },

  CreateNew: (newfile: string, target: string, courrentpath: string) => {
   
    var splitFIle = newfile.split(courrentpath);
    var file = splitFIle[1];

    fs2.copy(newfile, target + '' + file, function (err) {
      if (err) return console.error(err);
    });

  },

  CreateInitFile: (generatelogname: string) => {
      var writeStream = fs.createWriteStream(generatelogname + '/logs.txt');
      writeStream.end();
  },


  WriteInitFile: (generatelogname: string, text: string) => {
    fs.appendFile(generatelogname+'/logs.txt', text+'\n', function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('Saved!');
    });
  },


  CreateLogsFolder: (name: string) => {
    fs.mkdir(name, (error) => { })
  }

}

export default FileController;