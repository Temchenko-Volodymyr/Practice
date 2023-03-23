
let url = ['http://api.openweathermap.org/data/2.5/weather?id=703448&appid=4e4c3b7a1db5d2a95056bb59284752ad',
    'http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=4e4c3b7a1db5d2a95056bb59284752ad',
    'http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=4e4c3b7a1db5d2a95056bb59284752ad'
];


let weekUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=50.4500336&lon=30.5241361&cnt=7&appid=4e4c3b7a1db5d2a95056bb59284752ad';

let weekUrlLondon = 'http://api.openweathermap.org/data/2.5/forecast?lat=51.5085300&lon=-0.1257400&cnt=7&appid=4e4c3b7a1db5d2a95056bb59284752ad';

let weekUrlNewYork = 'http://api.openweathermap.org/data/2.5/forecast?lat=40.7142700&lon=-74.0059700&cnt=7&appid=4e4c3b7a1db5d2a95056bb59284752ad';



class getElementsHtml {
    constructor() {
        this.cities = document.querySelectorAll('.city');
        this.deg = document.querySelectorAll('.deg');
        this.image = document.querySelectorAll('.image');
        this.windSpeed = document.querySelectorAll('.wSpeed');
        this.windDirection = document.querySelectorAll('.wDirection');
        this.pressure = document.querySelectorAll('.pressure');
        this.sunrise = document.querySelectorAll('.sunrise');
        this.sunseet = document.querySelectorAll('.sunseet');

        this.celsium = document.querySelectorAll('.celsius');
        this.faren = document.querySelectorAll('.faren');

        this.celsium2 = document.querySelectorAll('.celsius2');
        this.faren2 = document.querySelectorAll('.faren2');

        this.celsium3 = document.querySelectorAll('.celsius3');
        this.faren3 = document.querySelectorAll('.faren3');
    }
}

let element = new getElementsHtml();


for (let i = 0; i < url.length; i++) {

    let promise = fetch(url[i]);
    promise
        .then(response => {
            return response.json();
        }).then((data) => {
           
            element.cities[i].textContent = data.name;
            element.pressure[i].innerHTML += "<br>" + data.main.pressure;
            element.image[i].src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + "@2x.png";
            element.deg[i].innerHTML = Math.floor(data.main.temp) + "&#8457";
            element.windSpeed[i].innerHTML += "<br>" + data.wind.speed + "m/s";
            element.windDirection[i].style.transform = "rotate(" + data.wind.deg + "deg)";

            let timeSunrise = convertTime(data.sys.sunrise, data.timezone);
            let timeSunseet = convertTime(data.sys.sunset, data.timezone);

            element.sunrise[i].innerHTML += "<br>" + timeSunrise;
            element.sunseet[i].innerHTML += '<br>' + timeSunseet;
        });
}



function createSevenDaysInfo(url,celsiumElement,farenElement){

    let promise = fetch(url);

    promise
    .then(response => {
        return response.json()
    }).then((data) => {
       
        for(let i = 0; i < data.list.length; i++){

            celsiumElement[i].innerHTML = Math.floor(data.list[i].main.temp -  273.15) + '&#x2103';
            farenElement[i].innerHTML = Math.floor(data.list[i].main.temp) + "&#8457";
        }
    });

}

createSevenDaysInfo(weekUrl,element.celsium,element.faren);
createSevenDaysInfo(weekUrlLondon,element.celsium2,element.faren2);
createSevenDaysInfo(weekUrlNewYork,element.celsium3,element.faren3);


