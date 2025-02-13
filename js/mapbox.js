// Import Mapbox CSS from the CDN in your HTML file
// Insert your Mapbox token here
const mapboxToken =
  "";

// Mapbox access token
mapboxgl.accessToken = mapboxToken;

// Create the map
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-74.006, 40.7128],
  zoom: 12,
});

// Active house state
let activeHouse = null;

// Placeholder data

const neighbourhoods = [
  {
    id: 1,
    name: "Manhattan",
    lat: 40.7831,
    lng: -73.9712,
    score: 80.0,
  },
];

const pois = [
  // Parks
  { id: 1, name: "Central Park", lat: 40.785091, lng: -73.968285, type: "Park" },
  { id: 3, name: "Washington Square Park", lat: 40.730823, lng: -73.997332, type: "Park" },

  // Supermarkets
  { id: 4, name: "Whole Foods Market", lat: 40.76061, lng: -73.973242, type: "Supermarket" },
  { id: 5, name: "Trader Joe's", lat: 40.731233, lng: -73.988239, type: "Supermarket" },
  { id: 6, name: "Fairway Market", lat: 40.77994, lng: -73.980273, type: "Supermarket" },

  // Hospitals
  { id: 8, name: "NYU Langone Health", lat: 40.742056, lng: -73.975868, type: "Hospital" },
  { id: 9, name: "NewYork-Presbyterian Hospital", lat: 40.840556, lng: -73.941944, type: "Hospital" },

  // Existing landmarks
  { id: 10, name: "Empire State Building", lat: 40.748817, lng: -73.985428, type: "Landmark" },
  { id: 11, name: "Statue of Liberty", lat: 40.689247, lng: -74.044502, type: "Monument" }
];

const houses = [
  // House surrounded by POIs
  {
    id: 100,
    lat: 40.76061,
    lng: -73.965242,
    score: 90,
    price: "$1,400,000",
    neighbourhood: "Manhattan",
    type: "House",
    _id: "main_house",
  },

  // House to the northwest connected to Empire State Building
  {
    id: 101,
    lat: 40.80061,
    lng: -73.970242,
    score: 85,
    price: "$1,200,000",
    neighbourhood: "Manhattan",
    type: "Apartment",
    _id: "north_house",
  },

  // House to the southeast connected to Empire State Building
  {
    id: 102,
    lat: 40.70061,
    lng: -73.980242,
    score: 88,
    price: "$1,500,000",
    neighbourhood: "Downtown",
    type: "Condo",
    _id: "south_house",
  },
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

// Function to calculate a simplified Euclidean distance
function calculateDistance(lat1, lng1, lat2, lng2) {
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2));
}

// Darken the map
map.on("load", () => {
  map.addLayer({
    id: "3d-buildings",
    source: "composite",
    "source-layer": "building",
    filter: ["==", "extrude", "true"],
    type: "fill-extrusion",
    minzoom: 13,
    paint: {
      "fill-extrusion-color": "#aaa",
      "fill-extrusion-height": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        16,
        ["get", "height"],
      ],
      "fill-extrusion-base": ["get", "min_height"],
      "fill-extrusion-opacity": 0.6,
    },
  });

  map.addLayer({
    id: "dark-layer",
    type: "background",
    paint: { "background-color": "rgba(0, 0, 0, 0.5)" },
    layout: { visibility: "none" },
  });

  // Layer for POI connections
  map.addSource("lines-poi", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] },
  });

  map.addLayer({
    id: "lines-layer-poi",
    type: "line",
    source: "lines-poi",
    paint: {
      "line-color": "white",
      "line-width": 3,
    },
  });

  // Layer for neighbourhood connection
  map.addSource("lines-neighbourhood", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] },
  });

  map.addLayer({
    id: "lines-layer-neighbourhood",
    type: "line",
    source: "lines-neighbourhood",
    paint: {
      "line-color": "#FF8C00",
      "line-width": 3,
    },
  });

  // Layer for city connection
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

  // Add markers
  addMarkers();
});

