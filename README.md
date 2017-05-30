
### Example

Let the style file `styles.css` is:
```
.css-class1 {height: auto;}.css-class2 {width: auto;}
```

After the postcss-wrapper-loader the file will be following
```
.wrapper .css-class1 {height: auto;} .wrapper .css-class2 {width: auto;}
```

### How it works
In the webpack config file initialize the loader
```
const PostCssWrapper = require('postcss-wrapper-loader');
```

then within your webpack plugins:
```
  plugins: [
    new ExtractTextWebpackPlugin('styles.css'),
    new PostCssWrapper('styles.css', '.wrapper')
  ]
```
