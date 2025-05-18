const service_list = document.getElementById('service_list')
const service_type = document.getElementById('service-type')
const serviceset = new Set()

service_type.addEventListener('change', () => {
  const value = service_type.value

  if (value !== 'Select Service' && !serviceset.has(value)) {
    serviceset.add(value)

    const tag = document.createElement('span')
    tag.className = 'tag'
    tag.textContent = value

    const removeBtn = document.createElement('button')
    removeBtn.textContent = 'X'
    removeBtn.className = 'remove-btn'
    removeBtn.style.marginLeft = '8px'
    removeBtn.style.color = 'red'
    removeBtn.style.border = 'none'
    removeBtn.style.background = 'transparent'
    removeBtn.style.cursor = 'pointer'
    tag.appendChild(removeBtn)
    removeBtn.addEventListener('click', () => {
      serviceset.delete(value)
      tag.remove()
    })
    service_list.appendChild(tag);
    console.log(service_list.textContent)
  }
  
  service_type.selectedIndex = 0
})
