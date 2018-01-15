#!/bin/bash
dest_dir="$HOME/workspace/ocr/imreader-client/dist"
cd ~/workspace/ocr/imreader-client; ng b --prod
cd $dest_dir && zip -r dist.zip ./
scp dist.zip ubuntu@139.199.90.34:/home/ubuntu/
ssh ubuntu@139.199.90.34 "sudo rm -rf /var/www/html/* && sudo unzip dist.zip -d /var/www/html"
