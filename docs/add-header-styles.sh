#!/bin/bash

# ヘッダースタイルを追加するCSSファイルのリスト
css_files=(
  "jr/style.css"
  "kasa/style.css"
  "onigiri/style.css"
  "oden/style.css"
  "kinntyaku/style.css"
  "hikouki/style.css"
  "fan/style.css"
  "badge/style.css"
  "soudiki/style.css"
)

# ヘッダースタイルのテンプレート
header_css='/* ヘッダーのスタイル */
.main-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(8px);
    z-index: 1000;
    padding: 15px 0;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
    opacity: 0;
    transform: translateY(-100%);
    transition: opacity 1s ease-in-out, transform 1s ease-in-out;
}

.main-header.show {
    opacity: 1;
    transform: translateY(0);
}

.header-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 10px 0 20px;
    position: relative;
}

.title-menu-group {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-right: -5px;
}

.site-title {
    font-family: '\''Yusei Magic'\'', sans-serif;
    font-size: 28px;
    font-weight: 600;
    color: #57534d;
    margin: 0;
    letter-spacing: 0.05em;
    text-decoration: none;
}

/* ハンバーガーメニューボタン */
.hamburger-menu {
    display: flex;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    z-index: 1001;
}

.hamburger-menu span {
    width: 25px;
    height: 3px;
    background-color: #57534d;
    margin: 3px 0;
    transition: 0.3s;
    border-radius: 2px;
}

.hamburger-menu.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.hamburger-menu.active span:nth-child(2) {
    opacity: 0;
}

.hamburger-menu.active span:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
}

/* ナビゲーションメニュー - 常にハンバーガーメニューで制御 */
.header-nav {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.header-nav.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
}

.header-nav ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0;
    margin: 0;
    padding: 20px;
}

.header-nav li {
    border-bottom: 1px solid rgba(87, 83, 77, 0.1);
}

.header-nav li:last-child {
    border-bottom: none;
}

.header-nav a {
    text-decoration: none;
    color: #57534d;
    font-family: '\''Josefin Sans'\'', sans-serif;
    font-size: 16px;
    font-weight: 500;
    padding: 15px 0;
    display: block;
    text-align: center;
    border-radius: 0;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.header-nav a:hover {
    background-color: rgba(232, 240, 233, 0.6);
    color: #2d4a31;
}

'

cd /Users/konponkarin/Downloads/group-f-main/docs

for css_file in "${css_files[@]}"; do
  if [ -f "$css_file" ]; then
    echo "Processing $css_file..."
    
    # ファイルの先頭にヘッダースタイルを追加（既に存在しない場合のみ）
    if ! grep -q "ヘッダーのスタイル" "$css_file"; then
      # 元のファイルをバックアップ
      cp "$css_file" "$css_file.backup"
      
      # ヘッダースタイルを先頭に追加
      echo "$header_css" > temp_file
      cat "$css_file" >> temp_file
      mv temp_file "$css_file"
      
      echo "Added header styles to $css_file"
    else
      echo "Header styles already exist in $css_file"
    fi
    
  else
    echo "File $css_file not found"
  fi
done

echo "Header styles added to all CSS files!"
