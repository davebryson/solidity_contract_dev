#!/bin/sh


echo "Starting geth...\n"
echo "******************************"
geth --datadir ./datadir \
     --networkid 201 \
     --nodiscover \
     --maxpeers 0 \
     --verbosity 0 \
     --rpcapi "eth,web3" \
     js "scripts/mine.js"
