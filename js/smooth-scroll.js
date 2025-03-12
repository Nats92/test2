"use strict";

(function smoothScroll() {
    var menuList = document.querySelector(".main-nav__menu-list");
    var menuLinks = Array.prototype.slice.call(menuList.querySelectorAll(".main-nav__link"));

    menuLinks.forEach(function (it) {
        it.addEventListener("click", function (evt) {
            var currLink = evt.target;
            var hrefValLength = currLink.getAttribute("href").length;
            var hrefVal = currLink.getAttribute("href").substr(1, hrefValLength);

            var correspondingSection = document.querySelector("#" + hrefVal);
            if (!correspondingSection) { return; }
            var sectionOffset = correspondingSection.offsetTop;

            var top = 0;
            var step = sectionOffset / 100;

            var scr = setInterval(function () {
                top += step;
                if (top > sectionOffset) {
                    top = sectionOffset;
                }
                window.scrollTo(0, top);

                if (top === sectionOffset) {
                    clearInterval(scr);
                }
            }, 5);
        })
    })
})();
