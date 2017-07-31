const gulp = require('gulp');
const awsLambdaTypescript = require('aws-lambda-typescript');

awsLambdaTypescript.registerBuildGulpTasks(gulp, __dirname);

var tsLintOptions = {
  formatter: "verbose"
};

// Aliases
gulp.task('build', ['lambda:build']);
gulp.task('clean', ['lambda:clean']);
gulp.task('run', ['lambda:run']);
gulp.task('deploy', ['lambda:deploy']);
gulp.task('info', ['lambda:info']);
gulp.task('default', ['build']);