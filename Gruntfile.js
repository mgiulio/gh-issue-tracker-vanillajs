module.exports = function (grunt) {
    grunt.initConfig({
		/* sass: {
			main: {
				options: {
					style: 'expanded',
					sourcemap: 'none'
				},
				files: {
					'tmp/style.css': 'src/scss/style.scss'
				}
			}
		},
        autoprefixer: {
            main: {
                files: {
                    'tmp/style.css': 'tmp/style.css'
                }
            }
        }, */
		traceur: {
			options: {
				script: true, //moduleNames: false
			},
			main: {
				// *.js, '**/*.js'
				files: [{
					expand: true,
					cwd: 'src/js/',
					src: ['**/*.js'], 
					dest: 'tmp/traceur'
				}]
				/* files: [{
					expand: true,
					cwd: 'src/js/templates',
					src: ['*.js'], 
					dest: 'tmp/traceur'
				}] */
			},
		},
		/* concat: {
			main: {
				src: ['tmp/traceur/gh-api.js', 'tmp/traceur/templates.js', 'tmp/traceur//app.js'],
				dest: 'tmp/script.js'
			}
		}, */
		/* uglify: {
			options: {
				sourceMap: true
			},
			main: {
				files: {
					'tmp/script.js': 'tmp/script.js'
				}
			}
		}, */
		/* copy: {
			main: {
				files: {
					'index.html': 'src/index.html',
					'style.css': 'tmp/style.css',
					'script.js': 'tmp/script.js',
					//'dist/script.js.map': 'tmp/script.js.map'
					'img/sprite.svg': 'src/img/sprite.svg',
					'img/diag-patt.png': 'src/img/diag-patt.png'
				}
			}
		} */
    });
	
	//grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-traceur');
	//grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-copy');
	
	/* grunt.registerTask('clean', 'Cleanup tmp and dest directories', function() {
		grunt.file.delete('tmp/');
		grunt.file.delete('dest/');
	}); */
	
	grunt.registerTask('default', [/* 'clean', 'sass', 'autoprefixer',  */'traceur',/*  'concat', 'copy' */]);
	//grunt.registerTask('release', ['clean', 'sass', 'autoprefixer', 'traceur', 'concat', 'uglify', 'copy']);
};
