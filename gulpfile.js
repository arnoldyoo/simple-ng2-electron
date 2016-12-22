const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('copy:vendor', function(){  
    return gulp.src([
            "node_modules/jquery/dist/jquery.min.js",
            "node_modules/core-js/client/shim.min.js",
            "node_modules/systemjs/dist/system-polyfills.js",
            "node_modules/systemjs/dist/system.src.js",
            "node_modules/reflect-metadata/Reflect.js",
            "node_modules/zone.js/dist/zone.js",
            "node_modules/rxjs/bundles/Rx.min.js",
        ])
        .pipe(gulp.dest('./dist/app/scripts/vendor'))
})

// electron TypeScript compile
gulp.task('compile:angular', function () {
  return gulp
    .src('./src/angular.app/**/*.ts')
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('dist/app/'));
});

// copy to index.html file to dist folder
gulp.task('copy:angular' , function() {
  return gulp
    .src(['./src/angular.app/**/*.html','./src/angular.app/**/*.css'])
    .pipe(gulp.dest('dist/app/'))
});
// copy to index.html file to dist folder
gulp.task('copy:index' , function() {
  return gulp
    .src(['./src/index.html','./src/systemjs.config.js'])
    .pipe(gulp.dest('dist/'))
});

//'./src/system.config.js',

// electron TypeScript compile
gulp.task('compile:electron', function () {
  return gulp
    .src('./src/electron.app/**/*.ts')
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('dist/electron.app/'));
});

gulp.task('build', ['copy:vendor','copy:index','copy:angular','compile:angular','compile:electron']);
gulp.task('default', ['build']);
