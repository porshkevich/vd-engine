module.exports = function(grunt) {

// Initializes the Grunt tasks with the following settings
	grunt.initConfig({
		// A list of files, which will be syntax-checked by JSHint
		jshint: {
			gruntfile: {
				src: ['Gruntfile.js']
			}
		},
		// Files to be concatenated … (source and destination files)
		concat: {
			js: {
				src: ['src/VD.js', 'src/CComponent.js', 'src/**/*.js'],
				dest: 'lib/vd.full.js'
			}
		},
		// … and minified (source and destination files)
		uglify: {
			js: {
				src: ['<%= concat.js.dest %>'],
				dest: 'lib/vd.full.min.js'
			}
		},
		// Tasks being executed with 'grunt watch'
		watch: {
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:gruntfile'],
			},
			js: {
				files: ['src/**/*.js'],
				tasks: ['concat', 'uglify']
			}
		}
	});
	// Load the plugins that provide the tasks we specified in package.json.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// This is the default task being executed if Grunt
	// is called without any further parameter.
	grunt.registerTask('default', ['concat', 'uglify']);
};