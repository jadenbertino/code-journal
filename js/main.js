const $newEntryImg = document.querySelector('.new-entry .img-wrapper')
const $newEntryPhotoURL = document.querySelector('#new-entry-photoURL')

function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

$newEntryPhotoURL.addEventListener('input', async (e) => {
  try {
    if ($newEntryPhotoURL.value === "") {
      $newEntryImg.setAttribute('background-image', "url('./images/placeholder-image-square.jpg')")
      // $newEntryImg.style.backgroundImage = 
    } else {
      // $newEntryImg.style.backgroundImage = `url("${$newEntryPhotoURL.value}"`
      $newEntryImg.setAttribute('background-image', `url("${$newEntryPhotoURL.value}"`)
      console.log('everything ran smoothly')
    }
  } catch {
    $newEntryImg.style.backgroundImage = `url("./images/placeholder-image-square.jpg")`
    console.log('fuck')
  }
})