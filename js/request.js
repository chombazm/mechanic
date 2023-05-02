const currentUrl = window.location.href
const latInpt = document.getElementById('lat')
const lngInpt = document.getElementById('lng')
const model = document.getElementById('model')
const brand = document.getElementById('brand')
const year = document.getElementById('year')
const dispLocation = document.getElementById('displayLocation')
const locationNameInpt = document.getElementById('locationNameReversed')
const userPhone = document.getElementById('phoneNumber')
const submitBtn = document.getElementById('requestButton')

// add an event listener the submit button and prevent default
submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  // get the values from the inputs
  const lat = latInpt.value
  const lng = lngInpt.value

  // check if the values not empty
  if (!lat || !lng) {
    alert('Please select a location')
    return
  }

  if (!model.value) {
    alert('Please enter a model')
    return
  }

  if (!brand.value) {
    alert('Please enter a brand')
    return
  }

  if (!year.value) {
    alert('Please enter a year')
    return
  }

  if (!userPhone.value) {
    alert('Please enter a phone number')
    return
  }

  const message = `*New Request*%0A%0A*Location*%0Ahttps://www.google.com/maps/place/${lat},${lng}%0A%0A*Model*%0A${model.value}%0A%0A*Brand*%0A${brand.value}%0A%0A*Year*%0A${year.value}%0A%0A*Phone*%0A${userPhone.value}`

  window.open(`https://wa.me/260976121765?text=${message}`, '_blank')
})

let cords = {}
function getQueryParams(url) {
  const params = {}
  const queryString = url.split('?')[1]
  if (queryString) {
    const keyValuePairs = queryString.split('&')
    keyValuePairs.forEach((keyValuePair) => {
      const [key, value] = keyValuePair.split('=')
      params[key] = decodeURIComponent(value.replace(/\+/g, ' '))
    })
  }
  return params
}

const queryParams = getQueryParams(currentUrl)

function initMap() {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        var map = new google.maps.Map(document.getElementById('map'), {
          center: pos,
          zoom: 14,
        })

        latInpt.value = pos.lat
        lngInpt.value = pos.lng
        // console.log(pos, 'pos')
        reverseGeocode(pos.lat, pos.lng)

        // Add a marker at the user's current location
        var marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Your current location',
        })

        // Add a listener for the click event on the map
        map.addListener('click', function (event) {
          // Get the coordinates of the clicked location
          var clickedPos = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          }

          // Do something with the coordinates, like display them in a form input
          document.getElementById('lat').value = clickedPos.lat
          document.getElementById('lng').value = clickedPos.lng

          // Add a marker at the clicked location
          var marker = new google.maps.Marker({
            position: clickedPos,
            map: map,
          })
        })
      },
      function () {
        // Handle errors
      }
    )
  } else {
    // Browser doesn't support geolocation
  }
}

function reverseGeocode(lat, lng) {
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBgYUw2-j8mrkt-cPp5NB7OHBnZuOBMVL8`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'OK') {
        var location = data.results[0].formatted_address

        locationNameInpt.value = location
        console.log(location)
        dispLocation.innerHTML = location
        document.getElementById('locationNameReversed').value = location
      } else {
        console.log('Geocoding failed')
        // Geocoding failed
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    alert('Geolocation is not supported by this browser.')
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude
  var longitude = position.coords.longitude
  const locationName = reverseGeocode(latitude, longitude)

  locationNameInpt.value = locationName
}
initMap()
