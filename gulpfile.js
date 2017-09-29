<<<<<<< HEAD
// Generated on 2017-09-29 using generator-angular 0.16.0
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');

var yeoman = {
  app: require('./bower.json').appPath || 'app',
  dist: 'dist'
};

var paths = {
  scripts: [yeoman.app + '/scripts/**/*.js'],
  styles: [yeoman.app + '/styles/**/*.css'],
  test: ['test/spec/**/*.js'],
  testRequire: [
    yeoman.app + '/bower_components/angular/angular.js',
    yeoman.app + '/bower_components/angular-mocks/angular-mocks.js',
    yeoman.app + '/bower_components/angular-resource/angular-resource.js',
    yeoman.app + '/bower_components/angular-cookies/angular-cookies.js',
    yeoman.app + '/bower_components/angular-sanitize/angular-sanitize.js',
    yeoman.app + '/bower_components/angular-route/angular-route.js',
    'test/mock/**/*.js',
    'test/spec/**/*.js'
  ],
  karma: 'karma.conf.js',
  views: {
    main: yeoman.app + '/index.html',
    files: [yeoman.app + '/views/**/*.html']
  }
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
  .pipe($.autoprefixer, 'last 1 version')
  .pipe(gulp.dest, '.tmp/styles');

///////////
// Tasks //
///////////

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(styles());
});

gulp.task('lint:scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(lintScripts());
});

gulp.task('clean:tmp', function (cb) {
  rimraf('./.tmp', cb);
});

gulp.task('start:client', ['start:server', 'styles'], function () {
  openURL('http://localhost:9000');
});

gulp.task('start:server', function() {
  $.connect.server({
    root: [yeoman.app, '.tmp'],
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 9000,
    middleware: function (connect) {
      return [
        connect().use(
          '/bower_components',
          connect.static('./bower_components')
        )]
    }
  });
});

gulp.task('start:server:test', function() {
  $.connect.server({
    root: ['test', yeoman.app, '.tmp'],
    livereload: true,
    port: 9001
  });
});

gulp.task('watch', function () {
  $.watch(paths.styles)
    .pipe($.plumber())
    .pipe(styles())
    .pipe($.connect.reload());

  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe($.connect.reload());

  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe(lintScripts())
    .pipe($.connect.reload());

  $.watch(paths.test)
    .pipe($.plumber())
    .pipe(lintScripts());

  gulp.watch('bower.json', ['bower']);
});

gulp.task('serve', function (cb) {
  runSequence('clean:tmp',
    ['lint:scripts'],
    ['start:client'],
    ['bower'],
    'watch', cb);
});

gulp.task('serve:prod', function() {
  $.connect.server({
    root: [yeoman.dist],
    livereload: true,
    port: 9000
  });
});

gulp.task('test', ['start:server:test'], function () {
  var testToFiles = paths.testRequire.concat(paths.scripts, paths.test);
  return gulp.src(testToFiles)
    .pipe($.karma({
      configFile: paths.karma,
      action: 'watch'
    }));
});

// inject bower components
gulp.task('bower', function () {
  return gulp.src(paths.views.main)
    .pipe(wiredep({
      ignorePath: '..'
    }))
    .pipe(gulp.dest(yeoman.app + '/'));
});

///////////
// Build //
///////////

gulp.task('clean:dist', function (cb) {
  rimraf('./dist', cb);
});

gulp.task('client:build', ['html', 'styles'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src(paths.views.main)
    .pipe($.useref({searchPath: [yeoman.app, '.tmp']}))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.minifyCss({cache: true}))
    .pipe(cssFilter.restore())
    .pipe($.rev())
    .pipe($.revReplace())
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('html', function () {
  return gulp.src(yeoman.app + '/views/**/*')
    .pipe(gulp.dest(yeoman.dist + '/views'));
});

gulp.task('images', function () {
  return gulp.src(yeoman.app + '/images/**/*')
    .pipe($.cache($.imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })))
    .pipe(gulp.dest(yeoman.dist + '/images'));
});

