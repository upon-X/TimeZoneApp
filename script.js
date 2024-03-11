let countryInfoHTML = document.querySelector(".country_info");

const apiKey = '9R71T0IVMR0C';  // Reemplaza con tu clave API de TimeZoneDb

const obtenerZonasHorarias = async () => {
    const url = `http://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            let countryInfoText = "";
            for (let i = 0; i < 100; i++) {
                let name = data.zones[i].countryName;
                let timestamp = data.zones[i].timestamp;
                // Crear un objeto Date con el timestamp
                let date = new Date(timestamp * 1000);  // Multiplicar por 1000 para convertir segundos a milisegundos
                // Obtener hora, minuto y segundo
                let hours = date.getHours().toString().padStart(2, '0');
                let minutes = date.getMinutes().toString().padStart(2, '0');
                // let seconds = date.getSeconds().toString().padStart(2, '0');
                // Acumular la información del país
                countryInfoText += `<h3>${name}, ${hours}:${minutes}</h3>`;
            }

            // Asignar la información acumulada a los elementos HTML
            countryInfoHTML.innerHTML = countryInfoText;
        } else {
            console.error(`Error en la solicitud. Código de estado: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error de conexión: ${error}`);
    }
};
obtenerZonasHorarias();
setInterval(obtenerZonasHorarias, 60000);


async function obtenerTiempoPais(country) {
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=America/Chicago`
    try {
        const response = await fetch(url)
        if (response.ok) {
            let countrySearch = await response.json()
        }
    } catch (error) {
        console.error(error)
    }
}