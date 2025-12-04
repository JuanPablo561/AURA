const saveBtn = document.getElementById("saveBtn");
const statusDiv = document.getElementById("status");
const resultBox = document.getElementById("result");
const jsonPreview = document.getElementById("jsonPreview");

// 🔥 AQUÍ PONES LA URL DE TU BASE DE DATOS (API ENDPOINT)
// Si usas Supabase o una API propia, la URL se ve así:
const API_URL = "https://tu-proyecto.supabase.co/rest/v1/registros"; 
// const API_KEY = "tu-api-key-secreta"; 

saveBtn.addEventListener("click", async () => {
  // 1. Obtener valores del HTML
  const user = document.getElementById("userInput").value;
  const wasteType = document.getElementById("typeInput").value;
  const weight = document.getElementById("weightInput").value;

  if (!user || !weight) {
    alert("Por favor completa todos los campos.");
    return;
  }

  statusDiv.textContent = "Empaquetando datos...";
  resultBox.style.display = "none";
  saveBtn.disabled = true;

  // 2. Crear la estructura del JSON (Payload)
  // Esto es lo que va a viajar a la base de datos
  const dataToSend = {
    usuario: user,
    residuo: wasteType,
    peso_kg: parseFloat(weight),
    fecha: new Date().toISOString(), // Marca de tiempo automática
    dispositivo: "Web Client"
  };

  // Mostramos el JSON en pantalla para que veas cómo queda
  jsonPreview.textContent = JSON.stringify(dataToSend, null, 2);
  resultBox.style.display = "block";

  try {
    statusDiv.textContent = "Enviando a la nube... ☁️";

    // 3. Simulación de envío (COMENTAR ESTO CUANDO TENGAS API REAL)
    // Usamos un retraso falso para simular la red
    await new Promise(r => setTimeout(r, 1500));
    
    // 4. CÓDIGO REAL DE ENVÍO (Descomentar para usar)
    /*
    const response = await fetch(API_URL, {
      method: "POST", // Importante: POST es para crear/guardar
      headers: {
        "Content-Type": "application/json",
        "apikey": "TU_API_KEY_AQUI", // Si usas Supabase
        "Authorization": "Bearer TU_TOKEN" // Si requiere auth
      },
      body: JSON.stringify(dataToSend) // Convertimos el objeto a texto JSON
    });

    if (!response.ok) throw new Error("Error en el servidor");
    */

    statusDiv.textContent = "¡Guardado exitosamente! ✅";
    statusDiv.style.color = "#4ade80"; // Verde éxito

  } catch (error) {
    console.error(error);
    statusDiv.textContent = "Error al guardar: " + error.message;
    statusDiv.style.color = "#f87171"; // Rojo error
  }

  saveBtn.disabled = false;
});
