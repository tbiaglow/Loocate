function ipLookUp() {
  var options = {
    enableHighAccuracy: true,
    timeout: 60000,
    maximumAge: 0
  };
  // If geolocation is accepted set map + nearby bathroom search to the user's location
  function success(pos) {
    userLocation = {
      lat: pos.coords.latitude,
      long: pos.coords.longitude
    };
  }
  // On error, set coordinates to New York
  function error(err) {
    userLocation = {
      lat: 40.8,
      long: -74
    };

    // If user denies geolocation make address filter available on load
    // Otherwise keep the filter hidden
    if (err.message === "User denied Geolocation") {
      $("#filter").css("display", "block");
      $("#filter-show").html("Hide Map Filter");
    }
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
}

module.exports = upLookUp();