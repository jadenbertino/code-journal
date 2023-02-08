/*

  DOM

*/

const $newEntryForm = document.querySelector('#new-entry-form');
const $newEntryImg = document.querySelector('.new-entry img');
const $newEntryPhotoURL = document.querySelector('#new-entry-photoURL');
const $newEntryHeader = document.querySelector('.form-header h1');
const $deleteEntryBtn = document.querySelector('.delete-entry-btn');
const $modalBackdrop = document.querySelector('.modal-backdrop');
const $cancelDeleteBtn = document.querySelector('.cancel-delete-btn');
const $views = [
  document.querySelector('div[data-view="entry-form"'),
  document.querySelector('div[data-view="entries"')
];
const $viewEntries = document.querySelector('.view-entries');
const $viewEntriesList = document.querySelector('.view-entries ul');
const $noEntries = document.querySelector('#no-entries');
const $newEntryBtn = document.querySelector('#new-entry-btn');
const $viewEntriesBtn = document.querySelector('#view-entries-btn');
const $navViewEntriesBtn = document.querySelector('header button');
const $confirmDeleteBtn = document.querySelector('.confirm-delete-btn')

/*

    NEW ENTRY

*/


function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Photo URL input updates new entry preview img
$newEntryPhotoURL.addEventListener('input', async (e) => {
  try {
    const img = await loadImg($newEntryPhotoURL.value);
    $newEntryImg.setAttribute('src', img.src);
  } catch {
    // invalid img url
    $newEntryImg.setAttribute('src', './images/placeholder-image-square.jpg');
  }
});

// Form Validation Helpers
function checkIfAlphanumeric(char) {
  if (typeof char !== 'string') return false;
  if (char >= 0 && char <= 9) return true; // number
  if (char.toLowerCase() !== char.toUpperCase()) return true; // alphabetical
  return false; // not alphanumeric
}

function checkIfValidEntryInput(str) {
  if (typeof str !== 'string') return false;

  // has at least 1 alphanumeric char
  return !!str.split('').filter(char => checkIfAlphanumeric(char)).length;
}

// Form Submit & Validation
$newEntryForm.addEventListener('submit', async e => {
  /*
  create newEntry object to store valid formControl name + values
  iterate through formControls
    check that value is valid
      if valid => push to newEntry + reset form control color
      if invalid => outline that form control in red
  check that newEntry Object is same length as # of form controls. means that all form controls were valid
    if true then push newEntry to data
  */
  e.preventDefault();
  const newEntry = { entryId: data.nextEntryId };

  for (let formControl of $newEntryForm) {
    if (!formControl.name) continue; // skip button

    // img url
    if (formControl.name === 'photoURL') {
      try {
        const { src } = await loadImg(formControl.value);
        newEntry.photoURL = src;
        $newEntryForm.elements['new-entry-photoURL'].style.outline = 'inherit';
      } catch {
        $newEntryForm.elements['new-entry-photoURL'].style.outline =
          'medium solid red';
      }
    }

    // title + notes
    else {
      const isValidEntry = checkIfValidEntryInput(formControl.value);
      if (isValidEntry) {
        newEntry[formControl.name] = formControl.value;
        $newEntryForm.elements[`new-entry-${formControl.name}`].style.outline =
          'inherit';
      } else {
        $newEntryForm.elements[`new-entry-${formControl.name}`].style.outline =
          'medium solid red';
      }
    }
  }

  // if newEntry is length 4 then all form controls were pushed aka all form controls were all valid
  if (Object.keys(newEntry).length === 4) {

    // new entry
    if (!data.editing) {
      data.entries.unshift(newEntry);
      data.nextEntryId++;
      const $newEntry = renderEntry(newEntry);
      $viewEntriesList.prepend($newEntry);
    }

    // update entry
    else {
      // update data
      const targetID = data.editing.entryId
      newEntry.entryId = targetID
      for (let i = 0; i < data.entries.length; i++) {
        if (data.entries[i].entryId == targetID) {
          data.entries[i] = newEntry
        }
      }
      data.editing = null

      // update DOM
      const $newEntry = renderEntry(newEntry);
      for (let child of $viewEntriesList.children) {
        if (child.getAttribute('data-entry-id') == targetID) {
          $viewEntriesList.replaceChild($newEntry, child)
        }
      }
      $newEntryHeader.textContent = "New Entry"
    }

    // reset form + view entries
    $newEntryImg.setAttribute('src', './images/placeholder-image-square.jpg');
    e.target.reset();
    setEntryVisibility();
    viewSwap('entries');
  }
});

/*

    VIEW ENTRIES

*/

