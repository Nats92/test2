"use strict";

(function menuHamburgerManager() {
    var hamburger = document.querySelector(".page-menu__anchors-hamburger");
    var menuList = document.querySelector(".page-menu__anchors-wrap");
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".page-menu__anchors-item"));
    var menuListWrap = document.querySelector(".page-menu__anchors");

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
    })
    window.addEventListener("click", function(evt) {
        var currEl = evt.target;

        if ((currEl !== menuList) && (currEl !== hamburger) && (menuListWrap !== currEl)) {
            hideMenu(menuList);
        }
    })
    window.addEventListener("resize", function() {
        if (menuList.classList.contains("dis-block")) {
            hideMenu(menuList);
        }
    })
    window.addEventListener("scroll", function() {
        if ((window.pageYOffset > 50) && (menuList.clientWidth <= 240)) {
            menuListWrap.classList.add("pos-fixed");    
        } else {
            menuListWrap.classList.remove("pos-fixed");
        }
    })
    navLinks.forEach( function(link) {
        link.addEventListener("click", function() {
            hideMenu(menuList);
        })
    })
})();