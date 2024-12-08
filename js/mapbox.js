// Importa il file CSS di Mapbox direttamente dal CDN nel tuo file HTML
// Inserisci qui il tuo token Mapbox
const mapboxToken =
  "";

// Token di accesso Mapbox
mapboxgl.accessToken = mapboxToken;

// Creazione della mappa
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-74.006, 40.7128],
  zoom: 12,
});

// Stato per casa attiva
let activeHouse = null;

// Dati Placeholder

const neighborhoods = [
  {
    id: 1,
    name: "Manhattan",
    lat: 40.7831,
    lng: -73.9712,
    score: 80.0,
  },
];

const pois = [
  {
    id: 1,
    name: "Central Park",
    lat: 40.785091,
    lng: -73.968285,
    type: "Park",
  },
  {
    id: 2,
    name: "Empire State Building",
    lat: 40.748817,
    lng: -73.985428,
    type: "Landmark",
  },
  {
    id: 3,
    name: "Statue of Liberty",
    lat: 40.689247,
    lng: -74.044502,
    type: "Monument",
  },
  {
    id: 4,
    name: "Brooklyn Bridge",
    lat: 40.7061,
    lng: -73.9969,
    type: "Landmark",
  },
  {
    id: 5,
    name: "Times Square",
    lat: 40.758896,
    lng: -73.98513,
    type: "Tourist Spot",
  },
  {
    id: 6,
    name: "The Met",
    lat: 40.779437,
    lng: -73.963244,
    type: "Museum",
  },
  {
    id: 7,
    name: "Wall Street",
    lat: 40.707491,
    lng: -74.011276,
    type: "Business Area",
  },
  {
    id: 8,
    name: "One World Trade Center",
    lat: 40.712743,
    lng: -74.013379,
    type: "Landmark",
  },
  {
    id: 9,
    name: "Broadway",
    lat: 40.759011,
    lng: -73.984472,
    type: "Theater",
  },
  {
    id: 10,
    name: "Rockefeller Center",
    lat: 40.758736,
    lng: -73.978676,
    type: "Tourist Spot",
  },
];

const houses = [
  {
    id: 100,
    lat: 40.76061,
    lng: -73.965242,
    score: 90,
    price: "$1,400,000",
    neighborhood: "Manhattan",
    type: "House",
    area: 280.0,
    _id: "main_house",
  },
  {
    id: 101,
    lat: 40.77061,
    lng: -73.965242,
    score: 90,
    price: "$1,400,000",
    neighborhood: "Manhattan",
    type: "House",
    area: 280.0,
    _id: "main_house",
  },
  {
    id: 102,
    lat: 40.75061,
    lng: -73.985242,
    score: 90,
    price: "$2,000,000",
    neighborhood: "Manhattan",
    type: "House",
    area: 280.0,
    _id: "main_house",
  }

];

const city = {
  id: 1,
  name: "New York City",
  lat: 40.7128,
  lng: -74.006,
  safety_index: 80.5,
  health_care_index: 78.3,
  cost_of_living_index: 85.7,
  pollution_index: 60.2,
};

// Funzione per calcolare la distanza (Euclidea semplificata)
function calculateDistance(lat1, lng1, lat2, lng2) {
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2));
}

// Oscuramento della mappa
map.on("load", () => {

  map.addLayer({
    id: "3d-buildings",
    source: "composite",
    "source-layer": "building",
    filter: ["==", "extrude", "true"], // Solo edifici con proprietà extrude
    type: "fill-extrusion",
    minzoom: 13, // Gli edifici appaiono solo a uno zoom maggiore di 15
    paint: {
      "fill-extrusion-color": "#aaa", // Colore degli edifici
      "fill-extrusion-height": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        16,
        ["get", "height"], // Altezza dinamica basata sui dati
      ],
      "fill-extrusion-base": ["get", "min_height"], // Altezza base
      "fill-extrusion-opacity": 0.6, // Trasparenza
    },
  });

  map.addLayer({
    id: "dark-layer",
    type: "background",
    paint: { "background-color": "rgba(0, 0, 0, 0.5)" },
    layout: { visibility: "none" },
  });

  // Layer per collegamenti ai POI
  map.addSource("lines-poi", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] },
  });

  map.addLayer({
    id: "lines-layer-poi",
    type: "line",
    source: "lines-poi",
    paint: {
      "line-color": "white", // Colore dorato
      "line-width": 3,
    },
  });

  // Layer per collegamento al quartiere
  map.addSource("lines-neighborhood", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] },
  });

  map.addLayer({
    id: "lines-layer-neighborhood",
    type: "line",
    source: "lines-neighborhood",
    paint: {
      "line-color": "#FF8C00", // Colore arancione
      "line-width": 3,
    },
  });

  // Layer per collegamento al quartiere
  map.addSource("lines-city", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] },
  });

  map.addLayer({
    id: "lines-layer-city",
    type: "line",
    source: "lines-city",
    paint: {
      "line-color": "red",
      "line-width": 3,
    },
  });

  // Aggiungi marker
  addMarkers();
});

