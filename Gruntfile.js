'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt, {
    pattern: 'grunt-*',
    config: 'package.json',
    scope: 'devDependencies',
  });

  var versionNumber = grunt.file.readJSON('package.json').version;

  var banner = "'use strict';\n\n";

  banner += '// callStats v' + versionNumber + '\n';
  banner += '// Last time updated: <%= grunt.template.today("UTC:yyyy-mm-dd h:MM:ss TT Z") %>\n\n';

  // configure project
  grunt.initConfig({
    // make node configurations available
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true,
        separator: '\n',
        banner: banner,
      },
      dist: {
        src: [
          'dev/head.js',
          'dev/amd.js',
          'dev/globals.js',
          'dev/parameters.js',
          'dev/callStats.js',
          'dev/wrapper.js',
          'dev/datachannel.js',
          'dev/certificate.js',
          'dev/inbound-rtp.js',
          'dev/outbound-rtp.js',
          'dev/track.js',
          'dev/tail.js',
        ],
        dest: 'dist/callStats.js',
      },
    },
    clean: ['dist/'],
    obfuscator: {
      options: {},
      task1: {
        options: {},
        files: {
          'dist/callStats.obs.js': ['dist/callStats.js'],
        },
      },
    },
    uglify: {
      options: {
        mangle: false,
        banner: banner,
      },
      my_target: {
        files: {
          'dist/callStats.min.js': ['dist/callStats.obs.js'],
        },
      },
    },
    jsbeautifier: {
      files: ['dist/callStats.js', 'dev/*.js', 'Gruntfile.js'],
      options: {
        js: {
          braceStyle: 'collapse',
          breakChainedMethods: false,
          e4x: false,
          evalCode: false,
          indentChar: ' ',
          indentLevel: 0,
          indentSize: 2,
          indentWithTabs: false,
          jslintHappy: false,
          keepArrayIndentation: false,
          keepFunctionIndentation: false,
          maxPreserveNewlines: 10,
          preserveNewlines: true,
          spaceBeforeConditional: true,
          spaceInParen: false,
          unescapeStrings: false,
          wrapLineLength: 0,
        },
        html: {
          braceStyle: 'collapse',
          indentChar: ' ',
          indentScripts: 'keep',
          indentSize: 4,
          maxPreserveNewlines: 10,
          preserveNewlines: true,
          unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u'],
          wrapLineLength: 0,
        },
        css: {
          indentChar: ' ',
          indentSize: 4,
        },
      },
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'v%VERSION%',
        commitFiles: ['package.json', 'bower.json'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: '%VERSION%',
        push: false,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
      },
    },
    watch: {
      scripts: {
        files: ['dev/*.js'],
        tasks: ['concat', 'jsbeautifier', 'uglify'],
        options: {
          spawn: false,
        },
      },
    },
  });

  // enable plugins

  // set default tasks to run when grunt is called without parameters
  // http://gruntjs.com/api/grunt.task
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-obfuscator');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', ['clean', 'concat', 'jsbeautifier', 'obfuscator', 'uglify']);
};
