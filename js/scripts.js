/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
*/

// 原本的 Bootstrap 行為：保持不動
window.addEventListener('DOMContentLoaded', event => {

    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

/* -------------------------------------------------------------
   ⭐⭐ 作品圖片分類 + 切換功能 ⭐⭐
-------------------------------------------------------------- */

const gallery = {
    draw: [
        "assets/img/JIHOON-3.png",
        "assets/img/A113080015_黃梓瑜_V03.jpg",
        "assets/img/插圖251020-2.jpg",
        "assets/img/宣傳圖_工作區域 1.jpg",
    ],
    edit: [
        "assets/img/지훈 (234).png",
        "assets/img/지훈 (188).png",
        "assets/img/지훈15.png",
        "assets/img/지훈25.png",
        "assets/img/지훈34.png",
        "assets/img/지훈189.png",
    ]
};

let currentCategory = "draw"; 
let currentIndex = 0;

function updateImage(fade = true) {
    const img = document.getElementById("work-img");
    if (!img) return;

    if (fade) {
        img.classList.add("fade-out");
        setTimeout(() => {
            img.src = gallery[currentCategory][currentIndex];
            img.classList.remove("fade-out");
        }, 300);
    } else {
        img.src = gallery[currentCategory][currentIndex];
    }
}

function changeCategory(cat) {
    currentCategory = cat;
    currentIndex = 0;
    updateImage(true);

    document.querySelectorAll(".work-category span").forEach(el => el.classList.remove("active"));
    document.getElementById("cat-" + cat).classList.add("active");

    renderThumbnails();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + gallery[currentCategory].length) % gallery[currentCategory].length;
    updateImage(true);
    updateThumbnailHighlight();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % gallery[currentCategory].length;
    updateImage(true);
    updateThumbnailHighlight();
}

function renderThumbnails() {
    const container = document.getElementById("thumbnail-container");
    container.innerHTML = "";

    gallery[currentCategory].forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.onclick = () => {
            currentIndex = index;
            updateImage(true);
            updateThumbnailHighlight();
        };
        container.appendChild(img);
    });

    updateThumbnailHighlight();
}

function updateThumbnailHighlight() {
    const thumbnails = document.querySelectorAll("#thumbnail-container img");
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle("thumbnail-active", i === currentIndex);
    });
}

