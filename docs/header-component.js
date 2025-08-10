// 共通ヘッダーのHTML構造
const headerHTML = `
<header class="main-header">
  <div class="header-container">
    <div class="title-menu-group">
      <h1 class="site-title">かぷせるわーるど</h1>
      <button class="hamburger-menu" id="hamburger-menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <nav class="header-nav" id="header-nav">
      <ul>
        <li><a href="../index.html">ホーム</a></li>
        <li><a href="../select-machine/select-machine.html">ガチャ選択</a></li>
        <li><a href="../shohin-ichiran/">商品一覧</a></li>
      </ul>
    </nav>
  </div>
</header>
`;

// 共通ヘッダーのCSS
const headerCSS = `
/* ヘッダーのスタイル */
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
    opacity: 1;
    transform: translateY(0);
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
    font-family: 'Yusei Magic', sans-serif;
    font-size: 28px;
    font-weight: 600;
    color: #57534d;
    margin: 0;
    letter-spacing: 0.05em;
}

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
    font-family: 'Yusei Magic', sans-serif;
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

/* メインコンテンツのためのトップマージン */
body {
    padding-top: 70px !important;
}
`;

// ヘッダーを初期化する関数
function initHeader() {
    // 既存のヘッダースタイルがない場合のみCSSを追加
    if (!document.querySelector('style[data-header-styles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-header-styles', 'true');
        style.textContent = headerCSS;
        document.head.appendChild(style);
    }
    
    // Josefin Sans フォントを追加（まだない場合）
    if (!document.querySelector('link[href*="Josefin+Sans"]')) {
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
    }
    
    // HTMLを追加（既存のヘッダーがない場合のみ）
    if (!document.querySelector('.main-header')) {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
    
    // ハンバーガーメニューのイベントリスナーを追加
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const headerNav = document.getElementById('header-nav');
    
    if (hamburgerMenu && headerNav) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            headerNav.classList.toggle('active');
        });

        // ナビゲーションリンクをクリックしたらメニューを閉じる
        document.querySelectorAll('.header-nav a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                headerNav.classList.remove('active');
            });
        });
    }
}

// DOMが読み込まれたら初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
} else {
    initHeader();
}
