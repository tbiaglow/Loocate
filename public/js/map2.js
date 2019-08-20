function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.7128, lng: -74.0060 },
    zoom: 11
  });

  // Define the LatLng coordinates for the polygon's path.
  var multipolygon = [
    {lng: -73.9429028809978, lat: 40.67471537488324},
    {lng: -73.94297712737664, lat: 40.67383226658409},
    {lng: -73.94191717569367, lat: 40.6737731380336},
    {lng: -73.94198609263385, lat: 40.673075187932064},
    {lng: -73.944474021958, lat: 40.673213961167},
    {lng: -73.94434124664838, lat: 40.67479363566741},
    {lng: -73.9429028809978, lat: 40.67471537488324}
  ];

  

// MULTIPOLYGON (((-73.9429028809978 40.67471537488324, -73.94297712737664 40.67383226658409, -73.94191717569367 40.6737731380336, -73.94198609263385 40.673075187932064, -73.944474021958 40.673213961167, -73.94434124664838 40.67479363566741, -73.9429028809978 40.67471537488324)))

  // Construct the polygon.
  var park = new google.maps.Polygon({
    paths: multipolygon,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  park.setMap(map);
  map.setCenter({lng: -73.9429028809978, lat: 40.67471537488324});
  map.setZoom(17);
}
