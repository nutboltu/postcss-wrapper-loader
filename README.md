## PostCss Wrapper Loader for Webpack

### Example
This plugin wraps all the cssClasses in a css file with a prefix class while webpack bundled. It helps to scope a specific css file with a prefix class

Consider a simple css file `styles.css`:
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

add this plugin in webpack plugins
```
  plugins: [
    new ExtractTextWebpackPlugin('styles.css'),
    new PostCssWrapper('styles.css', '.wrapper')
  ]
```
