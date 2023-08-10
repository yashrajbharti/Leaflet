if (navigator.geolocation) {
  let map = L.map("map").setView([41.661254, -0.892912], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}
let coordsToCopy;

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        coordsToCopy = [latitude, longitude].toString();

        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup([latitude, longitude].toString())
          .openPopup();

        map.setView([latitude, longitude], 13);
      },

      function (error) {
        let mapContainer = document.getElementById("map");
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

let coordsElement = document.getElementById("coords");
coordsElement.addEventListener("click", function () {
  navigator.clipboard.writeText(coordsToCopy);
});
