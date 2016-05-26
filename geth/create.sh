#!/bin/sh

echo "Cleaning old blockchain...\n\n"
# Clean old dirs
rm -Rf ./datadir/chaindata
rm -Rf ./datadir/dapp
rm ./datadir/history
rm ./datadir/nodekey

echo "Booting geth with genesis file\n\n"
echo "******************************"
geth --genesis ./setup/genesis.json \
     --datadir ./datadir \
     --networkid 201 \
     --nodiscover \
     --maxpeers 0 \
     console
