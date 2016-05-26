
// Generate a wallet, keystore file, and genesis.json

'use strict';

module.exports = function(grunt) {

  let path = require('path');
  let w = require('../libs/wallet.js');

  grunt.registerTask('gethwallet', 'Create funded genesis file', function() {
    let opts = this.options();

    if (!opts.password) {
      opts.password = 'password';
      grunt.log.write("Setting default account password to: \'password\'");
    }

    if (!opts.keystore) {
      opts.keystore = 'geth/datadir/keystore'
      grunt.log.write("Setting default keystore path to: \'geth/datadir/keystore\'");
    }

    // Generate a wallet for keystore
    let wallet = w.generateWallet();
    // Generate V3 format
    let v3 = wallet.toV3String(opts.password);
    // Save keystore file to Geth
    var walletFile = path.normalize(path.join(opts.keystore, wallet.V3Filename));
    grunt.file.write(walletFile, v3);

    grunt.log.success("Created wallet in keystore...");
    grunt.log.success("Address : " + "0x" + wallet.address.toString('hex'));
    grunt.log.success("Password: " + opts.password);
  });

}
