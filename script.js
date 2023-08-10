var map = L.map("map").setView([41.661254, -0.892912], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup("Your position")
          .openPopup();

        map.setView([latitude, longitude], 13);
      },
      function (error) {
        var mapContainer = document.getElementById("map");
        switch (error.code) {
          case error.PERMISSION_DENIED:
            mapContainer.innerHTML = "Access to geolocation was denied.";
            break;
          case error.POSITION_UNAVAILABLE:
            mapContainer.innerHTML = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            mapContainer.innerHTML =
              "The request to get user location timed out.";
            break;
          default:
            mapContainer.innerHTML =
              "An error occurred while retrieving geolocation.";
            break;
        }
      }
    );
  } else {
    document.getElementById("map").innerHTML =
      "Geolocation is not supported by your browser.";
  }
}

window.onload(getUserLocation());
