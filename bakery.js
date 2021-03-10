// Declare variables and libraries
const { PerformanceObserver, performance } = require('perf_hooks');
var colors = require('colors');
const fs = require('fs');
var path = process.argv[3];
var distFolder = '_projects/'+process.argv[3]+'/_dist/';
var projectFolder = '_projects/'+process.argv[3]+'/';
var gulp = require('gulp');

console.clear()

if(checkProject(distFolder) === true) {
    // Find project name and read content of "_dist" folder into "data" object
    projectName = nameOfProject(path);
	console.log(colors.yellow('Compiling project: '+projectName));
    const data = readFilesSync(distFolder);

    // If "data" has content, start process - if not, show error
    if(data != "" || data != "undefined") {
        console.log(colors.green('Data read successfully!'));

        // Find html files in "data" object
        var htmlCount = 0;
        var htmlFiles = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if(key.includes('.html')){
                    htmlFiles.push(key);
                    htmlCount++;
				}				
                if(key.includes('.php')){
                    htmlFiles.push(key);
                    htmlCount++;
                }
            }
        }
        console.log(colors.yellow('Data containing '+htmlCount+' HTML file(s)'));
        console.log('-----------');

        // Replace CSS and JS links with inline code
        var t0 = performance.now();
        var compiledFiles = replaceContent(data,htmlFiles);
        var t1 = performance.now();
        var tComplete_1 = (t1-t0);
        tComplete_1 = Math.round(tComplete_1 * 100) / 100
        console.log(colors.magenta("Time to compile files " + tComplete_1 + " ms."));
        console.log(colors.yellow('Create export-files'));
        console.log('-----------');

        // Create export folder and files
        var t2 = performance.now();        
        var dateTime = timeStamp();
        createFiles(compiledFiles,dateTime);
        var t3 = performance.now();
        var tComplete_2 = (t3-t2);
        tComplete_2 = Math.round(tComplete_2 * 100) / 100
        console.log(colors.green('Saved files in "_export" folder'));
        console.log(colors.magenta("Time to create files " + tComplete_2 + " ms."));
        console.log('-----------');
        
        // Copy Assets if present
        var tComplete_3 = 0;
        var assets = checkAssets(distFolder+'assets');
        if(assets != true) {
            var t4 = performance.now();
            copyAssets(projectFolder,dateTime);
            var t5 = performance.now();
            tComplete_3 = (t5-t4);
            tComplete_3 = Math.round(tComplete_3 * 100) / 100
            console.log(colors.green('Saved copy assets into "_export" folder'));
            console.log(colors.magenta("Time to copy assets " + tComplete_3 + " ms."));
        }else{
            console.log(colors.yellow('No assets / images found!'));
        }
        console.log('-----------');
        
        // Count time and write success message
        var tComplete = tComplete_1+tComplete_2+tComplete_3;
        console.log(colors.green('Completed export of "'+projectName+'" in '+tComplete+' ms'))      
    }
}else{
    // If wrong folder or no dist folder found, error message
    console.log(colors.yellow('"'+path+'"'));
    console.log(colors.yellow('Trying to compile project "'+nameOfProject(path)+'"'));
    console.log(colors.redBG('Make sure you defined the correct project including "_dist" folder!'));
}

// Function for if asset folder is empty
function checkAssets(path) {
    fs.readdirSync(path, function(err, files) {
        if (err) {
           console.log(colors.red('No asset folder found!'))
        } else {
           if (!files.length) {
               return true;
           }
        }
    });
}

// Function for timestamp of exports
function timeStamp(){
    Date.prototype.today = function () { 
        return ((this.getDate() < 10)?"0":"") + this.getDate() + (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) + this.getFullYear();
    }
    Date.prototype.timeNow = function () {
        return ((this.getHours() < 10)?"0":"") + this.getHours() + ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    }
    var currentdate = new Date();
    return currentdate.today() + "_" + currentdate.timeNow();
}

// Function to check if project folder exists
function checkProject(project) {
    if (fs.existsSync(project)) {
        return true
    }
    return false;
}

// Function to find name of project
function nameOfProject(path) {
    var elements = path.split('/').length;
    return path.split('/')[elements-1];
}

// function to replace links with inline code
function replaceContent(data,files) {
    var compiledFiles = [];
    files.forEach(file => {
        var content = data[file].toString();
        console.log(colors.yellow('Compiling '+file));
        for (var key in data) {
            if (data.hasOwnProperty(key)) {

                // If it is "CSS" file
                if(content.includes(key)) {
                    if(key.includes('.css')) {
                        var tag = '<link href="./css/'+key+'" rel="stylesheet" type="text/css">';
                        var cssContent = '<style>'+data[key].toString()+'</style>';
                        content = content.replace(tag, cssContent);
                    }
                }

                // If it is "JS" file
                if(key.includes('.js') && !key.includes("jquery")) {
                    newKey = key.replace('-min', "");
                    var tag = '<script src="./js/'+newKey+'"></script>';
                    if(content.includes(tag)) {
                        var jsContent = '<script>'+data[key].toString()+'</script>';
                        content = content.replace(tag, jsContent);
                    }
                }

                content = content.replace('../', "./");
            }
        }
        compiledFiles[file] = content;
    });
    return compiledFiles;
}

// Read files of "_dist" folder and put it into object
function readFilesSync(dir) {
    const files = [];  
    fs.readdirSync(dir).forEach(filename => {
		count = filename.split('.').length;
		if(filename !== '.DS_Store') {
			extension = filename.split('.')[count-1];
			if(extension === 'html' || extension === 'php') {
				var content = fs.readFileSync(dir+filename, 'utf8');
				files[filename] = content;
			}
			else{
				newDir = dir+extension+'/';
				if(extension !== 'assets') {
					fs.readdirSync(newDir).forEach(filename => {
						var content = fs.readFileSync(newDir+filename, 'utf8');                
						count = filename.split('.').length;
						extension = filename.split('.')[count-1];
						if(extension === 'css'){
							files[filename] = content;
						}
						if(extension === 'js' && filename.includes('-min')){
							files[filename] = content;
						}               
					});
				}
			}
		}
    });
    return files;
}

// Create new "HTML" files in export folder
function createFiles(data,timeStamp){
    var dir = projectFolder + '_export';
    var exportPath = dir + '/' + timeStamp + '/';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.mkdirSync(exportPath);
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            fs.writeFile(exportPath+key, data[key].toString(), function (err) {
                if (err) throw err;
            });
        }
    }
}

// Copy assets into export folder
function copyAssets(path,timeStamp) {
    return gulp.src(path+'/_dist/assets/**/*.*')
        .pipe(gulp.dest(path+'/_export/'+timeStamp+'/assets'));
}