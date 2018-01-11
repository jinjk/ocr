#!/bin/bash
src_dir="$HOME/workspace/ocr/imreader-client/dist"
dest_dir="$HOME/workspace/ocr/form-reader/src/main/resources/static"
# cd ~/workspace/ocr/imreader-client; ng b --prod
cp -r "$dest_dir/sample" "$src_dir/" && \
rm -r "$dest_dir" && \
cp -r "$src_dir" "$dest_dir" && \
cd ~/workspace/ocr/form-reader/; mvn package -DskipTests && \
echo 'jDXAtKgktPB9WrLG' | scp target/form-reader-0.0.1-SNAPSHOT.jar ubuntu@139.199.90.34:/home/ubuntu/