const $newEntryImg = document.querySelector('.new-entry img')
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
    const img = await loadImg($newEntryPhotoURL.value)
    $newEntryImg.setAttribute('src', img.src)
  } catch {
    // invalid img url
    $newEntryImg.setAttribute('src', "./images/placeholder-image-square.jpg")
  }
})