gulp.task('copy:extras', function () {
  return gulp.src(yeoman.app + '/*/.*', { dot: true })
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('copy:fonts', function () {
  return gulp.src(yeoman.app + '/fonts/**/*')
    .pipe(gulp.dest(yeoman.dist + '/fonts'));
});

gulp.task('build', ['clean:dist'], function () {
  runSequence(['images', 'copy:extras', 'copy:fonts', 'client:build']);
});

gulp.task('default', ['build']);
=======
const gulp = require('gulp');
const css = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const angularTemplates = require('gulp-angular-templates');
const notify = require('gulp-notify');
const livereload = require('gulp-livereload');
const clean = require('gulp-clean');
const open = require('gulp-open');
const connect = require('gulp-connect');
const util = require('gulp-util');
const uglify = require('gulp-uglify');
const KarmaServer = require('karma').Server;
const babel = require('gulp-babel');

gulp.task('npm', ['lint', 'test', 'default', 'start'], () => {
  gulp.start('launch');
});

gulp.task('start', () => {
  connect.server({
    root: ['build'],
    livereload: false
  });
});

gulp.task('test', done => {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('launch', () => {
  gulp.src(__filename)
  .pipe(open({uri: 'http://localhost:8080/#!/'}));
});

gulp.task('lint', () => {
  return gulp.src(['./src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('scripts', () => {
  return gulp.src([
    'src/lib/js/angular.min.js',
    'src/lib/js/angular-route.min.js',
    'src/lib/js/angular-nutritionix-api.min.js',
    'src/lib/js/angular-quagga-js.js',
    'src/js/app.js',
    'src/js/services/NutritionixService.js',
    'src/js/controllers/BarcodeController.js',
    'src/js/components/barcodeScanner.js',
    'src/js/quagga.js'
  ])
    .pipe(eslint())
    .pipe(concat('application.min.js'))
    .pipe(babel({presets: ['env']}))
    .pipe(uglify())
    .on('error', err => { util.log(util.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('build/js'))
    .pipe(livereload())
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('stylesheets', () => {
  return gulp.src([
    'src/lib/css/bootstrap.min.css',
    'src/css/application.css'])
    .pipe(css({compatibility: 'ie8'}))
    .pipe(concat('application.min.css'))
    .on('error', err => { util.log(util.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('build/css'))
    .pipe(livereload())
    .pipe(notify({ message: 'Stylesheets task complete' }));
});

gulp.task('fonts', () => {
  return gulp.src([
    'src/lib/css/fonts/glyphicons-halflings-regular.woff2',
    'src/lib/css/fonts/glyphicons-halflings-regular.woff',
    'src/lib/css/fonts/glyphicons-halflings-regular.ttf'
  ])
    .pipe(gulp.dest('build/fonts'))
});
gulp.task('templates', () => {
  return gulp.src('src/templates/**/*.html')
    .pipe(angularTemplates({module:'shipitLunch'}))
    .pipe(concat('templates.min.js'))
    .on('error', err => { util.log(util.colors.red('[Error]'), err.lineNumber.toString()); })
    .pipe(gulp.dest('build/js'))
    .pipe(notify({ message: 'Templates task complete' }));
});

gulp.task('index', () => {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build/'))
    .pipe(notify({ message: 'Index task complete' }));
});

gulp.task('clean', (cb) => {
  return gulp.src('build', {read: false})
    .pipe(clean())
});

// Default task
gulp.task('default', ['clean'], () => {
  gulp.start('stylesheets', 'scripts', 'templates', 'fonts', 'index');
});

// Watch
gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('src/css/*.css', ['stylesheets']);
  gulp.watch(['src/js/app.js', 'src/js/**/*.js'], ['scripts']);
  gulp.watch('src/templates/**', ['templates']);
  gulp.watch('src/lib/css/fonts/*', ['fonts']);
  gulp.watch('src/index.html', ['index']);
  gulp.watch('src/images/*', ['images']);
});
>>>>>>> a52df9d9d8bb35d17252ef0d3a2cf16bc99cd407
