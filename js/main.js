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

var result=JSON.parse(localStorage.getItem('resultados'));
if (result != null){
    mostrarResult(result);
}
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
        guardarResultados('resultados', data);
        onYouTubeIframeAPIReady();
    }).catch(function(error){
        console.log('Hay un error',error);
    });

};

var tempMax,tempMin,humedad,sensacionTermica,presion,velViento,descripClima,iconClima;
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
/*
//mostrar video
    if (iconClima == '01d'){
        tag.src=`https://www.youtube.com/watch?v=Azt9moHZ8j8`;
     }else if(iconClima == '02d' || iconClima == '03d' || iconClima == '04d'){
        tag.src=`https://www.youtube.com/watch?v=XFoczTlvoY4`;
     }else if(iconClima == '09d' || iconClima == '10d' || iconClima == '11d'){
        tag.src=`https://www.youtube.com/watch?v=nTAE-uYo6qs`;  
    }else if(iconClima == '13d'){
        tag.src=`https://www.youtube.com/watch?v=52QIQ0788Fc`; 
    }else if(iconClima == '50d'){
        tag.src=`https://www.youtube.com/watch?v=Jma89WgyOE8`;  
    };
    */
};

function guardarResultados(name, data){
    localStorage.setItem(name, JSON.stringify(data));
};

//video

 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
     height: '360',
     width: '640',
     videoId: 'M7lc1UVf-VE' ,

     events: {
         
       'onReady': onPlayerReady,
       'onStateChange': onPlayerStateChange
     }
   });
 }

 // 4. The API will call this function when the video player is ready.
 function onPlayerReady(event) {
   event.target.playVideo();
 }

 // 5. The API calls this function when the player's state changes.
 //    The function indicates that when playing a video (state=1),
 //    the player should play for six seconds and then stop.
 var done = false;
 function onPlayerStateChange(event) {
   if (event.data == YT.PlayerState.PLAYING && !done) {
     setTimeout(stopVideo, 6000);
     done = true;
   }
 }
 function stopVideo() {
   player.stopVideo();
 }       
        