function renderEntry(entry) {
  /*

  <li>
    <div class="img-wrapper">
      <img src="./images/placeholder-image-square.jpg" />
    </div>
    <div class="text-wrapper">
      <h3>Ada Lovelace</h3>
      <p>Augusta Ada King, Countess of Lovelace was an English mathematician and writer</p>
    </div>
  </li>

  */
  const li = document.createElement('li');
  const imgWrapper = document.createElement('div');
  const entryImg = document.createElement('img');
  const textWrapper = document.createElement('div');
  const headerWrapper = document.createElement('div');
  const entryTitle = document.createElement('h3');
  const entryTitleText = document.createTextNode(entry.title);
  const pencilBtn = document.createElement('button')
  const pencilIcon = document.createElement('i');
  const entryDescription = document.createElement('p');
  const entryDescriptionText = document.createTextNode(entry.notes);

  // img
  imgWrapper.setAttribute('class', 'img-wrapper');
  entryImg.setAttribute('src', entry.photoURL);
  imgWrapper.appendChild(entryImg);
  
  // header wrapper
  textWrapper.appendChild(headerWrapper);  
  headerWrapper.appendChild(entryTitle)
  headerWrapper.appendChild(pencilBtn)
  pencilBtn.appendChild(pencilIcon)
  entryTitle.appendChild(entryTitleText);
  headerWrapper.setAttribute('class', 'entry-title-wrapper')
  pencilIcon.setAttribute('class', 'fa-solid fa-pencil')
  pencilBtn.setAttribute('class', 'btn pencil')

  // text wrapper
  textWrapper.setAttribute('class', 'text-wrapper');
  textWrapper.appendChild(entryDescription);
  entryDescription.appendChild(entryDescriptionText);

  // li
  li.appendChild(imgWrapper);
  li.appendChild(textWrapper);
  li.setAttribute('data-entry-id', entry.entryId)

  return li;
}



function setEntryVisibility() {
  // Display entries if there are any
  if (data.entries.length) {
    $noEntries.classList.add('hidden');
    $viewEntriesList.classList.remove('hidden');
  }

  // Display "no entries" text if none available
  else {
    $noEntries.classList.remove('hidden');
    $viewEntriesList.classList.add('hidden');
  }
}
setEntryVisibility();

// Render all current entries upon page load
data.entries.forEach(entry => {
  const newEntry = renderEntry(entry);
  $viewEntriesList.appendChild(newEntry);
});

// View Swapping
function viewSwap(viewName) {
  // reset forms if swapping to that view
  if (viewName === 'entry-form') {
    const formControls = $newEntryForm.elements
    formControls.title.value = ''
    formControls.photoURL.value = ''
    formControls.notes.value = ''
    $deleteEntryBtn.classList.add('hidden')
    $newEntryImg.setAttribute('src', './images/placeholder-image-square.jpg');
  }

  // set hidden attributes on divs
  $views.forEach(view => {
    if (view.getAttribute('data-view') === viewName) {
      view.classList.remove('hidden');
    } else {
      view.classList.add('hidden');
    }
  });
  data.view = viewName;
}
const prevSessionView = data.view;
viewSwap(prevSessionView);

$newEntryBtn.addEventListener('click', () => viewSwap('entry-form'));
$viewEntriesBtn.addEventListener('click', () => viewSwap('entries'));
$navViewEntriesBtn.addEventListener('click', () => viewSwap('entries'));

/*

    EDIT ENTRY

*/ 

$viewEntriesList.addEventListener('click', (e) => {
  if (!e.target.classList.contains('pencil')) return
  
  // Get target entry
  const parentListItem = e.target.closest('li')
  const targetID = parentListItem.getAttribute('data-entry-id')
  for (let entry of data.entries) {
    if (entry.entryId == targetID) {
      data.editing = entry
      break
    }
  }

  // Pre-Populate Form
  viewSwap('entry-form')
  const formControls = $newEntryForm.elements
  const targetEntry = data.editing
  formControls.title.value = targetEntry.title
  formControls.photoURL.value = targetEntry.photoURL
  formControls.notes.value = targetEntry.notes
  $newEntryImg.setAttribute('src', targetEntry.photoURL);

  // Change header from "New Entry" to "Edit Entry"
  $newEntryHeader.textContent = "Edit Entry"
  $deleteEntryBtn.classList.remove('hidden')
})


/*

    DELETE ENTRY

*/

// Delete Entry => Show Modal
$deleteEntryBtn.addEventListener('click', () => {
    $modalBackdrop.classList.remove('hidden')
})

// Cancel => Hide modal
$cancelDeleteBtn.addEventListener('click', () => {
  $modalBackdrop.classList.add('hidden')
})

// Confirm Delete
$confirmDeleteBtn.addEventListener('click', () => {
  const targetId = data.editing.entryId

  // Remove entry from data.entries
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId == targetId) {
      data.entries.splice(i, 1)
    }
  }
  
  // Remove entry from DOM
  for (let domEntry of $viewEntriesList.children) {
    if (domEntry.getAttribute('data-entry-id') == targetId) {
      domEntry.remove()
    }
  }

  // Hide modal & view entries
  $modalBackdrop.classList.add('hidden')
  viewSwap('entries')
})