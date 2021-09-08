var map = L.map('main_map').setView([-34.66, -58.37], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> Contributors',
}).addTo(map);




$.ajax({
    dataType: 'json',
    url:"api/bicicletas",
    success: function(resul){
        console.log(resul);
        resul.bicicletas.forEach((bici)=> {
            L.marker(bici.ubicacion,{title: bici.id}).addTo(map);
        });
    }
})