// Aggiungi marker
function addMarkers() {
  cityMarker = addCircleMarker(city.lat, city.lng, "red", 30, {
    kind: "City",
    ...city,
  });

  // Quartieri
  neighborhoods.forEach((n) => {
    addCircleMarker(n.lat, n.lng, "orange", 27, { kind: "Neighborhood", ...n });
  });

  // Case
  houses.forEach((house) => {
    const marker = addCircleMarker(house.lat, house.lng, "blue", 22, {
      kind: "Property",
      ...house,
    });

    const element = marker.getElement();

    // Cambia cursore su hover
    element.style.cursor = "pointer";

    // Eventi per hover e click
    element.addEventListener("mouseenter", () => {
      if (!activeHouse) showConnections(house);
    });

    element.addEventListener("mouseleave", () => {
      if (!activeHouse) hideConnections();
    });

    element.addEventListener("click", () => {
      if (activeHouse === house.id) {
        // Sblocca collegamenti
        activeHouse = null;
        hideConnections();
      } else {
        // Fissa collegamenti per questa casa
        activeHouse = house.id;
        showConnections(house);
      }
    });
  });

  // POI
  // pois.forEach((poi) => {
  //   const marker = addCircleMarker(poi.lat, poi.lng, "green", 22, {
  //     kind: "POI",
  //     ...poi,
  //   });
  //   marker.getElement().style.cursor = "pointer";
  // });
}

function showConnections(house) {
  map.setLayoutProperty("dark-layer", "visibility", "visible");

  const maxDistance = 0.03; // Distanza massima (gradi lat/lon)

  // Filtra i POI vicini alla casa
  const nearbyPois = pois.filter(
    (poi) =>
      calculateDistance(house.lat, house.lng, poi.lat, poi.lng) <= maxDistance
  );

  // Trova le case adiacenti ai POI vicini
  const adjacentHouses = [];
  nearbyPois.forEach((poi) => {
    houses.forEach((otherHouse) => {
      if (
        otherHouse.id !== house.id &&
        calculateDistance(poi.lat, poi.lng, otherHouse.lat, otherHouse.lng) <=
          maxDistance
      ) {
        adjacentHouses.push(otherHouse);
      }
    });
  });

  // Rimuovi duplicati dalle case adiacenti
  const uniqueAdjacentHouses = [
    ...new Map(adjacentHouses.map((item) => [item.id, item])).values(),
  ];

  // Features per collegamenti ai POI
  const poiFeatures = nearbyPois.map((poi) => ({
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [
        [house.lng, house.lat],
        [poi.lng, poi.lat],
      ],
    },
  }));

  // Features per collegamenti tra i POI e le case adiacenti
  const houseToPoiFeatures = uniqueAdjacentHouses.flatMap((adjHouse) =>
    nearbyPois.map((poi) => ({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [poi.lng, poi.lat],
          [adjHouse.lng, adjHouse.lat],
        ],
      },
    }))
  );

  //Collega la casa al quartiere e il quartiere alla città
  const neighborhood = neighborhoods.find((n) => n.name === house.neighborhood);
  const cityCoordinates = [city.lng, city.lat];
  const neighborhoodCoordinates = [neighborhood.lng, neighborhood.lat];
  map.getSource("lines-neighborhood").setData({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [house.lng, house.lat],
            neighborhoodCoordinates,
          ],
        },
      },
    ],
  });

  map.getSource("lines-city").setData({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [neighborhoodCoordinates, cityCoordinates],
        },
      },
    ],
  });

  // Aggiorna i dati nei layer
  map.getSource("lines-poi").setData({
    type: "FeatureCollection",
    features: [...poiFeatures, ...houseToPoiFeatures],
  });

  // Mostra solo i POI vicini
  nearbyPois.forEach((poi) => {
    addCircleMarker(poi.lat, poi.lng, "green", 22, {
      kind: "POI",
      ...poi,
    });
  });
}

