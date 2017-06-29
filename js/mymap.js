var DEFAULT_ZOOM = 15;
var GOOGLE_API_KEY = 'AIzaSyDFDg1ruZ4GQqPHMv1Z4Lprn_2wXyd0NYk';
var DEFAULT_RADIUS = 1500;
var DEFAULT_LAT = 37.773972;
var DEFAULT_LNG = -122.43129;

var current_infowindow;
var markers_shown;

$(function() {
  function initMap() {
    var map = new google.maps.Map($('#map')[0], {
      zoom: DEFAULT_ZOOM,
      center: {
        lat: DEFAULT_LAT,
        lng: DEFAULT_LNG
      }
    });

    var params = {
      'location': new google.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
      'radius': DEFAULT_RADIUS,
      'type': 'restaurant'
    };

    var search_bar = new SearchBar(function(type) {
        var params = {
             'location': new google.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
             'radius': 500,
             'type': type
        };
        getNearByPlaces(map, params);
    });

    search_bar.addTo($('body'));

    $('.place-info-visibility-toggle').on('click', function() {
      $('#place-info-wrapper').toggleClass('visible');
      $('#place-info-wrapper .triangle-icon').toggleClass('left');
    });
  }

  function getNearByPlaces(map, params) {
    if (markers_shown) {
        _.each(markers_shown, function(marker) {
            marker.setMap(null);
        });
    }
    markers_shown = [];


    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(params, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var current_infowindow;

        _.each(results, function(place) {
          var marker = new google.maps.Marker({
            position: {
              'lat': place.geometry.location.lat(),
              'lng': place.geometry.location.lng()
            },
            map: map
          });

          var infowindow_content =
            '<div id="content">' +
              '<h1 id="firstHeading" class="firstHeading">' + place.name + '</h1>'+
            '</div>';

          var infowindow = new google.maps.InfoWindow({
            content: infowindow_content
          });

          marker.addListener('click', function() {
            if (current_infowindow) {
              current_infowindow.close();
            }
            infowindow.open(map, marker);
            current_infowindow = infowindow;

            showDetailedInfo(place);
          });

          markers_shown.push(marker);
        });
      }
    });

  }

  function showDetailedInfo(place) {
    var params = {
      placeId: place['place_id']
    };
    service.getDetails(params, function(place) {
      $('#hero-header-wrapper img').attr('src', place.photos[0].getUrl({'maxWidth': 408, 'maxheight': 407}));
      $('.place-name').text(place['name']);
      $('.place-review-score').text(place['rating']);
      $('.place-type').text(place['types'][0]);
      $('#place-info-wrapper').addClass('visible');
      $('#place-info-wrapper').addClass('is-active');
    });
  }

  initMap();
});
