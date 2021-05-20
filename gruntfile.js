module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint'), 
    grunt.loadNpmTasks('grunt-contrib-uglify'),
    grunt.loadNpmTasks('grunt-contrib-cssmin'),
    grunt.loadNpmTasks('grunt-spritesmith'),

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', './js/*.js', './dist/*.js']
        },
        uglify: {
            my_target: {
              files: {
                'build/js/script-grunt.js': ['./js/*.js', './dist/*.js']
              }
            }
          },
          cssmin: {
            target: {
              files: [{
                expand: true,
                cwd: 'build/css',
                src: ['*.css', '!*.min.css'],
                dest: 'build/css',
                ext: '.min.css'
              }]
            }
          },
          sprite:{
            all: {
              src: 'img/*.*',
              dest: 'build/img/spritesheet.png',
              destCss: 'build/css/sprites.css'
            }
          }
    });


   
};
