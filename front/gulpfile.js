const gulp    = require('gulp');
const cssnano    = require('cssnano');
const postcss = require('gulp-postcss');
const sass    = require('gulp-sass');


gulp.task('default', () => {
  return gulp.watch('./css/**/*.sass', ['css']);
});


gulp.task('css', () => {
  return gulp.src('./css/app.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(postcss([
      cssnano({
        autoprefixer: {
          browsers: ['last 2 version']
        }
      })
    ]))
    .pipe(gulp.dest('./css'));
});