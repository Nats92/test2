"use strict";

(function modalManager() {
    var modalOverlay = document.querySelector(".feedback-overlay");
    var writeUsBut = document.querySelector(".write-us");
    var closeModal = document.querySelector(".modal-feedback__form-close");

    writeUsBut.addEventListener("click", function(evt) {
        evt.preventDefault();
        modalOverlay.classList.remove("hidden");

        closeModal.addEventListener("click", function () {
            modalOverlay.classList.add("hidden");
        })
    })
})();

(function hamburgerManager() {
    var hamburger = document.querySelector(".hamburger");
    var menuList = document.querySelector(".main-nav__menu-list");
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".main-nav__link"));
    var menuHambWrap = document.querySelector(".main-nav__menu-hamburger-wrap");

    function showMenu(menu) {
        menu.classList.add("dis-block");
    }
    function hideMenu(menu) {
        menu.classList.remove("dis-block");
    }
    hamburger.addEventListener("click", function() {
        if (!menuList.classList.contains("dis-block")) {
            showMenu(menuList);
        } else {
            hideMenu(menuList);
        }
    });
    window.addEventListener("resize", function() {
        if (menuList.classList.contains("dis-block")) {
            hideMenu(menuList);
        }
    });
    window.addEventListener("scroll", function() {
        if ((window.pageYOffset > 50) && (menuList.clientWidth <= 240)) {
            menuHambWrap.classList.add("pos-fixed");
        } else {
            menuHambWrap.classList.remove("pos-fixed");
        }
    });
    navLinks.forEach( function(link) {
        link.addEventListener("click", function() {
            hideMenu(menuList);
        })
    })
})();

(function scrollTopManager() {
    var scrollButton = document.querySelector(".to-top");

    scrollButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        var top = window.pageYOffset;
        var step = top / 100;

        var scr = setInterval(function () {
            top -= step;
            window.scrollTo(0, top);

            if (top < 20) {
                clearInterval(scr);
            }
        }, 5);
    })
})();

function takeOnlyNumber(val) {
    var num = 0;
    var re = /\d{1,}/;
    if (val !== "") {
        num = +val.match(re)[0];
    }
    return num;
}

(function mainNewsLengthManager() {
    var newsSlider = document.querySelector(".main-content__news-slider-wrap");
    if (!newsSlider) { return; }
    var newsItems = Array.prototype.slice.call(newsSlider.querySelectorAll(".main-content__news-item"));
    var symbolsCount = 200;

    newsItems.forEach(function(it) {
        var newsTextBox = it.querySelector(".main-content__news-item-text");
        var newsText = newsTextBox.innerText;
        var textLength = newsText.length;

        if (textLength > 200) {
            var newsInnerHtml = newsTextBox.innerHTML;
            var shorterText = newsText.substr(0, symbolsCount);
            var spaceIndex = shorterText.lastIndexOf(" ");
            var cutOffText = shorterText.substr(0, spaceIndex);
            newsTextBox.innerText = cutOffText;

            var butReadMore = it.querySelector(".main-content__news-item-read-more");
            var prewievItem = document.querySelector(".main-content__news-preview-item");
            var prewievImg = prewievItem.querySelector(".main-content__news-preview-item-img");
            var prewievTitle = prewievItem.querySelector(".main-content__news-preview-item-title h3");
            var prewievTitleAnchor = prewievItem.querySelector(".main-content__news-preview-item-title");
            var prewievText = prewievItem.querySelector(".main-content__news-preview-item-text");
            var prewievDate = prewievItem.querySelector("time");

            var prewievClose = document.querySelector(".main-content__news-preview-close");
            var previewModal = document.querySelector(".main-content__news-preview-overlay");

            butReadMore.classList.remove("hidden");
            butReadMore.addEventListener("click", function(){

                previewModal.classList.remove("hidden");

                var itemImg = it.querySelector(".main-content__news-item-img").getAttribute("src");
                var itemTitle = it.querySelector(".main-content__news-item-title h3").innerText;
                var itemTitleAnchor = it.querySelector(".main-content__news-item-title").getAttribute("href");
                var itemText = newsText;
                var itemDateAttr = it.querySelector("time").getAttribute("datetime");
                var itemDateText = it.querySelector("time").innerText;

                prewievImg.setAttribute("src", itemImg);
                prewievTitle.innerText = itemTitle;
                prewievTitleAnchor.setAttribute("href", itemTitleAnchor);
                prewievText.innerHTML = newsInnerHtml;
                prewievDate.setAttribute("datetime", itemDateAttr);
                prewievDate.innerText = itemDateText;

                prewievClose.addEventListener("click", function onCloseClick() {
                    previewModal.classList.add("hidden");
                    prewievClose.removeEventListener("click", onCloseClick);
                })
            })
        }
    })
})();