// Function to add markers
function addMarkers() {
  cityMarker = addCircleMarker(city.lat, city.lng, "red", 30, {
    kind: "City",
    ...city,
  });

  // Neighbourhoods
  neighbourhoods.forEach((n) => {
    addCircleMarker(n.lat, n.lng, "orange", 27, { kind: "Neighbourhood", ...n });
  });

  // Properties
  houses.forEach((house) => {
    const marker = addCircleMarker(house.lat, house.lng, "blue", 22, {
      kind: "Property",
      ...house,
    });

    const element = marker.getElement();
    element.style.cursor = "pointer";

    element.addEventListener("mouseenter", () => {
      if (!activeHouse) showConnections(house);
    });

    element.addEventListener("mouseleave", () => {
      if (!activeHouse) hideConnections();
    });

    element.addEventListener("click", () => {
      if (activeHouse === house.id) {
        activeHouse = null;
        hideConnections();
      } else {
        activeHouse = house.id;
        showConnections(house);
      }
    });
  });

  // POIs (initially commented out)
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

  const maxDistance = 0.03;

  const nearbyPois = pois.filter(
    (poi) =>
      calculateDistance(house.lat, house.lng, poi.lat, poi.lng) <= maxDistance
  );

  const adjacentHouses = [];
  nearbyPois.forEach((poi) => {
    houses.forEach((otherHouse) => {
      if (
        otherHouse.id !== house.id &&
        calculateDistance(poi.lat, poi.lng, otherHouse.lat, otherHouse.lng) <= maxDistance
      ) {
        adjacentHouses.push(otherHouse);
      }
    });
  });

  const uniqueAdjacentHouses = [
    ...new Map(adjacentHouses.map((item) => [item.id, item])).values(),
  ];

  uniqueAdjacentHouses.length = 0;
  uniqueAdjacentHouses.push(house);

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

  const neighbourhood = neighbourhoods.find((n) => n.name === house.neighbourhood);
  const cityCoordinates = [city.lng, city.lat];
  const neighbourhoodCoordinates = [neighbourhood.lng, neighbourhood.lat];
  map.getSource("lines-neighbourhood").setData({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [house.lng, house.lat],
            neighbourhoodCoordinates,
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
          coordinates: [neighbourhoodCoordinates, cityCoordinates],
        },
      },
    ],
  });

  map.getSource("lines-poi").setData({
    type: "FeatureCollection",
    features: [...poiFeatures, ...houseToPoiFeatures],
  });

  nearbyPois.forEach((poi) => {
    addCircleMarker(poi.lat, poi.lng, "green", 22, {
      kind: "POI",
      ...poi,
    });
  });
}

function hideConnections() {
  map.setLayoutProperty("dark-layer", "visibility", "none");

  map.getSource("lines-poi").setData({
    type: "FeatureCollection",
    features: [],
  });

  map.getSource("lines-neighbourhood").setData({
    type: "FeatureCollection",
    features: [],
  });

  map.getSource("lines-city").setData({
    type: "FeatureCollection",
    features: [],
  });

  pois.forEach((poi) => {
    const markerElements = document.querySelectorAll(".marker");
    markerElements.forEach((el) => {
      if (el.style.backgroundColor === "green") {
        el.remove();
      }
    });
  });
}

// Function to create markers
function addCircleMarker(lat, lng, color, size, node) {
  const markerElement = document.createElement("div");
  markerElement.className = "marker";
  markerElement.style.width = size + "px";
  markerElement.style.height = size + "px";
  markerElement.style.backgroundColor = color;
  markerElement.style.borderRadius = "50%";
  markerElement.style.border = "2px solid white";

  const popupContent = generatePopupContent(node);

  const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
    .setHTML(popupContent);

  let isPopupOpen = false;
  let openedByClick = false;

  markerElement.addEventListener("mouseenter", () => {
    if (!isPopupOpen && !openedByClick) {
      popup.setLngLat([lng, lat]).addTo(map);
    }
  });

  markerElement.addEventListener("mouseleave", () => {
    if (!isPopupOpen && !openedByClick) {
      popup.remove();
    }
  });

  markerElement.addEventListener("click", () => {
    if (!openedByClick) {
      popup.setLngLat([lng, lat]).addTo(map);
      isPopupOpen = true;
      openedByClick = true;
    }
  });

  popup.on("close", () => {
    isPopupOpen = false;
    openedByClick = false;
  });

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
              <li><strong>Safety Index:</strong> ${node.safety_index.toFixed(2)}</li>
              <li><strong>Health Care Index:</strong> ${node.health_care_index.toFixed(2)}</li>
              <li><strong>Cost of Living Index:</strong> ${node.cost_of_living_index.toFixed(2)}</li>
              <li><strong>Pollution Index:</strong> ${node.pollution_index.toFixed(2)}</li>
            </ul>
          </div>
        `;
    case "Neighbourhood":
      return `
          <div class="popup">
            <h3>🏘️ Neighbourhood: ${node.name}</h3>
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
          <div class="popup" onclick="window.location.href='property.html?id=${node._id}'">
            <img class="property-image" src="images/map/1.png" alt="Property image" />
            <h3>🏡 Property</h3>
            <ul>
              <li><strong>Type:</strong> ${node.type}</li>
              <li><strong>Price:</strong> ${node.price}</li>
              <li><strong>Score:</strong> ${node.score.toFixed(2)}</li>
            </ul>
          </div>
        `;
    default:
      return `<div class="popup"><h3>❓ Unknown Node</h3></div>`;
  }
}
