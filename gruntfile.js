module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {

      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/app.min.js': ['src/script.js']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["dist/"],
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "dist/style.css": "src/style.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['src/*.less'], // which files to watch
        tasks: ['jshint', 'less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.config('copy', {
    dist: {
      files: [
        { src: ['src/bg-1.jpg'], dest: 'dist/bg-1.jpg' },
        { src: ['src/index.html'], dest: 'dist/index.html' },
      ]
    }
  });


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');


  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint', 'less', 'concat', 'uglify', 'copy']);

};