//Prepend and Map AIP with Lat Lon coordinates for Seattle and Syracuse
//You might need this ?? https://uwpce-weather-proxy.herokuapp.com/data/2.5/weather
const seaUri = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=47.6062&lon=-122.3321&APPID=a4c510cc6fa2c423475963305690dfd1&units=imperial"
const syrUri = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=43.0481&lon=-76.1474&APPID=a4c510cc6fa2c423475963305690dfd1&units=imperial"

//city varaibles
const seattle = "Seattle"
const syracuse = "Syracuse"
const myLoc  = "My Weather"


//buttons *seattle, Syracuse and my weather*
const sea = document.querySelector("button.seaBtn");
const syr = document.querySelector('button.syrBtn');
const myGeo = document.querySelector('button.myGeoBtn')

//click event listeners for buttons
sea.addEventListener("click", getSea);
syr.addEventListener("click", getSyr);
myGeo.addEventListener("click", getMyGeo)


function getWeather(city) {
	console.log(city)
	document.getElementById("container").innerHTML = ""
}
//get weather for Seattle
function getSea() {
	getWeather(seattle)
	callApi(seaUri)
  // changeColor()
}
//get weather for Syracuse
function getSyr() {
	getWeather(syracuse)
	callApi(syrUri)
  // changeColor()
}
//get weather for user's location
function getMyGeo() {
	getWeather(myLoc)
	navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError)
  // changeColor()
}


// Generic reusable weather api call function
function callApi(city) {
	let request = new XMLHttpRequest()
	request.open("GET", city, true)
	request.onload = onLoadFunc
	request.onerror = onerrorFunc
	request.send()
	return request
}


function onLoadFunc() {
const resp = JSON.parse(this.response)
//console.log(resp)
  var cont = document.getElementById("container");
  var list = document.createElement("ul");
  for (var i = 0; i < listInfo.length; i++) {
    var item = document.createElement("li");
    var item2 = document.createElement("li");
    var item3 = document.createElement("li");
    var item4 = document.createElement("li");
    var item5 = document.createElement("li");
    item.innerHTML = resp.name
    item2.innerHTML = resp.weather[0].description //"few clouds"
    item3.innerHTML = Math.round(resp.main.temp) + " °F"
    item4.innerHTML = "A High of: " + Math.round(resp.main.temp_max) + " °F"
    item5.innerHTML = "A Low of: " + Math.round(resp.main.temp_min) + " °F"
  }
    list.appendChild(item).setAttribute("class", "city-name");
    list.appendChild(item2).setAttribute("class", "wea-desc");
    console.log(item2.innerHTML)
    list.appendChild(item3).setAttribute("class", "current-temp");
    list.appendChild(item4).setAttribute("class", "high-temp");
    list.appendChild(item5).setAttribute("class", "low-temp");
    cont.appendChild(list);
    changeColor(item2.innerHTML);

}

function onerrorFunc() {
	console.log("Oh No!")
}

function listInfo(message) {
	let p = document.createElement("p")
	p.innerHTML = message
	document.getElementById("container").appendChild(p)
}

// user's geo location
function getLocation(locObj) {
	let mapUri = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=${locObj.lat}&lon=${locObj.lng}&units=imperial&APPID=a4c510cc6fa2c423475963305690dfd1`
	//console.log(mapUri)
	callApi(mapUri)
}

function geolocSuccess(position) {
	const newPos = {lat: position.coords.latitude, lng: position.coords.longitude}
	//console.log(newPos)
	getLocation(newPos)
}

function geolocError() {
	console.log("Error getting user's location.")
}




//function changes the css background color depending
// the weather.description
//******************************
function changeColor(myWeaDesc) {
  console.log("changeColor is firing")
  $("li.wea-desc").each(function() {
    switch (myWeaDesc) {
      case ("clear sky"):
        $('body').css("background-color","#7EC0EE");
        $("weather").attr("class","clear-sky");
        break;
      case ("few clouds"):
        $('body').css("background-color","#ADD8E6");
        $("weather").attr("class","few-clouds");
        break;
      case ("overcast clouds"):
        $('body').css("background-color","#b3cbd1");
        $("weather").attr("class","cloudy");
        break;
      case ("scattered clouds"):
      case ("broken clouds"):
        $('body').css("background-color","#b3cbd1");
        $("weather").attr("class","scattered-clouds");
        break;
      case ("shower rain"):
      case ("light rain"):
      case ("rain"):
        $('body').css("background-color","#B0C4DE");
        $("weather").attr("class","rain");
        break;
      case ("thunderstorm"):
        $('body').css("background-color","#999999");
        $("weather").attr("class","thunder");
        break;
      case ("snow"):
        $('body').css("background-color","#efefef");
        $('ul').css("color","#666");
        $("weather").attr("class","snow");
        break;
      case ("mist"):
        $('body').css("background-color","#e2e2e2");
        $('ul').css("color","#666");
        $("weather").attr("class","mist");
        break;
      default:
        console.log("oops");
      }
  });
}
