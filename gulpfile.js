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