// ----------------------
// 這裡放 window load 之後的事件
// ----------------------
window.addEventListener("load", () => {
    updateImage(false);
    renderThumbnails();

    const imgElement = document.getElementById("work-img");

    if (imgElement) {
        // 滑動切換
        let startX = 0;
        let endX = 0;

        imgElement.addEventListener("touchstart", e => startX = e.touches[0].clientX);
        imgElement.addEventListener("touchend", e => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        imgElement.addEventListener("mousedown", e => startX = e.clientX);
        imgElement.addEventListener("mouseup", e => {
            endX = e.clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const diff = endX - startX;
            if (Math.abs(diff) > 50) {
                if (diff < 0) nextImage();
                else prevImage();
            }
        }

        // 鍵盤左右鍵切換
        document.addEventListener("keydown", event => {
            if (event.key === "ArrowLeft") prevImage();
            else if (event.key === "ArrowRight") nextImage();
        });
    }
});

/* Interests 切換內容 */
function switchInterest(type) {
    // 移除所有 active
    document.querySelectorAll(".interest-tab").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".interest-panel").forEach(panel => panel.classList.remove("active-panel"));

    // 新的 active
    document.getElementById("tab-" + type).classList.add("active");
    document.getElementById(type).classList.add("active-panel");
}
/* -------------------------------------------------------------
   ⭐⭐ 喜歡的繪師：分類 + 左右切換 + 滑動 ⭐⭐
-------------------------------------------------------------- */

const artistGallery = {
    artistA: [
        "assets/img/米山舞.jpg",
        "assets/img/米山舞2.jpg",
        "assets/img/米山舞3.jpg",
    ],
    artistB: [
        "assets/img/MANFUNG-1.jpg",
        "assets/img/MANFUNG-2.jpg",
    ],
};

let currentArtist = "artistA";
let currentArtistIndex = 0;

// 切換繪師
function changeArtist(name) {
    currentArtist = name;
    currentArtistIndex = 0;

    document.querySelectorAll(".artist-tab").forEach(el =>
        el.classList.remove("active")
    );

    document.getElementById("artist-" + name).classList.add("active");

    updateArtistImg();
}

// 更新圖片
function updateArtistImg(fade = true) {
    const img = document.getElementById("artist-img");
    if (!img) return;

    if (fade) {
        img.classList.add("fade-out");
        setTimeout(() => {
            img.src = artistGallery[currentArtist][currentArtistIndex];
            img.classList.remove("fade-out");
        }, 300);
    } else {
        img.src = artistGallery[currentArtist][currentArtistIndex];
    }
}

// 上一張
function prevArtistImg() {
    currentArtistIndex =
        (currentArtistIndex - 1 + artistGallery[currentArtist].length) %
        artistGallery[currentArtist].length;

    updateArtistImg(true);
}

// 下一張
function nextArtistImg() {
    currentArtistIndex =
        (currentArtistIndex + 1) % artistGallery[currentArtist].length;

    updateArtistImg(true);
}

// 手機滑動
function bindArtistSwipe() {
    const img = document.getElementById("artist-img");
    if (!img) return;

    let startX = 0;
    let endX = 0;

    img.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    img.addEventListener("touchend", e => {
        endX = e.changedTouches[0].clientX;
        const diff = endX - startX;

        if (Math.abs(diff) > 50) {
            diff < 0 ? nextArtistImg() : prevArtistImg();
        }
    });
}

// 畫面載入後初始化
window.addEventListener("load", () => {
    updateArtistImg(false);
    bindArtistSwipe();
});

// 各成員對應的圖片集
const idolGallery = {
    TWS: ["assets/img/TWS.jpeg", "assets/img/TWS2.jpeg", "assets/img/TWS3.jpeg"],
    B: ["assets/img/memberB1.jpeg", "assets/img/memberB2.jpeg"],
    C: ["assets/img/memberC1.jpeg", "assets/img/memberC2.jpeg"]
};

let currentIdol = "TWS";
let currentIdolIndex = 0;

function updateIdolImg() {
    document.getElementById("idol-img").src = idolGallery[currentIdol][currentIdolIndex];
}

function changeIdol(name) {
    currentIdol = name;
    currentIdolIndex = 0;
    updateIdolImg();

    // 樣式切換
    document.querySelectorAll(".idol-tab").forEach(tab => tab.classList.remove("active"));
    document.getElementById("idol-" + name).classList.add("active");
}

function prevIdolImg() {
    currentIdolIndex = (currentIdolIndex - 1 + idolGallery[currentIdol].length) % idolGallery[currentIdol].length;
    updateIdolImg();
}

function nextIdolImg() {
    currentIdolIndex = (currentIdolIndex + 1) % idolGallery[currentIdol].length;
    updateIdolImg();
}

// 初始化
window.addEventListener("load", () => {
    updateIdolImg();

    const imgElement = document.getElementById("idol-img");
    let startX = 0;

    // 手指滑動
    imgElement.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    imgElement.addEventListener("touchend", e => {
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 50) diff < 0 ? nextIdolImg() : prevIdolImg();
    });

    // 滑鼠拖曳
    imgElement.addEventListener("mousedown", e => startX = e.clientX);
    imgElement.addEventListener("mouseup", e => {
        const diff = e.clientX - startX;
        if (Math.abs(diff) > 50) diff < 0 ? nextIdolImg() : prevIdolImg();
    });

    // 鍵盤左右鍵
    document.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft") prevIdolImg();
        if (e.key === "ArrowRight") nextIdolImg();
    });
});

