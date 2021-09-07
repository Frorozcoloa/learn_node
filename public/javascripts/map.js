var map = L.map('main_map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> Contributors',
}).addTo(map);

L.marker([51.505, -0.09], 13).addTo(map)

L.marker([52.705, -0.109], 13).addTo(map)