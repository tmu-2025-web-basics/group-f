document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.scroll-container');
  const imageList = document.getElementById('imageList');
  let items = Array.from(document.querySelectorAll('.image-item'));
  const originalCount = items.length;

  // 各ガチャ機商品指定
  const resultImages = [
    // 有名
    ["../images/oden1.jpg","../images/animal1.jpg","../images/onigiring1.jpg",],
    // 実際に使える
    ["../images/fan1.jpg","../images/cleaner1.jpg","../images/canmaker1.jpg"],
    // ミニチュア
    ["../images/digicamera1.jpg","../images/umbrella1.jpg","../images/jikokuhyou1.jpg"],
    // 謎
    ["../images/pandebin1.jpg","../images/plamodel1.jpg"],
    // 今日のおすすめ(全部)
    ["../images/oden1.png","../images/animal1.jpg", "../images/onigiring1.jpg", 
    "../images/cleaner1.jpg","../images/fan1.jpg", "../images/canmaker1.jpg",
    "../images/digicamera1.jpg", "../images/umbrella1.jpg", "../images/jikokuhyou1.jpg",
    "../images/pandebin1.jpg", "../images/plamodel1.jpg"],
  ]

  // 商品名のマッピング
  const productNames = {
    "../images/oden1.jpg": "まちぼうけ-おでん-",
    "../images/animal1.jpg": "まちぼうけ-やわらか-",
    "../images/onigiring1.jpg": "おにぎりんぐ",
    "../images/cleaner1.jpg": "デスクトップクリーナー -レガシー-",
    "../images/fan1.jpg": "コンパクトハンディファン -ブリーズ-",
    "../images/canmaker1.jpg": "本当に作れる! ミニミニ缶バッチメーカーマスコット",
    "../images/digicamera1.jpg": "レトロカメラペンダントマスコット",
    "../images/umbrella1.jpg": "Wpc.アンブレラ ミニチュアコレクション",
    "../images/jikokuhyou1.jpg": "JR時刻表",
    "../images/pandebin1.jpg": "PANSHEL'S WORLD ふわふわぬいぐるみ巾着",
    "../images/plamodel1.jpg": "組める⁉︎ プラスチックモデルマスコット"
  };

  // 画像・ページのマッピング
  const imageToPageMap = {
    "../images/oden1.jpg": "../oden/oden.html",
    "../images/animal1.jpg": "../panda/panda.html",
    "../images/onigiring1.jpg": "../onigiri/onigiri.html",
    "../images/cleaner1.jpg": "../soudiki/soudiki.html",
    "../images/fan1.jpg": "../fan/fan.html",
    "../images/canmaker1.jpg": "../badge/badge.html",
    "../images/digicamera1.jpg": "../camera/camera.html",
    "../images/umbrella1.jpg": "../kasa/kasa.html",
    "../images/jikokuhyou1.jpg": "../jr/jr.html",
    "../images/pandebin1.jpg": "../kinntyaku/kinntyaku.html",
    "../images/plamodel1.jpg": "../hikouki/hikouki.html"
  };

  // 現在表示されている画像のパスを保存する変数
  let currentDisplayedImage = "";

  // 画像リストを5倍に複製
  for (let i = 0; i < 4; i++) {
    items.forEach(item => {
      const clone = item.cloneNode(true);
      imageList.appendChild(clone);
    });
  }
  items = Array.from(document.querySelectorAll('.image-item'));

  // 初期位置を中央の同じ画像に
  setTimeout(() => {
    items[originalCount * 2].scrollIntoView({behavior: 'auto', inline: 'center'});
    updateCenteredImage();
  }, 10);

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
    });
  });
  
  // 中央の画像を強調表示する関数
  function updateCenteredImage() {
    const items = Array.from(document.querySelectorAll('.image-item'));
    const centeredIdx = getCenteredIndex();
    
    items.forEach((item, idx) => {
      if (idx === centeredIdx) {
        item.classList.add('centered');
      } else {
        item.classList.remove('centered');
      }
    });
  }

  function centerClosestImage() {
    const container = document.querySelector('.scroll-container');
    const items = Array.from(document.querySelectorAll('.image-item'));
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let minDist = Infinity;
    let closestItem = null;
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const dist = Math.abs(itemCenter - containerCenter);
      if (dist < minDist) {
        minDist = dist;
        closestItem = item;
      }
    });
    if (closestItem) {
      closestItem.scrollIntoView({behavior: 'smooth', inline: 'center'});
    }
    // 中央画像の更新
    setTimeout(() => updateCenteredImage(), 100);
  }
  
  function getCenteredIndex() {
    const container = document.querySelector('.scroll-container');
    const items = Array.from(document.querySelectorAll('.image-item'));
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let minDist = Infinity;
    let closestIdx = 0;
    items.forEach((item, idx) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const dist = Math.abs(itemCenter - containerCenter);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = idx;
      }
    });
    return closestIdx;
  }

  document.getElementById('moveLeft').addEventListener('click', function() {
    items = Array.from(document.querySelectorAll('.image-item'));
    let idx = getCenteredIndex();
    if (idx > 0) {
      items[idx - 1].scrollIntoView({behavior: 'smooth', inline: 'center'});
    } else {
      items[items.length - 1].scrollIntoView({behavior: 'smooth', inline: 'center'});
    }
    setTimeout(() => updateCenteredImage(), 300);
  });
  document.getElementById('moveRight').addEventListener('click', function() {
    items = Array.from(document.querySelectorAll('.image-item'));
    let idx = getCenteredIndex();
    if (idx < items.length - 1) {
      items[idx + 1].scrollIntoView({behavior: 'smooth', inline: 'center'});
    } else {
      items[0].scrollIntoView({behavior: 'smooth', inline: 'center'});
    }
    setTimeout(() => updateCenteredImage(), 300);
  });

  // --- ガチャアニメーション制御 ---
  const gachaAnimation = document.getElementById('gachaAnimation');
  let isAnimating = false;

  // 「このガチャを回す」ボタンの処理
  document.getElementById('gachaBtn').addEventListener('click', function() {
    if (isAnimating) return;
    isAnimating = true;
    const gachaBtn = document.getElementById('gachaBtn');
    gachaBtn.style.display = 'none'; // ボタンを非表示
    
    // 中央の画像に基づいてランダムな結果画像を選択
    const centeredIdx = getCenteredIndex() % originalCount;
    const selectedImages = resultImages[centeredIdx] || resultImages[0];
    const randomImage = selectedImages[Math.floor(Math.random() * selectedImages.length)];
    
    // ポップアップの画像を設定
    document.getElementById('resultImage').src = randomImage;
    
    // 商品名を設定
    const productName = productNames[randomImage] || "商品名不明";
    document.getElementById('resultTitle').textContent = productName;
    
    // 現在表示されている画像を記録
    currentDisplayedImage = randomImage;
    
    gachaAnimation.style.display = 'block';
    
    // カプセル色を中央画像ごとに変更
    const colorSets = [
      // 有名
      { top: '#fb9ea4',
        topBorder: '#d7797f',
        bottom: '#ffffff',
        bottomBorder: '#e0e0e0',
       },
      // リアルマシン
      { top: '#b7e9e6',
        topBorder: '#8dd9d4', 
        bottom: '#ffffff',
        bottomBorder: '#e0e0e0',
       },
      // ミニチュア
      { top: '#e2ebc5', 
        topBorder: '#cedd9d', 
        bottom: '#ffffff',
        bottomBorder: '#e0e0e0',
       },
      // ランダム
      { top: '#ffeaa0', 
        topBorder: '#ead27c', 
        bottom: '#ffffff',
        bottomBorder: '#e0e0e0',
       },
      // おすすめ
      { top: '#fbd1e5', 
        topBorder: '#e1a2c0', 
        bottom: '#ffffff',
        bottomBorder: '#e0e0e0',
       },
    ];
    const color = colorSets[centeredIdx] || colorSets[0];
    
    // カプセル色設定
    const capsuleTop = document.querySelector('#capsule .capsule-top');
    const capsuleBottom = document.querySelector('#capsule .capsule-bottom');
    capsuleTop.style.background = color.top;
    capsuleTop.style.borderTop = `2px solid ${color.topBorder}`;
    capsuleTop.style.borderLeft = `2px solid ${color.topBorder}`;
    capsuleTop.style.borderRight = `2px solid ${color.topBorder}`;
    capsuleBottom.style.background = color.bottom;
    capsuleBottom.style.borderBottom = `2px solid ${color.bottomBorder}`;
    capsuleBottom.style.borderLeft = `2px solid ${color.bottomBorder}`;
    capsuleBottom.style.borderRight = `2px solid ${color.bottomBorder}`;

    // 0.5秒待ってからアニメーション開始
    setTimeout(() => {
      const lever = gachaAnimation.querySelector('.machine-lever');
      if (!lever) {
        console.error('レバーが見つかりません');
        isAnimating = false;
        gachaBtn.style.display = '';
        return;
      }
      
      // ガチャ音再生
      const gachaSound = document.getElementById('gacha-sound');
      if (gachaSound) {
        gachaSound.currentTime = 0;
        gachaSound.play();
      }
      
      // 1回転目
      lever.style.transition = 'transform 1.5s cubic-bezier(.7,1.7,.7,1)';
      lever.style.transform = `translateX(-50%) rotate(360deg)`;
      
      setTimeout(() => {
        // 2回転目
        lever.style.transition = 'transform 1.5s cubic-bezier(.7,1.7,.7,1)';
        lever.style.transform = `translateX(-50%) rotate(720deg)`;
        
        setTimeout(() => {
          lever.style.transition = 'none';
          lever.style.transform = `translateX(-50%) rotate(0deg)`;
          
          // カプセル表示（修正版）
          const capsule = document.getElementById('capsule');
          if (!capsule) {
            console.error('カプセルが見つかりません');
            isAnimating = false;
            gachaBtn.style.display = '';
            gachaAnimation.style.display = 'none';
            return;
          }
          
          const { offsetX, offsetY } = calculateCapsulePosition();
          
          // カプセルのスタイルを強制的に設定
          capsule.style.display = 'block';
          capsule.style.position = 'fixed';
          capsule.style.left = `calc(50% + ${offsetX}px)`;
          capsule.style.bottom = `calc(50% + ${offsetY}px)`;
          capsule.style.transform = 'translate(-50%, 50%) scale(1)';
          capsule.style.zIndex = '15';
          capsule.style.visibility = 'visible';
          capsule.style.opacity = '1';
          
          // 一度強制的にリフローを発生させる
          capsule.offsetHeight;
          
          capsule.classList.add('shake');
          
          // ポン音再生（カプセル出現時）
          setTimeout(() => {
            const ponSound = document.getElementById('pon-sound');
            if (ponSound) {
              ponSound.currentTime = 0;
              ponSound.play();
            }
          }, 1100);
          
          setTimeout(() => {
            capsule.classList.remove('shake');
            setTimeout(() => {
              if (window.innerWidth <= 600) {
                // 小さい画面（スマホ）での開く位置
                capsule.style.left = '30%';   // 中央
                capsule.style.bottom = '55%'; // 少し下
              } else {
                // 大きい画面での開く位置
                capsule.style.left = '60%';   // 現在の位置
                capsule.style.bottom = '40%'; // 現在の位置
              }
              const maxScale = capsule.dataset.maxScale || 4;
              capsule.style.transform = `translate(-50%, 50%) scale(${maxScale})`;
              
              setTimeout(() => {
                capsule.classList.add('open');
                setTimeout(() => {
                  gachaAnimation.style.display = 'none';
                  capsule.classList.remove('open');
                  capsule.style.display = 'none';
                  isAnimating = false;
                  document.getElementById('popup').style.display = 'flex';
                  gachaBtn.style.display = '';
                }, 700);
              }, 1300);
            }, 200);
          }, 300);
        }, 1500);
      }, 1500);
    }, 500);
  });

  // ポップアップ「もう一度回す」ボタン
  document.getElementById('retryBtn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
    // アニメーションを再度再生
    document.getElementById('gachaBtn').click();
  });

  // ポップアップ「詳しく見る」ボタン
  document.getElementById('detailBtn').addEventListener('click', function() {
    const targetPage = imageToPageMap[currentDisplayedImage];
    if (targetPage) {
      window.location.href = targetPage;
    } else {
      window.location.href = 'default-detail.html';
    }
  });

  document.getElementById('closePopupBtn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
  });


  let scrollTimeout;
  container.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      centerClosestImage();
      updateCenteredImage();
      
      // 端から2番目で中央の同じ画像にジャンプ（アニメーションなし）
      const items = Array.from(document.querySelectorAll('.image-item'));
      const threshold = 100;
      // 左端から2番目
      if (container.scrollLeft < items[1].offsetLeft - threshold) {
        const centeredIdx = getCenteredIndex() % originalCount;
        items[originalCount * 2 + centeredIdx].scrollIntoView({behavior: 'auto', inline: 'center'});
        updateCenteredImage();
      }
      // 右端から2番目
      else if (container.scrollLeft > items[items.length - 2].offsetLeft - container.clientWidth + threshold) {
        const centeredIdx = getCenteredIndex() % originalCount;
        items[originalCount * 2 + centeredIdx].scrollIntoView({behavior: 'auto', inline: 'center'});
        updateCenteredImage();
      }
    }, 150);
  });

  function updateLeverAndCapsulePosition() {
    const gachaAnimation = document.getElementById('gachaAnimation');
    if (!gachaAnimation) return;
    
    const lever = gachaAnimation.querySelector('.machine-lever');
    const leverEqList = gachaAnimation.querySelectorAll('.lever-eq');
    const capsule = document.getElementById('capsule');
    
    // カプセルのサイズを画面高さに応じて変更
    const scale = Math.min(window.innerHeight / 650, 1);
    const baseCapsuleSize = 40;
    const currentCapsuleSize = Math.max(25, baseCapsuleSize * scale);
    
    document.documentElement.style.setProperty('--capsule-size', currentCapsuleSize + 'px');
    
    const baseScale = 6;
    const currentMaxScale = Math.max(3, baseScale * scale);
    if (capsule) {
      capsule.dataset.maxScale = currentMaxScale;
    }
    
    // レバー位置の調整（画面幅に応じて段階的に）
    if (lever) {
      if (window.innerWidth >= 650) {
        lever.style.width = '150px';
        lever.style.height = '150px';
        lever.style.bottom = '-220px'; 
        lever.style.border = '10px solid #9eccdd';
        
        leverEqList.forEach(eq => {
          eq.style.width = '150px';
          eq.style.height = '10px';
          eq.style.margin = '40px';
        });
      } else {
        lever.style.width = '55px';
        lever.style.height = '55px';
        lever.style.bottom = '103px';
        lever.style.border = '8px solid #9eccdd';
        
        leverEqList.forEach(eq => {
          eq.style.width = '55px';
          eq.style.height = '5px';
          eq.style.margin = '10px'; 
        });
      }
      
      lever.style.left = '50%';
      lever.style.transform = 'translateX(-50%)';
      lever.style.position = 'absolute';
      lever.style.background = '#fff';
      lever.style.borderRadius = '50%';
      lever.style.display = 'flex';
      lever.style.alignItems = 'center';
      lever.style.justifyContent = 'center';
      lever.style.zIndex = '3';
    }
  }

  // カプセルの初期出現位置を計算する関数（修正版）
  function calculateCapsulePosition() {
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    
    // 画面サイズに応じてオフセットを調整
    let offsetX, offsetY;
    
    if (screenWidth <= 600) {
      // スマホ画面
      offsetX = -90;
      offsetY = -59;
    } else {
      offsetX = -170;
      offsetY = -280;
    }
    
    return { offsetX, offsetY };
  }

  window.addEventListener('resize', updateLeverAndCapsulePosition);
  updateLeverAndCapsulePosition();
});