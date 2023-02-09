/* exported data */

// Export Data to local storage on exit
window.addEventListener('beforeunload', () => {
  const dataJSON = JSON.stringify(data)
  localStorage.setItem('dataJSON', dataJSON)
})

// Import Data from local storage on load
const prevData = localStorage.getItem('dataJSON')
const data = prevData ? JSON.parse(prevData) : {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
}