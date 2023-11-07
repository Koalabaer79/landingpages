var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var pug = require('gulp-pug');
var rename = require('gulp-rename');
const minify = require('gulp-minify');
var colors = require('colors');
const fs = require('fs');
var browserSync = require('browser-sync').create();
var path = require('path');

// Local Variables
var projectFolder = process.env.INIT_CWD;
path.normalize(projectFolder);
var directFolder = projectFolder.split("htdocs")[1];
var name = process.argv[4];
var template = process.argv[6];
var systemplatform = process.platform;

console.log(colors.yellow("Working on platform : "+systemplatform));
console.log("-------------");

// Compile Sass Files
gulp.task('sass', function() {
    if(fs.existsSync(projectFolder) && projectFolder.includes('_projects')){
        var sassFiles = projectFolder+'/scss/*.scss';
        var cssDest = projectFolder+'/_dist/css/';
        return gulp.src(sassFiles)
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(gulp.dest(cssDest))
            .pipe(browserSync.stream());
    }
    else{
        return console.log(colors.redBG('Maybe switch into your current project folder?'));
    }
});

// Compile Pug Files
gulp.task('pug-php', function() {
    if(fs.existsSync(projectFolder) && projectFolder.includes('_projects')){
        return gulp.src(projectFolder+'/pug/*.pug')
			.pipe(pug())
			.pipe(rename({
				extname: '.php'
			}))
            .pipe(gulp.dest(projectFolder+'/_dist/'))
            .pipe(browserSync.stream());
    }else{
        return console.log(colors.redBG('Maybe switch into your current project folder?'));
    }
});

// Compile Pug Files
gulp.task('pug', function() {
    if(fs.existsSync(projectFolder) && projectFolder.includes('_projects')){
        return gulp.src(projectFolder+'/pug/*.pug')
			.pipe(pug())
			.pipe(rename({
				extname: '.html'
			}))
            .pipe(gulp.dest(projectFolder+'/_dist/'))
            .pipe(browserSync.stream());
    }else{
        return console.log(colors.redBG('Maybe switch into your current project folder?'));
    }
});

// Copy assets
gulp.task('copy', function() {
    if(fs.existsSync(projectFolder) && projectFolder.includes('_projects')){
        return gulp.src(projectFolder+'/assets/**/*.*')
            .pipe(gulp.dest(projectFolder+'/_dist/assets/'));
    }else{
        return console.log(colors.redBG('Maybe switch into your current project folder?'));
    }
});

// Compile JS Files
gulp.task('js', function() {
    if(fs.existsSync(projectFolder) && projectFolder.includes('_projects')){
        return gulp.src(projectFolder+'/js/*.js')
            .pipe(minify())
            .pipe(gulp.dest(projectFolder+'/_dist/js/'))
            .pipe(browserSync.stream());
    }else{
        return console.log(colors.redBG('Maybe switch into your current project folder?'));
    }
});

gulp.task('browserSync', function() {
    var routePage = directFolder+'/_dist/';
    browserSync.init({
        startPath: routePage,
        proxy: 'localhost',
        browser: "chrome"
    })
    if(name == undefined){
        var file = 'index.html';
    }else{
        var elements = name.split('/').length;
        var file = name.split('/')[elements-1];
        file = file.replace('pug', 'html');
    }
    gulp.watch(process.env.INIT_CWD+'/pug/**/*.pug', gulp.series('pug')).on('change', browserSync.reload);
    gulp.watch(process.env.INIT_CWD+'/scss/*.scss', gulp.series('sass')).on('change', browserSync.reload);
    gulp.watch(process.env.INIT_CWD+'/js/*.js', gulp.series('js')).on('change', browserSync.reload);
    gulp.watch(process.env.INIT_CWD+'/assets/**/*.*', gulp.series('copy')).on('change', browserSync.reload);
    gulp.watch(process.env.INIT_CWD+'/_dist/'+file).on('change', browserSync.reload);
    console.log(colors.green('Watching '+routePage+''+file));
});

gulp.task('browserSync-php', function() {
    var routePage = directFolder+'/_dist/';
    browserSync.init({
        startPath: routePage,
        proxy: 'localhost',
        browser: "chrome"
    })
    if(name == undefined){
        var file = 'index.php';
    }else{
        var elements = name.split('/').length;
        var file = name.split('/')[elements-1];
        file = file.replace('pug', 'php');
    }
    gulp.watch(process.env.INIT_CWD+'/pug/**/*.pug', gulp.series('pug-php')).on('change', browserSync.reload);
    gulp.watch(process.env.INIT_CWD+'/scss/*.scss', gulp.series('sass')).on('change', browserSync.reload);
    gulp.watch(process.env.INIT_CWD+'/js/*.js', gulp.series('js')).on('change', browserSync.reload);
    gulp.watch(process.env.INIT_CWD+'/assets/**/*.*', gulp.series('copy')).on('change', browserSync.reload);
    gulp.watch(process.env.INIT_CWD+'/_dist/'+file).on('change', browserSync.reload);
    console.log(colors.green('Watching '+routePage+''+file));
});

// Watch HTML Project -> including SASS, PUG and BROWSERSYNC Tasks
gulp.task('watch', gulp.series('sass', 'pug', 'js', 'copy', 'browserSync'));
// Watch PHP Project -> including SASS, PUG and BROWSERSYNC Tasks
gulp.task('watch-php', gulp.series('sass', 'pug-php', 'js', 'copy', 'browserSync-php'));

// Create new Project
gulp.task('new', function() {
    if(fs.existsSync(projectFolder+'/'+name+'/')){
        return console.log(colors.redBG('The project "'+name+'" already exists in this folder!'));
    }else{
        if(projectFolder.includes('_projects')) {
            if(name == undefined){
                return console.log(colors.redBG('You need to define a --name XYZ for your project'));
            }else{
                console.log(colors.green('Creating new project named "'+name+'" in _projects'));
                path = projectFolder+'/'+name+'/';
                if(template == undefined){
                    var tempPath = './templates/_default';
                }else{
                    var tempPath = './templates/'+template;
                }
                return gulp.src(tempPath+'/**/')
                    .pipe(gulp.dest(path)),
                    gulp.src(tempPath+'/**/*.*')
                    .pipe(gulp.dest(path));
            }        
        }else{
            return console.log(colors.redBG('You need to be in your "_project" folder to create a new project'));
        }
    }
});