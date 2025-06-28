// Задаём размеры изображения карты (в пикселях)
const w = 554;
const h = 580;

// Инициализация карты Leaflet с пользовательской системой координат (простой CRS)
const map = L.map(document.querySelector('.map'), {
    crs: L.CRS.Simple,       // Простой CRS, работает с изображениями
    minZoom: -0.5,           // Минимальный уровень приближения
    maxZoom: 1.5             // Максимальный уровень приближения
});

// Устанавливаем границы изображения (верхний левый и нижний правый угол)
const bounds = [[0, 0], [h, w]];

// Добавляем изображение карты в качестве подложки
L.imageOverlay('../image/map_park2_0.jpg', bounds).addTo(map);

// Подгоняем масштаб и центр карты так, чтобы изображение было видно полностью
map.fitBounds(bounds);

// Список объектов на карте: название, координаты, путь к иконке, и ссылка
const places = [
    { name: 'Стадион Краснодар', coords:[510,85], iconUrl: '../image/coliseu.png', link: 'location.html#colisey' },
    { name: 'Японский сад', coords: [480, 350], iconUrl: '../image/japan.png', link: 'location.html#japan' },
    { name: 'Внутренний ребенок', coords: [139, 320], iconUrl: '../image/baby.png', link: 'location.html#baby' },
    { name: 'Пирамида', coords: [285, 190], iconUrl: '../image/piramid.png', link: 'location.html#piramida' },
    { name: 'Амфитеатр', coords: [300, 230], iconUrl: '../image/amfitiatr.png', link: 'location.html#amf' },
    { name: 'Парк облаков', coords: [530, 490], iconUrl: '../image/park_cloud.png', link: 'location.html#cloud' },
    { name: 'Музыкальный лабиринт', coords: [230, 270], iconUrl: '../image/music_park.png', link: 'location.html#music' },
    { name: 'Водный лабиринт', coords: [379, 220], iconUrl: '../image/water_lab.png', link: 'location.html#water' },
    { name: 'Инфинити', coords: [510, 190], iconUrl: '../image/metka1.png', link: 'location.html#infinity' },
    { name: 'Стремительная река', coords: [490, 245], iconUrl: '../image/strem_river.png', link: 'location.html#river' },
    { name: 'Зеркальный лабиринт', coords: [460, 225], iconUrl: '../image/zerkal_lab.png', link: 'location.html#mirror' },
    { name: 'Капля', coords: [315, 115], iconUrl: '../image/caple.png', link: 'location.html#isk' },
    { name: 'Французский сад', coords: [240, 370], iconUrl: '../image/fracne_sad.png', link: 'location.html#france' }
];

// Проходим по всем объектам и добавляем их на карту
places.forEach(place => {
    // Создаём иконку для текущего объекта
    const icon = L.icon({
        iconUrl: place.iconUrl,  // Путь к изображению иконки
        iconSize: [25, 32],      // Размер иконки
    });

    // Создаём маркер на карте с заданными координатами и иконкой
    const marker = L.marker(place.coords, { icon }).addTo(map);

    // Привязываем всплывающую подсказку с названием (появляется при наведении)
    marker.bindTooltip(place.name, {
        permanent: true,       // false = появляется только при наведении
        direction: 'top',       // Отображается над маркером
        offset: [0, -10],
        className: 'always-visible-tooltip'        // Смещение вверх на 10 пикселей
    });

    // При клике на маркер происходит переход по указанной ссылке
    marker.on('click', () => {
        window.open(place.link, '_self');  // Открыть в этом же окне
    });
});