const apiKey = '9R71T0IVMR0C';  // Reemplaza con tu clave API de TimeZoneDb

const obtenerZonasHorarias = async () => {
    const url = `http://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data.zones.countryName);

        } else {
            console.error(`Error en la solicitud. Código de estado: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error de conexión: ${error}`);
    }
};

// Llamada a la función asincrónica
obtenerZonasHorarias();
