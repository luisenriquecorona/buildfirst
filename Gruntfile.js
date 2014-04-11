'use strict';

var glob = require('glob');
var all = glob.sync('**/*.js');
var sources = process(['node_modules/', 'bower_components', 'vendor/', 'build/', 'ch01/'], unmatched, all);
var es6 = process(['ch05/17_harmony-traceur/'], matched, sources);
var browser = process(['public/'], matched, sources);
var node = process(['public/', 'ch05/17_harmony-traceur/', 'ch06/12_generator-basics', 'ch06/13_generator-flow'], unmatched, sources);

function process (by, criteria, files) {
  return files.filter(function (path) { return by.every(criteria.bind(path)); });
}

function unmatched (expression) {
  return this.indexOf(expression) === -1; // jshint ignore:line
}

function matched (expression) {
  return this.indexOf(expression) !== -1; // jshint ignore:line
}

module.exports = function(grunt){

  grunt.initConfig({
    jshint: {
      node: {
        files: { src: node },
        options: { jshintrc: '.jshintrc-node' }
      },
      browser: {
        files: { src: browser },
        options: { jshintrc: '.jshintrc-browser' }
      },
      es6: {
        files: { src: es6 },
        options: { jshintrc: '.jshintrc-es6' }
      },
      options: {
        reporter: require('jshint-stylish')
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('ci', ['jshint']);
};
