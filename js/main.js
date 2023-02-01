const $newEntryForm = document.querySelector('#new-entry-form')
const $newEntryImg = document.querySelector('.new-entry img')
const $newEntryPhotoURL = document.querySelector('#new-entry-photoURL')

// Photo URL input updates new entry preview img
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

// Form Submit
$newEntryForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const newEntry = { entryId: data.nextEntryId }
  data.nextEntryId++
  for (let control of $newEntryForm) {
    if (control.name) newEntry[control.name] = control.value
  }
  data.entries.unshift(newEntry)
  $newEntryImg.setAttribute('src', "./images/placeholder-image-square.jpg")
  e.target.reset()
})