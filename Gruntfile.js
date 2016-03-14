/*global module:false*/
module.exports = function(grunt) {
  grunt.loadTasks('tasks');

  grunt.initConfig({
    solc:{
      contracts:{
        options:{
          files:['contracts/*'],
          outputdir: 'build',
          doOptimize:true
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['solc']);
};
