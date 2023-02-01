/* exported data */

// Export Data to local storage
window.addEventListener('beforeunload', () => {
  const dataJSON = JSON.stringify(data)
  localStorage.setItem('dataJSON', dataJSON)
})

// Import Data from local storage
const prevData = localStorage.getItem('dataJSON')
const data = prevData ? JSON.parse(prevData) : {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
}
console.log(data)