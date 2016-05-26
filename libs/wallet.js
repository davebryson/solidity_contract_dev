/**
 * Code adapted from the most excellent 'myetherwallet'
 */

'use strict';

let utils = require('ethereumjs-util');
utils.scrypt = require('scryptsy');
utils.crypto = require('crypto');
utils.uuid = require('uuid');

exports.Wallet = class Wallet {

  constructor(privKey) {
    this.privKey = privKey;
  }

  get privateKey() {
    return this.privKey;
  }

  get publicKey() {
    return utils.privateToPublic(this.privKey);
  }

  get address() {
    return utils.privateToAddress(this.privKey)
  }

  toV3(password) {
    var salt = utils.crypto.randomBytes(32)
    var iv = utils.crypto.randomBytes(16)
    var derivedKey
    var kdf = 'scrypt'
    var kdfparams = {
      dklen: 32,
      salt: salt.toString('hex'),
      n: 1024,
      r: 8,
      p: 1
    }

    derivedKey = utils.scrypt(new Buffer(password), salt, kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
    var cipher = utils.crypto.createCipheriv('aes-128-ctr', derivedKey.slice(0, 16), iv);
    if (!cipher) {
      throw new Error('Unsupported cipher')
    }
    var ciphertext = Buffer.concat([cipher.update(this.privKey), cipher.final()])
    var mac = utils.sha3(Buffer.concat([derivedKey.slice(16, 32), new Buffer(ciphertext, 'hex')]))
    return {
      version: 3,
      id: utils.uuid.v4({
        random: utils.crypto.randomBytes(16)
      }),
      address: this.address.toString('hex'),
      Crypto: {
        ciphertext: ciphertext.toString('hex'),
        cipherparams: {
          iv: iv.toString('hex')
        },
        cipher: 'aes-128-ctr',
        kdf: kdf,
        kdfparams: kdfparams,
        mac: mac.toString('hex')
      }
    }
  }

  toV3String(password, opts) {
    return JSON.stringify(this.toV3(password, opts))
  }

  get V3Filename() {
    var ts = new Date();
    return [
      'UTC--',
      ts.toJSON().replace(/:/g, '-'),
      '--',
      this.address.toString('hex')
    ].join('')
  }
}

exports.generateWallet = () => {
  return new exports.Wallet(utils.crypto.randomBytes(32));
}


exports.createWalletFromPrivateKey = (privKey) => {
  return new exports.Wallet(privKey);
}

//let decipherBuffer = function(decipher, data) {
//  return Buffer.concat([decipher.update(data), decipher.final()])
// }

exports.loadWalletFromV3 = (input, password) => {
  var json = (typeof input === 'object') ? input : JSON.parse(input.toLowerCase());
  if (json.version !== 3) {
    throw new Error('Not a V3 wallet')
  }
  var derivedKey
  var kdfparams
  if (json.crypto.kdf === 'scrypt') {
    kdfparams = json.crypto.kdfparams
    derivedKey = utils.scrypt(new Buffer(password), new Buffer(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen)
  } else {
    throw new Error('Unsupported key derivation scheme')
  }
  var ciphertext = new Buffer(json.crypto.ciphertext, 'hex')
  var mac = utils.sha3(Buffer.concat([derivedKey.slice(16, 32), ciphertext]))
  if (mac.toString('hex') !== json.crypto.mac) {
    throw new Error('Key derivation failed - possibly wrong passphrase')
  }
  var decipher = utils.crypto.createDecipheriv(json.crypto.cipher, derivedKey.slice(0, 16), new Buffer(json.crypto.cipherparams.iv, 'hex'))
  var seed = Buffer.concat([decipher.update(ciphertext), decipher.final()])
  //var seed = decipherBuffer(decipher, ciphertext, 'hex')
  return new exports.Wallet(seed)
}
