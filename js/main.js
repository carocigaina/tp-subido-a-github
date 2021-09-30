const API_KEY = "3832bda8376d30fc3c257ba44354befa"; // PEGUEN ACA SU API KEY!!
const URL = "https://api.openweathermap.org/data/2.5/";

var input=document.getElementById('search');
var boton=document.getElementById('sendButton');
var main=document.getElementById('main');
var descripcion=document.getElementById('descrip');
var li1=document.getElementById('li1');
var li2=document.getElementById('li2');
var li3=document.getElementById('li3');
var li4=document.getElementById('li4');
var li5=document.getElementById('li5');
var li6=document.getElementById('li6');
var img=document.getElementById('img');


boton.addEventListener("click", ()=>{
    
    //console.log('valor',input.value);
    buscarClima(input.value);
});


function buscarClima(ciudad){

    fetch(`${URL}weather?q=${ciudad}&lang=es&appid=${API_KEY}&units=metric` )
    .then(function(response){
        console.log(response);
        return response.json();
    }).then(function(data){
        
        mostrarResult(data);
        guardarResultados(data);
    }).catch(function(error){
        console.log('Hay un error',error);
    });

};

var tempMax,tempMin,humedad,sensacionTermica,presion,velViento,tipoClima,descripClima;
function mostrarResult(data){
    
    //console.log(data);
    tempMax=data.main.temp_max;
    tempMin=data.main.temp_min;
    humedad=data.main.humidity;
    sensacionTermica=data.main.feels_like;
    presion=data.main.pressure;
    velViento=data.wind.speed;
    descripClima=data.weather[0]["description"];
    iconClima=data.weather[0]["icon"];
    
    
    li1.innerHTML= 'Clima actual: ' + descripClima;
    li2.innerHTML= 'Temperatura máxima: '+ tempMax;
    li3.innerHTML= 'Temperatura minima: '+ tempMin;
    li4.innerHTML= 'Humedad: '+ humedad;
    li5.innerHTML= 'Sensación Térmica: '+ sensacionTermica;
    li6.innerHTML= 'Presión Atmosférica: '+ presion;
    li7.innerHTML= 'TVelocidad del viento: '+ velViento;
    img.src=`http://openweathermap.org/img/wn/${iconClima}@2x.png`;
};

function guardarResultados(data){
    localStorage.setItem('resultados', JSON.stringify(data));
};