var DEFAULT_ZOOM = 15;
var GOOGLE_API_KEY = 'AIzaSyDFDg1ruZ4GQqPHMv1Z4Lprn_2wXyd0NYk';


function initMap() {
  var position = {
    lat: 37.773972,
    lng: -122.43129
  };

  var map = new google.maps.Map($('#map')[0], {
    zoom: DEFAULT_ZOOM,
    center: position
  });
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });

  $.ajax({
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    data: {
      'location': position.lat + ',' + position.lng,
      'type': 'restaurant',
      'key': GOOGLE_API_KEY,
      'radius': 500
    },
    success: function(data) {
      debugger;
    },
    failure: function(data) {
      debugger;
    }
  });
}
