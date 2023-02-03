const $newEntryForm = document.querySelector('#new-entry-form')
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

// Photo URL input updates new entry preview img
$newEntryPhotoURL.addEventListener('input', async (e) => {
  try {
    const img = await loadImg($newEntryPhotoURL.value)
    $newEntryImg.setAttribute('src', img.src)
  } catch {
    // invalid img url
    $newEntryImg.setAttribute('src', "./images/placeholder-image-square.jpg")
  }
})

function checkIfAlphanumeric(char) {
  if (typeof char !== 'string') return false // must be string
  if (char >= 0 && char <= 9) return true // number
  if (char.toLowerCase() !== char.toUpperCase()) return true // alphabetical
  return false // not alphanumeric
}

function checkValidEntryInput(str) {
  if (typeof str !== 'string') return false // must be string

  // must contain at least 1 alphanumeric char
  return !!str.split('').filter(char => checkIfAlphanumeric(char)).length
}

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