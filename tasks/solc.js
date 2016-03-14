'use strict';

/**
 * My version of the original grunt-solc package
 *
 */
module.exports = function(grunt) {

  var solc = require('solc');
  var glob = require('glob');
  var path = require('path');

  grunt.registerMultiTask('solc', 'Compile solidity contracts', function() {

    var options = this.options({
      doOptimize: true,
      compilerPath: null
    });

    if (!Array.isArray(options.files) || options.files.length === 0) {
      grunt.log.error('options.files should be an array of files')
      return false;
    }

    if (options.compilerPath)
      solc.useCompilerPath(path.resolve(options.compilerPath));

    // Set default output dir
    if (!options.outputdir)
      options.outputdir = 'build/';

    if (!grunt.file.exists(options.outputdir)) {
      grunt.file.mkdir(options.outputdir);
    }

    var files = [];

    options.files.forEach(function(globPath) {
      glob.sync(globPath).forEach(function(file) {
        files.push(file);
      })
    })

    var solidityCode = files.map(function(file) {
        return grunt.file.read(file)
      }).join('\r\n\r\n'),

      solcOutput = solc.compile(solidityCode, options.doOptimize ? 1 : 0)

    if (solcOutput.errors && solcOutput.errors.length > 0) {
      solcOutput.errors.forEach(function(err) {
        grunt.log.error(err);
      })
      return false;

    } else {

      grunt.log.success("Compiling contracts...");

      for (var contractName in solcOutput.contracts) {
        var outputName = contractName.toLowerCase() + ".sol.js";
        var fn = path.normalize(path.join(options.outputdir, outputName));

        var o = {
          name: contractName,
          code: "0x" + solcOutput.contracts[contractName].bytecode,
          abi: JSON.parse(solcOutput.contracts[contractName].interface)
        };

        var body = "module.exports = " + JSON.stringify(o, null, 4);
        grunt.file.write(fn, body);
        grunt.log.success('> compiled ' + contractName);

      }
    }
  });
};
