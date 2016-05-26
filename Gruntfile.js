/*global module:false*/
module.exports = function(grunt) {
  grunt.loadTasks('tasks');

  grunt.initConfig({
    solc: {
      contracts: {
        options: {
          files: ['contracts/*'],
          outputdir: 'build',
          doOptimize: true
        }
      }
    },
    gethwallet: {
      options: {
        password: "123",
        keystore: 'geth/datadir/keystore'
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['solc']);
  grunt.registerTask('wallet', ['gethwallet']);
};
