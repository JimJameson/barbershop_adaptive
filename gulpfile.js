'use-strict';

const gulp = require("gulp");
//const concat = require("gulp-concat");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
// const server = require("browser-sync").create();

sass.compiler = require('node-sass');

function style() {
    return gulp.src("sass/all.scss")
       // .pipe(concat("all.css"))
        .pipe(plumber())
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest("css"));
    // .pipe(server.stream());
}

function watch() {
    gulp.watch("sass/**/*.scss", style);

}

gulp.task("style", style);
gulp.task("watch", watch);