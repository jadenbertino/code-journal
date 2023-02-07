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

// Form Validation Helpers
function checkIfAlphanumeric(char) {
  if (typeof char !== 'string') return false
  if (char >= 0 && char <= 9) return true // number
  if (char.toLowerCase() !== char.toUpperCase()) return true // alphabetical
  return false // not alphanumeric
}

function checkIfValidEntryInput(str) {
  if (typeof str !== 'string') return false 

  // has at least 1 alphanumeric char
  return !!str.split('').filter(char => checkIfAlphanumeric(char)).length
}

// Form Submit & Validation
$newEntryForm.addEventListener('submit', async (e) => {
  /*
  create newEntry object to store valid formControl name + values
  iterate through formControls
    check that value is valid
      if valid => push to newEntry + reset form control color
      if invalid => outline that form control in red
  check that newEntry Object is same length as # of form controls. means that all form controls were valid
    if true then push newEntry to data
  */
  e.preventDefault()
  const newEntry = { entryId: data.nextEntryId }
  
  for (let formControl of $newEntryForm) {
    if (!formControl.name) continue // skip button
    
    // img url
    if (formControl.name === 'photoURL') { 
      try {
        const {src} = await loadImg(formControl.value)
        newEntry.photoURL = src
        $newEntryForm.elements["new-entry-photoURL"].style.outline = "inherit"
      } catch {
        $newEntryForm.elements["new-entry-photoURL"].style.outline = "medium solid red"
      }
    } 
    
    // title + notes
    else { 
      const isValidEntry = checkIfValidEntryInput(formControl.value)
      if (isValidEntry) {
        newEntry[formControl.name] = formControl.value
        $newEntryForm.elements[`new-entry-${formControl.name}`].style.outline = "inherit"
      } else {
        $newEntryForm.elements[`new-entry-${formControl.name}`].style.outline = "medium solid red"
      }
    }
  }

  // if newEntry is length 4 then all form controls were pushed aka all form controls were all valid
  if (Object.keys(newEntry).length === $newEntryForm.length) {
    data.entries.unshift(newEntry)
    data.nextEntryId++
    $newEntryImg.setAttribute('src', "./images/placeholder-image-square.jpg")
    e.target.reset()
  }
})