
const tinify = require("tinify");
tinify.key = "YOUR_API_KEY";
var colors = require('colors');
const fs = require('fs');
var path = process.argv[3];

if(checkProject(project) != "" && project.contains('assets')){
    fs.readdirSync(dir).forEach(filename => {
        if(filename.contains('.png')) {
            
        }
    });
}else{
    console.log(redBG('You may chose the right path of the image folder!'));
}

function checkProject(project) {
    if (fs.existsSync(project)) {
        return true
    }
    return false;
}