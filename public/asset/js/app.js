const service_list = document.getElementById('service_list')
const service_type = document.getElementById('service-type')
const technician_assign = document.getElementById('technician_assign')
const technician_list = document.getElementById('technician_list')
const form=document.querySelector('form')
const serviceset = new Set()
const technicianset = new Set()

flatpickr('#time-picker', {
  enableTime: true,
  noCalendar: true,
  dateFormat: 'h:i K',
  time_24hr: false,
})

function tagfunction(value, id,set) {
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
  const hiddenInput = document.createElement('input')
  hiddenInput.type = 'hidden'
  hiddenInput.name = id === service_list ? 'service_list' : 'assigned_technician'
  hiddenInput.value = value
  tag.appendChild(hiddenInput)
  removeBtn.addEventListener('click', () => {
    set===serviceset?serviceset.delete(value):technicianset.delete(value)
    tag.remove()
  })
  id.appendChild(tag)
}

technician_list.addEventListener('change', () => {
  const value = technician_list.value
  if (value != 'Select Technician' && !technicianset.has(value)) {
    technicianset.add(value)
    tagfunction(value, technician_assign,technicianset)
  }
  technician_list.selectedIndex = 0
})

service_type.addEventListener('change', () => {
  const value = service_type.value
  if (value !== 'Select Service' && !serviceset.has(value)) {
    serviceset.add(value)
    tagfunction(value, service_list,serviceset)
  }
  service_type.selectedIndex = 0
})

form.addEventListener('submit',(e)=>{
  if(!document.getElementById('time-picker').value){
    e.preventDefault();
    return alert("Please Select Estimation Time")
  }
  if(service_list.childElementCount<=0 || technician_assign.childElementCount<=0){
    e.preventDefault();
    return alert("Select atleast one Service and Technician")
  }
})

form.addEventListener("reset",()=>{
  location.reload();
})