function convertTime(unixTime, timeZone) {
    let timezoneOffset = new Date().getTimezoneOffset() * 60;
    let date = new Date((unixTime + timezoneOffset + timeZone) * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let time = hours + ":" + minutes.slice(-2);
    return time;
};

// Which btn active

let btnActiveCelsius = document.querySelector('#btnCelsius');
let btnActiveFahrenheit = document.querySelector('#btnFahrenheit');
let deg = document.querySelectorAll('.deg');

let click = true;

btnActiveCelsius.addEventListener('click', function () {

    if (click) {

        click = false;

        for (let i = 0; i < 3; i++) {
          
            let numbers = element.deg[i].textContent.match(/\d+/g) - 273.15;
            element.deg[i].innerHTML = Math.floor(numbers)+ "&#x2103";
        }
    }
});

btnActiveFahrenheit.addEventListener('click', function () {

    if (!click) {
        click = true;

        for (let i = 0; i < 3; i++) {

            let promise = fetch(url[i]);
            promise
                .then(response => {
                    return response.json()
                }).then((data) => {
                    element.deg[i].innerHTML = Math.floor(data.main.temp )+ "&#8457";
                });
        }
        
    }
});

let btnCel = document.querySelector('.temperature1');
let wrapperBtn = document.querySelector('.wrapperBtn');
let btnFah = document.querySelector('.temperature2');


document.body.addEventListener('click', function (e) {
    if (e.target == btnCel) {

        wrapperBtn.style.backgroundColor = 'black';
        btnCel.style.backgroundColor = 'black';
        btnCel.style.color = 'white';
        btnFah.style.backgroundColor = 'white';
        btnFah.style.color = 'black';


    } else if (e.target == btnFah) {

        wrapperBtn.style.backgroundColor = 'black';
        btnFah.style.backgroundColor = 'black';
        btnFah.style.color = 'white';
        btnCel.style.backgroundColor = 'white';
        btnCel.style.color = 'black';
    }
});



let rightBtnsArrow = document.querySelectorAll('#rightUrrowBtn')
let counterBtnCheck = false;

for (let el of rightBtnsArrow) {
    el.addEventListener('click', function (e) {

        if (counterBtnCheck == false) {
            el.style.transform = "rotate(" + 180 + "deg)";
            counterBtnCheck = true;
        } else if (counterBtnCheck == true) {
            el.style.transform = "rotate(" + 0 + "deg)";
            counterBtnCheck = false;
        }
    })
}


// lower arrows more info

let btnsDown = document.querySelectorAll('.arrowDetails');

let checkerBtns = false;

let detailsFirst = document.querySelector('#firstDetails');
let firstArrow = document.querySelector('#firstArrow');

let detailsSecond = document.querySelector('#secondDetails')
let secondArrow = document.querySelector('#secondArrow');

let detailsLast = document.querySelector('#lastDetails');
let lastArrow = document.querySelector('#lastArrow')


for (let el of btnsDown) {
    el.addEventListener('click', function (e) {


        if (counterBtnCheck == false) {
            el.style.transform = "rotate(" + 180 + "deg)";

            if (e.target == firstArrow) {
                detailsFirst.style.display = 'flex'

            } else if (e.target == secondArrow) {
                detailsSecond.style.display = 'flex'

            } else if (e.target == lastArrow) {
                detailsLast.style.display = "flex"

            }

            counterBtnCheck = true;
        } else if (counterBtnCheck == true) {
            el.style.transform = "rotate(" + 0 + "deg)";
            counterBtnCheck = false;

            if (e.target == firstArrow) {
                detailsFirst.style.display = 'none'

            } else if (e.target == secondArrow) {
                detailsSecond.style.display = 'none'

            } else if (e.target == lastArrow) {
                detailsLast.style.display = "none"

            }
        }
    })
}

//   1
let arrow = document.querySelector('.first');
let check = false;

arrow.addEventListener('click', function () {
    let div = document.querySelector('.hidden');
   
    if (check == false) {
        check = true;
        div.style.display = 'block';
    } else if (check == true) {

        div.style.display = 'none';
        check = false;
    }

})

//2 

let arrow2 = document.querySelector('.second');

let check1 = false;

arrow2.addEventListener('click',function () {

   let div = document.querySelector(".hidden2");

   if (check1 == false) {
    check1 = true;
    div.style.display = 'block';
} else if (check1 == true) {

    div.style.display = 'none';
    check1 = false;
}
})

// 3

let arrow3 = document.querySelector(".third");

let check2 = false;

arrow3.addEventListener('click',function () {

    let div = document.querySelector(".hidden3");
 
    if (check2 == false) {
     check2 = true;
     div.style.display = 'block';
 } else if (check2 == true) {
 
     div.style.display = 'none';
     check2 = false;
 }
 });














