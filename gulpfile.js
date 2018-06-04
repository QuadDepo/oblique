var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cssmin = require("gulp-cssmin");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");

const input  = './assets/sass/index.scss';
const output = './assets/css/';

gulp.task("scss", function() {
  return gulp
    .src(input)
    .pipe(
      plumber({
        errorHandler: function(err) {
          console.log(err);
          this.emit("end");
        }
      })
    )
    .pipe(sass())
    .pipe(gulp.dest(output))
    .pipe(cssmin())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 4 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest(output));
});

gulp.task("default", ["scss"], function() {
  gulp.watch('./assets/sass/**/*.scss', ["scss"]);
});
