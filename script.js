const sendBtn = document.getElementById("sendBtn")
const statusDiv = document.getElementById("status")
const resultBox = document.getElementById("result")
const jsonPreview = document.getElementById("jsonPreview")

// APEX
const HOST = "oracleapex.com"
const ENDPOINT = "/ords/a01286499/aura/led/control"

// Widgets
const ldrSlider = document.getElementById("ldrSlider")
const modeButtons = document.querySelectorAll(".mode-btn")
const idLedSlider = document.getElementById("idLedSlider")

// Textos de valor
const ldrValue = document.getElementById("ldrValue")
const ledValue = document.getElementById("ledValue")
const idLedValue = document.getElementById("idLedValue")

// State variables
let currentLedMode = 0

// Eventos para actualizar valores UI
ldrSlider.addEventListener("input", () => {
  ldrValue.textContent = ldrSlider.value
})

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = Number.parseInt(btn.dataset.value)
    currentLedMode = value
    ledValue.textContent = value

    // Actualizar estado visual
    modeButtons.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")
  })
})

// Establecer botón inicial como activo
document.querySelector('.mode-btn[data-value="0"]').classList.add("active")

idLedSlider.addEventListener("input", () => {
  idLedValue.textContent = idLedSlider.value
})

// Botón para enviar JSON
sendBtn.addEventListener("click", async () => {
  const dataToSend = {
    ldrstate: Number.parseInt(ldrSlider.value),
    ledstate: currentLedMode,
    id_led: Number.parseInt(idLedSlider.value),
  }

  jsonPreview.textContent = JSON.stringify(dataToSend, null, 2)
  resultBox.style.display = "block"

  const fullURL = `https://${HOST}${ENDPOINT}`

  try {
    statusDiv.textContent = "Enviando datos..."
    statusDiv.style.color = "#9ecbff"

    const response = await fetch(fullURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    })

    const text = await response.text()

    if (!response.ok) {
      throw new Error("Error del servidor: " + text)
    }

    statusDiv.textContent = "Datos enviados correctamente ✔"
    statusDiv.style.color = "#4ade80"
  } catch (error) {
    statusDiv.textContent = "Error: " + error.message
    statusDiv.style.color = "#f87171"
  }
})
