const sendBtn = document.getElementById("sendBtn");
const statusDiv = document.getElementById("status");
const resultBox = document.getElementById("result");
const jsonPreview = document.getElementById("jsonPreview");

// Datos APEX
const HOST = "oracleapex.com";
const ENDPOINT = "/ords/a01286499/aura/led/control";

sendBtn.addEventListener("click", async () => {

  const ldr = document.getElementById("ldrInput").value;
  const ledstate = document.getElementById("ledInput").value;
  const id_led = document.getElementById("idLedInput").value;

  if (!ldr) {
    alert("Debe ingresar un valor de LDR.");
    return;
  }

  statusDiv.textContent = "Preparando JSON...";
  resultBox.style.display = "none";

  // JSON exacto que se enviará al servidor
  const dataToSend = {
    ldrstate: parseInt(ldr),
    ledstate: parseInt(ledstate),
    id_led: parseInt(id_led)
  };

  jsonPreview.textContent = JSON.stringify(dataToSend, null, 2);
  resultBox.style.display = "block";

  // Construcción de la URL final
  const fullURL = `https://${HOST}${ENDPOINT}`;

  try {
    statusDiv.textContent = "Enviando datos...";
    statusDiv.style.color = "#9ecbff";

    const response = await fetch(fullURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSend)
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error("Error del servidor: " + text);
    }

    statusDiv.textContent = "Datos enviados correctamente ✔";
    statusDiv.style.color = "#4ade80";

  } catch (error) {
    statusDiv.textContent = "Error: " + error.message;
    statusDiv.style.color = "#f87171";
  }
});
