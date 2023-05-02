async function requesstLocationCords() {
  if (navigator.geolocation) {
    console.log('geolocation is available')
    navigator.geolocation.getCurrentPosition(function (position) {
      return position.coords
    })
  } else {
    console.log('geolocation is not available')
    return false
  }
}

const pos = await requesstLocationCords()
console.log(pos, 'pos')
