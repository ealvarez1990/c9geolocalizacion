bena = { //Benalúa
	latitude: 37.3281446,
	longitude: -3.1755671
};
mulhacen = { 
	latitude: 37.5,
	longitude: -3.317
};
window.onload = obtenerSituacion;

function obtenerSituacion() {
	if (navigator.geolocation) { // Nos aseguramos de que el navegador soporta la API Geolocation
		navigator.geolocation.getCurrentPosition(visualizarSituacion, errorSituacion); //Llamamos al método getCurrentPosition y le pasamos una función manejadora
	} else {
		alert("No hay soporte de geolocalización");
	}
}
// El manejador que se ejecuta cuando el navegador tenga la situación del usuario, recibe
// una variable que contiene la longitud y la latitud, así como información sobre la exactitud
function visualizarSituacion(posicion) {
	// Obtenemos latitud y longitud del objeto posicion.coords
	var latitud = posicion.coords.latitude;
	var longitud = posicion.coords.longitude;
	var div = document.getElementById("situacion");
	div.textContent = "Estás en Latitud: " + Math.round(latitud*100)/100 + " , Longitud: " + Math.round(longitud*100)/100;
	var km = calcularDistancia(posicion.coords, bena);
	var distancia = document.getElementById("distancia");
	distancia.textContent = "Estás a "+ km + " km de Benalúa";
    var km = calcularDistancia(posicion.coords, mulhacen);
	var distancia = document.getElementById("distancia");
	distancia.textContent += '\n'+ "Estás a "+ km + " km de la cumbre del Mulhacén";
}

function errorSituacion(error) {
	var tiposError = {
		0: "Error desconocido",
		1: "Permiso denegado por el usuario",
		2: "Posicion no disponible",
		3: "Tiempo excedido"
	};
	var mensajeError = tiposError[error.code];
	if (error.code === 0 || error.code === 2) {
		mensajeError = mensajeError + " " + error.message;
	}
	var div = document.getElementById("situacion");
	div.textContent = mensajeError;
}

function calcularDistancia(coordenadasOrigen, coordenadasDestino) {
	var radianesLatInicio = gradosARadianes(coordenadasOrigen.latitude);
	var radianesLongInicio = gradosARadianes(coordenadasOrigen.longitude);
	var radianesLatDestino = gradosARadianes(coordenadasDestino.latitude);
	var radianesLongDestino = gradosARadianes(coordenadasDestino.longitude);
	var Radio = 6371; // radio de la Tierra en Km
	var distancia = Math.acos(Math.sin(radianesLatInicio) * Math.sin(radianesLatDestino) +
		Math.cos(radianesLatInicio) * Math.cos(radianesLatDestino) *
		Math.cos(radianesLongInicio - radianesLongDestino)) * Radio;
	return Math.round(distancia*100)/100;
}

function gradosARadianes(grados) {
	var radianes = (grados * Math.PI) / 180;
	return radianes;
}