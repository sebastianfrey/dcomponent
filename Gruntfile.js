
/* jshint node:true */

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
	var packageJson = grunt.file.readJSON('package.json');

  grunt.initConfig({
    name: packageJson.name,
    version: packageJson.version,
    buildDir: '_buildTest',
    clean: {
      dev: {
        src: ['<%= buildDir %>']
      }
    },
    copy: {
      dev: {
        files: [
          {
            cwd: 'src/',
            expand: true,
            src: ['**'],
            dest: '<%= buildDir %>'
          }
        ]
      }
    },
    jshint: {
      main: {
        files: {
          src: ['Gruntfile.js', 'src/**/*.js'] 
        },
        options: {
          jshintrc: true
        } 
      }
    },
    watch: {
			dev: {
        files: ['./src/**/*.js', 'Gruntfile.js'],
        tasks: ['dev']
			}
    }
  });
  
  grunt.registerTask('dev', ['jshint', 'clean:dev', 'copy:dev', 'watch:dev']);
};