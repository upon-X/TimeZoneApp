let countryInfoHTML = document.querySelector(".country_info");
const apiKey = '9R71T0IVMR0C';

const obtenerZonasHorarias = async () => {
    const url = `https://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            let countryInfoText = "";
            let paisesAgregados = [];

            for (let i = 0; i < 350; i++) {
                let name = data.zones[i].countryName;
                let timestamp = data.zones[i].timestamp;
                let countryCode = data.zones[i].countryCode;

                if (!paisesAgregados.includes(countryCode)) {
                    let date = new Date(timestamp * 1000);  // Convierte el timestamp a milisegundos
                    date.setHours(date.getHours() + 3);  // Ajusta la hora según la diferencia de 3 horas
                    let hours = date.getHours().toString().padStart(2, '0');
                    let minutes = date.getMinutes().toString().padStart(2, '0');
                    countryInfoText += `<h3 class="every_country_time"><img alt="flag" src="https://flagsapi.com/${countryCode}/flat/32.png">${name}<span class="country_time">${hours}:${minutes}</span></h3>`;
                    paisesAgregados.push(countryCode);
                }
            }

            countryInfoHTML.innerHTML = countryInfoText;
        } else {
            console.error(`Error en la solicitud. Código de estado: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error de conexión: ${error}`);
    }
};

const ordenarAZ = () => {
    // Obtener todos los elementos de tiempo de los países
    const elementosTiempo = document.querySelectorAll('.every_country_time');

    // Convertir a un array y ordenar alfabéticamente
    const elementosOrdenados = Array.from(elementosTiempo).sort((a, b) => {
        const paisA = a.textContent.toLowerCase();
        const paisB = b.textContent.toLowerCase();
        return paisA.localeCompare(paisB);
    });

    // Actualizar la lista con los elementos ordenados
    countryInfoHTML.innerHTML = '';
    elementosOrdenados.forEach((elemento) => {
        countryInfoHTML.appendChild(elemento);
    });
};

const ordenarZA = () => {
    // Obtener todos los elementos de tiempo de los países
    const elementosTiempo = document.querySelectorAll('.every_country_time');

    // Convertir a un array y ordenar alfabéticamente en orden inverso
    const elementosOrdenados = Array.from(elementosTiempo).sort((a, b) => {
        const paisA = a.textContent.toLowerCase();
        const paisB = b.textContent.toLowerCase();
        return paisB.localeCompare(paisA);
    });

    // Actualizar la lista con los elementos ordenados
    countryInfoHTML.innerHTML = '';
    elementosOrdenados.forEach((elemento) => {
        countryInfoHTML.appendChild(elemento);
    });
};

document.getElementById('ordenAZ').addEventListener('click', ordenarAZ);
document.getElementById('ordenZA').addEventListener('click', ordenarZA);

obtenerZonasHorarias();
setInterval(obtenerZonasHorarias, 60000);