// Nascondi collegamenti e POI
function hideConnections() {
  map.setLayoutProperty("dark-layer", "visibility", "none");

  map.getSource("lines-poi").setData({
    type: "FeatureCollection",
    features: [],
  });

  map.getSource("lines-neighborhood").setData({
    type: "FeatureCollection",
    features: [],
  });

  map.getSource("lines-city").setData({
    type: "FeatureCollection",
    features: [],
  });

  // Rimuovi marker POI dinamicamente aggiunti
  pois.forEach((poi) => {
    const markerElements = document.querySelectorAll(".marker");
    markerElements.forEach((el) => {
      if (el.style.backgroundColor === "green") {
        el.remove();
      }
    });
  });
}


// Funzione per creare marker
function addCircleMarker(lat, lng, color, size, node) {
    // Crea un elemento div per il marker
    const markerElement = document.createElement("div");
    markerElement.className = "marker";
    markerElement.style.width = size + "px";
    markerElement.style.height = size + "px";
    markerElement.style.backgroundColor = color;
    markerElement.style.borderRadius = "50%";
    markerElement.style.border = "2px solid white";
  
    // Genera il contenuto del popup
    const popupContent = generatePopupContent(node);
  
    // Crea il popup
    const popup = new mapboxgl.Popup({ offset: 25, closeButton: true })
      .setHTML(popupContent);
  
    // Variabile per tracciare lo stato del popup
    let isPopupOpen = false;
    let openedByClick = false;
  
    // Mostra il popup al passaggio del mouse, solo se non è stato aperto tramite click
    markerElement.addEventListener("mouseenter", () => {
      if (!isPopupOpen && !openedByClick) {
        popup.setLngLat([lng, lat]).addTo(map);
      }
    });
  
    // Nascondi il popup quando il mouse lascia il marker, solo se non è stato aperto tramite click
    markerElement.addEventListener("mouseleave", () => {
      if (!isPopupOpen && !openedByClick) {
        popup.remove();
      }
    });
  
    // Al click sul marker, apri il popup in modalità "bloccata" e disattiva l'hover
    markerElement.addEventListener("click", () => {
      if (!openedByClick) {
        popup.setLngLat([lng, lat]).addTo(map);
        isPopupOpen = true;
        openedByClick = true;
      }
    });
  
    // Chiudi il popup cliccando sulla "X" e riattiva l'hover
    popup.on("close", () => {
      isPopupOpen = false;
      openedByClick = false;
    });
  
    // Crea e aggiungi il marker alla mappa
    const markerInstance = new mapboxgl.Marker(markerElement)
      .setLngLat([lng, lat])
      .addTo(map);
  
    return markerInstance;
  }
  
  
  

function generatePopupContent(node) {
  switch (node.kind) {
    case "City":
      return `
          <div class="popup">
            <h3>🌆 City: ${node.name}</h3>
            <ul>
              <li><strong>Safety Index:</strong> ${node.safety_index.toFixed(
                2
              )}</li>
              <li><strong>Health Care Index:</strong> ${node.health_care_index.toFixed(
                2
              )}</li>
              <li><strong>Cost of Living Index:</strong> ${node.cost_of_living_index.toFixed(
                2
              )}</li>
              <li><strong>Pollution Index:</strong> ${node.pollution_index.toFixed(
                2
              )}</li>
            </ul>
          </div>
        `;
    case "Neighborhood":
      return `
          <div class="popup">
            <h3>🏘️ Neighborhood: ${node.name}</h3>
            <ul>
              <li><strong>Score:</strong> ${node.score.toFixed(2)}</li>
            </ul>
          </div>
        `;
    case "POI":
      return `
          <div class="popup">
            <h3>📍 POI: ${node.name}</h3>
            <ul>
              <li><strong>Type:</strong> ${node.type}</li>
            </ul>
          </div>
        `;
    case "Property":
      return `
          <div class="popup" onclick="window.location.href='property.html?id=${
            node._id
          }'">
            <h3>🏡 Property</h3>
            <ul>
              <li><strong>Type:</strong> ${node.type}</li>
              <li><strong>Price:</strong> ${node.price.toLocaleString()}</li>
              <li><strong>Score:</strong> ${node.score.toFixed(2)}</li>
              <li><strong>Area:</strong> ${node.area} m²</li>
            </ul>
          </div>
        `;
    default:
      return `<div class="popup"><h3>❓ Unknown Node</h3></div>`;
  }
}
