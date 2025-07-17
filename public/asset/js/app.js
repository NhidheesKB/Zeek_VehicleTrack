const form = document.querySelector('form')
const checkbox = document.getElementById('checkbox')
const csrfToken = document.head.querySelector('meta[title="csrf-token"]').content
const service_notes = document.getElementById('service-notes')
const checkbox_label = document.getElementById('checkbox_label')
const loading = document.getElementById('loading')
const selectLanguage = document.getElementById('language_select')
let chunks = []
let stream, mediarecorder,language
flatpickr('#time-picker', {
  enableTime: true,
  noCalendar: true,
  dateFormat: 'h:i K',
  time_24hr: false,
})

async function recorder() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    chunks = []
    mediarecorder = new MediaRecorder(stream)
    mediarecorder.start()
    mediarecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data)
    }
    mediarecorder.onstop = (e) => {
      const audioblob = new Blob(chunks, { type: 'audio/webm' })
      sendaudio(audioblob)
    }
  } catch (error) {
    checkbox.checked=false
    alert(`Microphone ${error.message}`)
  }
}
async function sendaudio(audioblob) {
  try {
    checkbox_label.style.display = 'none'
    loading.classList.remove('hidden')
    const formdata = new FormData()
    formdata.append('recorder', audioblob)
    formdata.append('language', language)
    const response = await fetch('/admin/upload', {
      method: 'POST',
      body: formdata,
      headers: {
        'X-CSRF-Token': csrfToken,
      },
    })

    if (response.ok) {
      const res = await response.json()
      service_notes.innerText = res.message
      loading.classList.add('hidden')
      checkbox_label.style.removeProperty('display')
    }
  } catch (error) {
    loading.classList.add('hidden')
    checkbox_label.style.removeProperty('display')
  }
}

form.addEventListener('submit', (e) => {
  if (!document.getElementById('time-picker').value) {
    e.preventDefault()
    return alert('Please Select Estimation Time')
  }
})
form.addEventListener('reset', () => {
  location.reload()
})
checkbox.addEventListener('click', () => {
  language=selectLanguage.value
  if (language === 'Choose a language') {
    checkbox.checked = false
    return alert('Please Select the language')
  } else if (checkbox.checked) {
    recorder()
  } else if (mediarecorder && mediarecorder.state != 'inactive') {
    mediarecorder.stop()
  }
})
