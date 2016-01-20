window.addEventListener("load", inicio,false);

function getId(cadena){
    return document.getElementById(cadena);
}

function getClass(cadena){
    return document.getElementsByClassName(cadena);
}

function obtenerGeolocalizacion(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(exito,error);
    }else{
        alert("no soportado");
    }
}