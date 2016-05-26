
# Basic Web3/Solidity development environment

Based on ideas from Truffle and others.  I wanted something simpler that
kept me *closer* to the web3 api.

Includes all the setup needed to write and test web3 and contracts code
via a private geth network:

* Run `create.sh` to create a custom genesis block with a pre-allocation of 300 ether for the wallet in keystore. See `geth/setup/README.txt` for information on the pre-allocated account.
* Run `run.sh` to start geth.  It configures geth to only mine on transactions
* You can run custom console scripts via `./runscript.sh MYSCRIPT`

## Requirements
* Node.js
* Geth

## How to use:

1. Checkout a copy of this repo
2. Remove the `.git` directory
3. Rename the directory to whatever you want
4. Run `npm install`
4. Develop your contract in the `contracts` directory
5. Run `grunt` to compile contracts - see the `build` dir for results
6. Write tests in the `test` directory and run them via `npm test`

You can also run `grunt wallet` to create additional geth keystore accounts.
See `Gruntfile.js` for configuration options.
