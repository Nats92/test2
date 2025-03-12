"use strict";

(function map() {
    ymaps.ready(init);
    var myMap,
        myPlacemark;

    function init(){
        myMap = new ymaps.Map('map', {
            center: [56.898999, 60.620226],
            zoom: 16
        });


        myPlacemark = new ymaps.Placemark([56.898999, 60.620226], {
            // hintContent: 'Кафе «Лукоморье». г.Екатеринбург, ул. Старых Большевиков, д. 77. Вход с торца здания',
            iconCaption: 'Кафе «Лукоморье»' }, {

            preset: 'islands#redFoodIcon',
            iconColor: '#e1353c'
        });

        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('drag');
        myMap.behaviors.disable('scrollZoom');
    }
})();