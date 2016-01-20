var bena = { //Benalúa
	latitude: 37.3281446,
	longitude: -3.1755671
};
var mapa; // va a contener el mapa Google después de crearlo
window.onload = obtenerSituacion;

function obtenerSituacion() {
	if (navigator.geolocation) { // Nos aseguramos de que el navegador soporta la API Geolocation
		navigator.geolocation.getCurrentPosition(visualizarSituacion, errorSituacion); //Llamamos al método getCurrentPosition y le pasamos una función manejadora
	} else {
		alert("No hay soporte de geolocalización");
	}
}
// El manejador que será llamado cuando el navegador tenga una situación
// Recibe una variable que contiene la longitud y la latitud así como información sobre la exactitud
function visualizarSituacion(posicion) {
	// Obtenemos latitud y longitud del objeto posicion.coords
	var latitud = posicion.coords.latitude;
	var longitud = posicion.coords.longitude;
	var div = document.getElementById("situacion");
	div.innerHTML = "Estás en Latitud: " + latitud + ", Longitud: " + longitud;
	var km = calcularDistancia(posicion.coords, bena);
	var distancia = document.getElementById("distancia");
	distancia.innerHTML = "Estás a " + km + " km de Benalúa";
	mostrarMapa(posicion.coords);
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
	div.innerHTML = mensajeError;
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
	return distancia;
}

function gradosARadianes(grados) {
	var radianes = (grados * Math.PI) / 180;
	return radianes;
}

function mostrarMapa(coordenadas) {
	var googleLatLong = new google.maps.LatLng(coordenadas.latitude, coordenadas.longitude);
	var opcionesMapa = {
		zoom: 18,
		center: googleLatLong,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	var divMapa = document.getElementById("mapa");
	var titulo = "Tu situación";
	var contenido = "Tu estás aquí: " + coordenadas.latitude + ", "+ coordenadas.longitude;
	mapa = new google.maps.Map(divMapa, opcionesMapa);
	addMarker(mapa, googleLatLong, titulo, contenido);
}

function addMarker(mapa, googleLatLong, titulo, contenido) {
	// Crear el marcador
	var opcionesMarker = {
		position: googleLatLong,
		map: mapa,
		title: titulo,
		clickable: true
	};
	var marcador = new google.maps.Marker(opcionesMarker);
	//crear la ventana de información
	var opcionesVentanaInfo = {
		content: contenido,
		position: googleLatLong
	};
	var ventanaInfo = new google.maps.InfoWindow(opcionesVentanaInfo);
	// crear un manejador para el evento click en el marcador
	google.maps.event.addListener(marcador, "click", function () {
		ventanaInfo.open(mapa);
	});
}