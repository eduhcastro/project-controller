import * as fs from "fs";
import * as fs2 from "fs-extra";

const FileController = {

  // Function to find a string in a text file
  FindStrInTextFile: (filename: string, str: string) => {
    // Read the contents of the file
    const contents = fs.readFileSync(filename, 'utf-8');
    // Check if the string is present in the file
    const result = contents.includes(str);
    // Return the result
    return result;
  },

  // Function to create a new file
  CreateNew: (newfile: string, target: string, courrentpath: string) => {
    // Split the file path to get the file name
    var splitFIle = newfile.split(courrentpath);
    var file = splitFIle[1];

    // Copy the file to the target directory
    fs2.copy(newfile, target + '' + file, function (err) {
      // Handle errors
      if (err) return console.error(err);
    });
  },

  // Function to create a log file
  CreateInitFile: (generatelogname: string) => {
    // Get the file path
    var filePath = generatelogname + '/logs.txt';
    // Check if the file already exists
    if (!fs.existsSync(filePath)) {
      // Create the log file
      var writeStream = fs.createWriteStream(generatelogname + '/logs.txt');
      writeStream.end();
    }
  },

  // Function to write to the log file
  WriteInitFile: (generatelogname: string, text: string) => {
    // Append the text to the log file
    fs.appendFile(generatelogname + '/logs.txt', text + '\n', function (err) {
      // Handle errors
      if (err) {
        return console.log(err);
      }
      console.log('Saved!');
    });
  },

  // Function to create a logs folder
  CreateLogsFolder: (name: string) => {
    // Create the logs folder
    fs.mkdir(name, (error) => { })
  }

}

// Export the FileController object
export default FileController;