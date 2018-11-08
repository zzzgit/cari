#!/bin/bash
if [ $1 == "set" ]; then
    echo set
    exit 0
fi
url_tmpl="http://dict.cn/{word_s}"

url=${url_tmpl/\{word_s\}/$1}
source=$(curl -sS $url)
# node ./bin/ccc.js $source
echo $source | node ./bin/dict.js
