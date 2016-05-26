# Fastpipe

> Create nested streams, similar to lazypipe but one-use only.

## Usage

```js
var fastpipe = require('fastpipe');

// ...

function cssTasks() {
  return fastpipe()
    .pipe(gulpif('**/*.css'), fastpipe()
      .pipe(recess(recessConfig))
      .pipe(less())
      .pipe(autoprefixer())
    );
}

gulp.task('styles', () =>
  gulp.src('app/styles/**/*')
    .pipe(cssTasks())
    .pipe(gulp.dest('dist/styles'));
);

gulp.task('elements', () =>
  gulp.src('app/elements/**/*')
    .pipe(cssTasks())
    .pipe(gulp.dest('dist/elements'));
);
```

## LICENSE

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
