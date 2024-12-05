// map.js

document.addEventListener("DOMContentLoaded", function() {
    // Inizializza la mappa e imposta la vista su Milano
    var map = L.map('mapid').setView([45.4642, 9.19], 12); // Zoom ridotto per includere più aree

    // Aggiungi il layer di OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Icona personalizzata per le case
    var houseIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    // Icona personalizzata per i Punti di Interesse (POI)
    var poiIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    // Icona personalizzata per i Quartieri
    var neighborhoodIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    // Icona personalizzata per le Città
    var cityIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    // Array di case con coordinate, prezzo e indice di vivibilità
    var houses = [
        {lat: 45.4642, lng: 9.19, price: 250000, livability: 8.5, link: 'house1.html'},
        {lat: 45.4700, lng: 9.2000, price: 300000, livability: 7.9, link: 'house2.html'},
        {lat: 45.4600, lng: 9.1800, price: 200000, livability: 9.2, link: 'house3.html'},
        {lat: 45.4700, lng: 9.1700, price: 350000, livability: 8.1, link: 'house4.html'},
        // ... altre case ...
    ];

    // Aggiungi i marker delle case alla mappa
    houses.forEach(function(house) {
        var popupContent = `
            <b>Prezzo:</b> €${house.price.toLocaleString()}<br/>
            <b>Indice di Vivibilità:</b> ${house.livability}/10<br/>
            <a href="${house.link}"><button>Visualizza Dettagli</button></a>
        `;
        L.marker([house.lat, house.lng], {icon: houseIcon}).addTo(map)
            .bindPopup(popupContent);
    });

    // Array di Punti di Interesse (POI) con coordinate e nome
    var pois = [
        {lat: 45.4655, lng: 9.19, name: "Duomo di Milano"},
        {lat: 45.4671, lng: 9.1900, name: "Galleria Vittorio Emanuele II"},
        {lat: 45.4697, lng: 9.1850, name: "Castello Sforzesco"},
        {lat: 45.4625, lng: 9.1890, name: "Teatro alla Scala"},
        {lat: 45.4630, lng: 9.1760, name: "Parco Sempione"},
        // ... altri POI ...
    ];

    // Aggiungi i marker dei POI alla mappa
    pois.forEach(function(poi) {
        L.marker([poi.lat, poi.lng], {icon: poiIcon}).addTo(map)
            .bindPopup(`<b>${poi.name}</b>`);
    });

    // Array di Quartieri con coordinate, indice di vivibilità e info aggiuntive
    var neighborhoods = [
        {lat: 45.4800, lng: 9.1950, name: "Brera", livability: 8.7, info: "Quartiere artistico e culturale."},
        {lat: 45.4700, lng: 9.2200, name: "Navigli", livability: 8.2, info: "Famoso per i suoi canali e la vita notturna."},
        {lat: 45.4750, lng: 9.1800, name: "Porta Romana", livability: 7.9, info: "Zona residenziale con numerosi ristoranti."},
        // ... altri quartieri ...
    ];

    // Aggiungi i marker dei Quartieri alla mappa
    neighborhoods.forEach(function(neighborhood) {
        var popupContent = `
            <b>Quartiere:</b> ${neighborhood.name}<br/>
            <b>Indice di Vivibilità:</b> ${neighborhood.livability}/10<br/>
            <b>Info:</b> ${neighborhood.info}
        `;
        L.marker([neighborhood.lat, neighborhood.lng], {icon: neighborhoodIcon}).addTo(map)
            .bindPopup(popupContent);
    });

    // Array di Città con coordinate, indice di vivibilità e info aggiuntive
    var cities = [
        {lat: 45.4642, lng: 9.19, name: "Milano Centro", livability: 9.0, info: "Cuore pulsante della città."},
        {lat: 45.4780, lng: 9.1750, name: "Città Studi", livability: 8.4, info: "Zona universitaria e residenziale."},
        {lat: 45.4500, lng: 9.1500, name: "Lambrate", livability: 7.8, info: "Centro creativo e tecnologico."},
        // ... altre città ...
    ];

    // Aggiungi i marker delle Città alla mappa
    cities.forEach(function(city) {
        var popupContent = `
            <b>Città:</b> ${city.name}<br/>
            <b>Indice di Vivibilità:</b> ${city.livability}/10<br/>
            <b>Info:</b> ${city.info}
        `;
        L.marker([city.lat, city.lng], {icon: cityIcon}).addTo(map)
            .bindPopup(popupContent);
    });
});