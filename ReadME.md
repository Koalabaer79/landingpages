# Landing Page Compiler from Lars Urban

### Pug
For easy programming this compiler uses PUG files

### Sass
This compiler uses SASS stylesheets to enable functions and variables for layouting

### Gulp
With the gulpfile.js it is possible to create new projects, watch and compile PUG files as well as SCSS files

### nodeJS
To export your projects this compiler uses nodeJS to create inline HTML files with all style and js included

### Templates
Use your own templates to use them for new projects

## Commands

### Getting Started with
- <b>npm install</b><br/>
<i>To ensure that you have all neccessary tools</i>

### Gulp Commands
- <b>gulp new --project test1</b><br />
<i>Create new Project with _default template. You need to be in the "_projects" directory</i>

- <b>gulp new --project test1 --template xyz</b><br />
<i>Create new Project with defined template (name of folder) from "templates" directory</i>

- <b>gulp watch</b><br />
<i>Compiling your files into the "_dist" folder and watch "index.html" life in browser</i>

- <b>gulp watch --file xyz.html</b><br />
<i>Compiling all files from project into the "_dist" directory and watch specified "xyz.html"<br />
xyz.html --> full path of html file required</i>

### node Commands
- <b>node bakery.js --project test1</b><br />
<i>Export desired project and create inline HTML code including all CSS code, JS code and images in a timestamped "_export" directory.<br />
Copy the complete path of project directory "lp-compiler" (for example)</i>

### PUG files
I've created the "index.pug", which will be compiled into "index.html". You can add an individual PUG file (f.e. "test.pug") in the same folder as "index.pug" and it will be compiled into "test.html".

The folder "_shared" includes the menu and footer pug-file, which can be included in your individual PUG files and you only need to change the menu once, as it is implemented in all parent files.

### SCSS files
I only have one SCSS file, which is included in the pug-file. You can feel free to add more SCSS files, maybe in a separate folder, and import them into your "style.scss". Then it will be included automatically inline in your exported HTML file.# landingpages
