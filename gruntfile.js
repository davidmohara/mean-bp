module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
                //options: {
                //    beautify: true
                //},
                files: {
                    'public/lib/controllers-generated.js': ['public/js/controllers/*.js'],
                    'public/lib/services-generated.js': ['public/js/services/*.js'],
                    'public/lib/directives-generated.js': ['public/js/directives/*.js'],
                }
            }
        },
        watch: {
            jade: {
                files: ['app/views/**'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: ['public/js/**', 'app/**/*.js'],
                tasks: ['jshint', 'uglify'],
                options: {
                    livereload: true,
                },
            },
            sass: {
                files: ['app/sass/**'],
                tasks: ['sass'],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: ['public/views/**'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['public/css/**'],
                options: {
                    livereload: true
                }
            },
            mocha: {
                files: ['test/mocha/**/*.js'],
                tasks: ['mochaTest']
            }
        },
        jshint: {
            all: ['gruntfile.js', 'public/js/**/*.js', 'test/mocha/**/*.js', 'test/karma/**/*.js', 'app/**/*.js']
        },
        sass: {
            dist: {
                files: {
                    'public/css/common.css': 'app/sass/common.sass'
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app', 'config'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            server: ['nodemon', 'watch'],
            test: ['mochaTest', 'watch', 'karma']
        },
        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['test/mocha/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        }
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-sass');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'concurrent:server']);

    //Test task.
    grunt.registerTask('test', ['env:test', 'concurrent:test']);
};