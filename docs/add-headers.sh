#!/bin/bash

# ヘッダーを追加する必要があるHTMLファイルのリスト
files=(
  "kasa/kasa.html"
  "onigiri/onigiri.html" 
  "oden/oden.html"
  "kinntyaku/kinntyaku.html"
  "hikouki/hikouki.html"
  "fan/fan.html"
  "badge/badge.html"
  "soudiki/soudiki.html"
)

cd /Users/konponkarin/Downloads/group-f-main/docs

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    
    # Josefin Sans フォントリンクとheader-component.jsスクリプトを追加
    sed -i '' '/<link href="https:\/\/fonts.googleapis.com\/css2?family=Yusei+Magic/a\
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">' "$file"
    
    sed -i '' '/<link rel="stylesheet" href="style.css">/a\
    <script src="../header-component.js"></script>' "$file"
    
    echo "Updated $file"
  else
    echo "File $file not found"
  fi
done

echo "Header component added to all files!"
