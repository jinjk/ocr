#!/bin/bash
dest_dir="$HOME/workspace/ocr/form-reader"
cd $dest_dir; mvn package -DskipTests
scp $dest_dir/target/*.jar ubuntu@139.199.90.34:/home/ubuntu/
ssh ubuntu@139.199.90.34 "pkill java; java -jar form-reader-0.0.1-SNAPSHOT.jar | tee spring.log &"