(function newsManager() {
    var newsSection = document.querySelector(".main-content__news");
    var arrowLeft = newsSection.querySelector(".main-content__news-control--left");
    var arrowRight = newsSection.querySelector(".main-content__news-control--right");
    var newsListWrap = newsSection.querySelector(".main-content__news-list-wrap");
    var newsList = newsSection.querySelector(".main-content__news-list");
    var newsItems = Array.prototype.slice.call(newsSection.querySelectorAll(".main-content__news-item"));

    newsList.style.transitionDuration = "800ms";

    window.addEventListener("resize", function() {
        newsList.style.transform = "translateX(0)";
    });

    arrowRight.addEventListener("click", function() {
        var itemWidth = newsItems[0].clientWidth;
        var newsAmount = newsItems.length;
        var maxStep = newsAmount * itemWidth - itemWidth;
        var minStep = 0;

        var currentTranslateValue = newsList.style.transform;
        var currentShift = takeOnlyNumber(currentTranslateValue);

        if (currentShift < maxStep) {
            newsList.style.transform = "translateX(-" + (currentShift + itemWidth) + "px)";
        } else {
            newsList.style.transform = "translateX(-" + minStep + "px)";
        }
    });

    arrowLeft.addEventListener("click", function() {
        var itemWidth = newsItems[0].clientWidth;
        var newsAmount = newsItems.length;
        var maxStep = newsAmount * itemWidth - itemWidth;
        var minStep = 0;
        var currentTranslateValue = newsList.style.transform;
        var currentShift = takeOnlyNumber(currentTranslateValue);

        if (currentShift === 0) {
            newsList.style.transform = "translateX(-" + maxStep + "px)";
        } else {
            newsList.style.transform = "translateX(-" + (currentShift - itemWidth) + "px)";
        }
    })
})();

(function galleryManager() {
    var galleryBlock = document.querySelector(".main-content__gallery");
    var galleryItems = Array.prototype.slice.call(galleryBlock.querySelectorAll(".main-content__gallery-slider-item"));
    var previewModal = galleryBlock.querySelector(".main-content__gallery-preview-overlay");
    var imgInModal = galleryBlock.querySelector(".main-content__gallery-preview img");
    var prewievClose = galleryBlock.querySelector(".main-content__gallery-preview-close");

    galleryItems.forEach(function(it) {
        it.addEventListener("click", function() {
            previewModal.classList.remove("hidden");
            var imgPath = it.children[0].getAttribute("src");
            var fileNameAndExpansion = imgPath.split(".");
            var biggerImgPath = fileNameAndExpansion[0] + "-big." + fileNameAndExpansion[1];

            imgInModal.setAttribute("src", imgPath);

            var img = new Image();
            img.src = biggerImgPath;
            img.onload = function() {
                imgInModal.setAttribute("src", biggerImgPath);
            };

            prewievClose.addEventListener("click", function onCloseClick() {
                previewModal.classList.add("hidden");
                imgInModal.removeAttribute("src");
                prewievClose.removeEventListener("click",onCloseClick);
            })
        })
    });

    var galleryLeftControl = galleryBlock.querySelector(".main-content__gallery-slider-control--left");
    var galleryRightControl = galleryBlock.querySelector(".main-content__gallery-slider-control--right");
    var galleryListWrap = (galleryBlock.querySelector(".main-content__gallery-slider-list-wrap"));
    var galleryList = (galleryBlock.querySelector(".main-content__gallery-slider-list"));

    galleryList.style.transitionDuration = "800ms";

    window.addEventListener("resize", function() {
        galleryList.style.transform = "translateX(0)";
    });

    galleryRightControl.addEventListener("click", function () {

        var visibleAreaWidth = galleryListWrap.clientWidth;
        var slideWidth = galleryItems[0].clientWidth;
        var amountOfVisibleElems = Math.round(visibleAreaWidth / slideWidth);
        var step = visibleAreaWidth / amountOfVisibleElems;
        var maxStep = galleryItems.length * step - visibleAreaWidth;
        var minStep = 0;
        var currentTranslateValue = galleryList.style.transform;
        var currentShift = takeOnlyNumber(currentTranslateValue);

        if (currentShift < maxStep) {
            galleryList.style.transform = "translateX(-" + (currentShift + step) + "px)";
        } else {
            galleryList.style.transform = "translateX(-" + minStep + "px)";
        }
    });

    galleryLeftControl.addEventListener("click", function () {
        var visibleAreaWidth = galleryListWrap.clientWidth;
        var slideWidth = galleryItems[0].clientWidth;
        var amountOfVisibleElems = Math.round(visibleAreaWidth / slideWidth);
        var step = visibleAreaWidth / amountOfVisibleElems;
        var maxStep = galleryItems.length * step - visibleAreaWidth;
        var minStep = 0;
        var currentTranslateValue = galleryList.style.transform;
        var currentShift = takeOnlyNumber(currentTranslateValue);

        if (currentShift === 0) {
            galleryList.style.transform = "translateX(-" + maxStep + "px)";
        } else {
            galleryList.style.transform = "translateX(-" + (currentShift - step) + "px)";
        }
    })
})();
