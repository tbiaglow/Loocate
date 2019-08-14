// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  addInspection: function(userInspection) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "../api/inspection",
      data: JSON.stringify(userInspection)
    });
  },
  getComfortStations: function() {
    return $.ajax({
      url: "api/comfort_stations",
      type: "GET"
    });
  },

  // getComfortStationsByLocation: function() {
  //   return $.ajax({
  //     url: "/comfort_stations/",
  //     type: "GET"
  //   });
  // },

  getComfortStationsByZip: function(zipCode) {
    return $.ajax({
      url: "api/comfort_stations/" + zipCode,
      type: "GET"
    });
  },

  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

$("#mylocation").click(function(event) {
  event.preventDefault();
  var address = ipLookUp();
  var lat = address.lat;
  var lon = address.long;
  console.log(lat, lon);
  window.location.href = "/comfort_stations/geo/" + lat + "/" + lon;
  API.getComfortStationsByZip(zipCode).then(function(res) {
    console.log(res);
  });
});

// click handler for getting data based on zipcode entered by use
$("#search").click(function(event) {
  event.preventDefault();
  var zipCode = $("#zipInput").val();
  console.log(zipCode);
  window.location.href = "/comfort_stations/" + zipCode;
  API.getComfortStationsByZip(zipCode).then(function(res) {
    console.log(res);
  });
});

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

// Add event listener to rate-btn

$(".rate-btn").on("click", function(event) {
  event.preventDefault();
  var propID = $(this).attr("data");
  console.log(propID);
  window.location.href = "/inspection/" + propID;
});

$("#inspect-submit").on("click", function(event) {
  event.preventDefault();
  var userInspection = {
    cleanliness: $("#cleanliness-input").val().trim(),
    safety: $("#safety-input").val().trim(),
    visitorCount: $("#visitorcount-input").val().trim(),
    waitTime: $("#waittime-input").val().trim(),
    comments: $("#comments-input").val().trim(),
    propID: $("#inspection-form").attr("data")
  };
  console.log(userInspection);
  API.addInspection(userInspection);
});

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
