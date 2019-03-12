const _ = require('lodash/fp');
const postCss = require('postcss');

const keyFramesParent = ['keyframes', '-webkit-keyframes', '-moz-keyframes'];

const postCssWrapperPlugin= postCss.plugin('postcss-wrapper-plugin', function(prefix) {
    return function(css) {
      css.walkRules(function(rule) {
        let parentName = _.get('parent.name', rule);
        if (_.includes(parentName, keyFramesParent))
            return;

        const selector = rule.selector;
        rule.selector = _.pipe(_.split(','), _.map(_.pipe(_.trim, joinPrefix(prefix))),
          _.join(', '))(selector);
      });
    };
  });

const joinPrefix = function(prefix) {
  return function(selector) {
    if(selector === 'html') {
      return selector+prefix;
    }
    return _.join(' ', [prefix, selector]);
  };
};

function PostCssWrapper(file, container) {
  this.file = file;
  this.container = container;
}

PostCssWrapper.prototype.apply = function(compiler) {
  const file = this.file;
  const container = this.container;

  compiler.plugin('emit', function(compilation, callback) {
    const assets = compilation.assets;
    if (!_.has(file, assets)) return callback();
    const source = assets[file].source();
    const processor = postCss([postCssWrapperPlugin(container)]);

    processor.process(source).then(function(result) {
      compilation.assets[file] = {
        source: function() { return result.css; },
        size: function() { return result.css.length; }
  };
    callback();
  }, callback);
  });
};

module.exports = PostCssWrapper;