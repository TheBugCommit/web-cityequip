
const equipmentForm = () => {
  const addBtn = document.getElementById('add-tipus-btn')
  const textInput = document.getElementById('tipus-text-input')
  const selectInput = document.getElementById('tipus-select')
  const form = document.querySelector('#equipment-form')

  if (form) {
    addBtn.addEventListener('click', () => {
      const isHidden = textInput.classList.contains('d-none')
      const icon = addBtn.querySelector("i")

      if (isHidden) {
        textInput.classList.remove('d-none')
        selectInput.disabled = true
        selectInput.removeAttribute('name')
        textInput.setAttribute('name', 'tipus')
        textInput.focus()
        icon.classList.remove("fa-puls")
        icon.classList.add("fa-minus")
      } else {
        textInput.classList.add('d-none')
        textInput.value = ''
        selectInput.disabled = false
        textInput.removeAttribute('name')
        selectInput.setAttribute('name', 'tipus')
        icon.classList.remove("fa-minus")
        icon.classList.add("fa-plus")
      }
    })
  }
}

export default equipmentForm