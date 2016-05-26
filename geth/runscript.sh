#!/bin/sh


echo "Starting geth... running script $1\n"
echo "******************************"
geth --datadir ./datadir \
     --networkid 201 \
     --nodiscover \
     --maxpeers 0 \
     --verbosity 0 \
     js $1
