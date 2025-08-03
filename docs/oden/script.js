document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star-svg');
    
    // 固定のランダム風配置データ
    const starPositions = [
        { left: 320, top: 180, rotation: 45, size: 120 },
        { left: 750, top: 450, rotation: -30, size: 90 },
        { left: 1100, top: 300, rotation: 75, size: 110 },
        { left: 200, top: 600, rotation: -15, size: 95 },
        { left: 600, top: 180, rotation: 15, size: 140 },
        { left: 450, top: 650, rotation: -67, size: 85 },
        { left: 950, top: 950, rotation: 23, size: 105 },
        { left: 180, top: 450, rotation: -31, size: 120 }
    ];
    
    stars.forEach((star, index) => {
        if (starPositions[index]) {
            const pos = starPositions[index];
            star.style.left = pos.left + 'px';
            star.style.top = pos.top + 'px';
            star.style.transform = `rotate(${pos.rotation}deg)`;
            star.style.width = pos.size + 'px';
        }
    });
});
