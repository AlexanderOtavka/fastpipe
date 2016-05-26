# fastpipe [![NPM version][npm-image]][npm-url]

> Create nested streams, similar to lazypipe but one-use only.

## Usage

```js
var fastpipe = require('fastpipe');

// ...

function jsTasks() {
  return fastpipe()
    .pipe(gulpif('*.html', crisper({ scriptInHead: false })));
    .pipe(gulpif('*.js',
      fastpipe()
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(uglify())
    ));
}

function cssTasks() {
  return gulpif('*.css',
    fastpipe()
      .pipe(less())
      .pipe(autoprefixer())
  );
}

gulp.task('styles', () =>
  gulp.src('app/styles/**/*')
    .pipe(cssTasks(RECESS_CONFIG))
    .pipe(gulp.dest('dist/styles'));
);

gulp.task('elements', () =>
  gulp.src('app/elements/**/*')
    .pipe(cssTasks(RECESS_CONFIG))
    .pipe(gulp.dest('dist/elements'));
);
```

## Contributing

Pull requests welcome.  If you find any bugs, please submit an issue on GitHub.

## LICENSE

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://www.npmjs.com/package/fastpipe
[npm-image]: https://badge.fury.io/js/fastpipe.svg
