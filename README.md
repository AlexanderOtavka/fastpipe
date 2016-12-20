# fastpipe

[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]
[![Known Vulnerabilities][vulnerabilities-image]][vulnerabilities-url]

> Create nested streams, similar to lazypipe but cleaner syntax and one-use only.

## Usage

```js
var fastpipe = require('fastpipe');

// ...

// Put pipes inside of a function if they need to be used more than once
function cssTasks() {
  return gulpif('*.css',
    // Cleaner syntax than lazypipe: no gulp-if quirks, just pretend it is a
    // normal stream coming straight from gulp.src
    fastpipe()
      .pipe(less())
      .pipe(autoprefixer())
  );
}

// Enables easy customization by passing in config information, unlike lazypipe
function jsTasks(scriptInHead) {
  return fastpipe()
    .pipe(gulpif('*.html', crisper({ scriptInHead: scriptInHead })));
    .pipe(gulpif('*.js',
      // Easily nest multiple transforms inside of gulp-if
      fastpipe()
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(uglify())
    ));
}

gulp.task('styles', function () {
  return gulp.src('app/styles/**/*')
    .pipe(cssTasks())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('elements', function () {
  return gulp.src('app/elements/**/*')
    .pipe(cssTasks())
    .pipe(jsTasks())
    .pipe(gulp.dest('dist/elements'));
});

// Do NOT do this, fastpipe instances are one-use only.  They must be defined
// in a function for multiple uses.
var bigNoNo = fastpipe()
  .pipe(less())
  .pipe(autoprefixer())

gulp.task('broken-css-task', function () {
  return gulp.src('app/**/*.css')
    .pipe(bigNoNo)
    .pipe(gulp.dest('dist'));
});

// This, however, would be okay.  It's just weird because in this case, there is
// no reason to nest the stream.
gulp.task('weird-css-task', function () {
  var okButWeird = fastpipe()
    .pipe(less())
    .pipe(autoprefixer())

  return gulp.src('app/**/*.css')
    .pipe(okButWeird)
    .pipe(gulp.dest('dist'));
});
```

## Contributing

Pull requests welcome.  If you find any bugs, please submit an issue on GitHub.

## LICENSE

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://www.npmjs.com/package/fastpipe
[npm-image]: https://badge.fury.io/js/fastpipe.svg

[license-url]: http://en.wikipedia.org/wiki/MIT_License
[license-image]: https://img.shields.io/badge/license-MIT-brightgreen.svg

[vulnerabilities-url]: https://snyk.io/test/npm/fastpipe
[vulnerabilities-image]: https://snyk.io/test/npm/fastpipe/badge.svg
