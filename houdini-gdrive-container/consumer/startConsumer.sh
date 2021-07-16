#!/bin/bash

#source houdini env and point hserver to license server 
source sourceHoudini.sh 
hserver 
hserver -S 23.23.238.129:1715

#start listening 2 da q
cd /root/consumer
npm start 
cd ~