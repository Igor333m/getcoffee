/* Geolocation */
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

let latitude = "";
let longitude = "";

function success(pos) {
  var crd = pos.coords;
  latitude =`${crd.latitude}`;
  longitude = `${crd.longitude}`;
  console.log(typeof latitude);
  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);

// End of geolocation ******

const CLIENT_ID = "AB3FLGUEFHVZF5TZG5Y5RZTPU4NTLI4WMNNTKAAXGAVK3AOB";
const CLIENT_SECRET = "GOUPE2R0UTVCO14EYQGRSVNIXGIA1S5UUSN1KBXP35FIAMNJ";

var jqxhr = undefined;
// Foursquare app information
$(document).ready(function(){


  
  $(".button").click( function() {
  jqxhr = $.ajax({
    url: `https://api.foursquare.com/v2/venues/search?ll=${latitude},${longitude}&radius=1000&limit=5&query=coffee&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20172910`,
    method: 'GET',
    // client_id: CLIENT_ID,
    // client_secret: CLIENT_SECRET,
    // ll: latitude + "," + longitude,
    // query: 'coffee',
    // v: '20172910',
    // limit: 1,
    // radius: 1000
    }, function(err, res, body) {
      if (err) {
        console.error(err);
      } else {
        console.log(body);
      }
    });
  });
  new Promise((resolve, reject) => {
    $(document).ajaxComplete( () => {
      console.log(jqxhr.responseJSON.response.venues);
      resolve();
      let allVenues = jqxhr.responseJSON.response.venues;
      for (let i in allVenues) {
        $(".venue").append(`<h2>${allVenues[i].name}</h2>`);
      }

    });
  }).catch(console.log("something went wrong, again!"));

});
