const currDay = document.getElementById('day');
const currDate = document.getElementById('date')
let timeData = new Date();
var week = new Array(7);
week[0] = 'Sun';
week[1] = 'Mon';
week[2] = 'Tue';
week[3] = 'Wed';
week[4] = 'thu';
week[5] = 'Fri';
week[6] = 'Sat';
currDay.innerHTML = week[timeData.getDay()];
var months = new Array(12);
months[0] = 'Jan';
months[1] = 'Feb';
months[2] = 'Mar';
months[3] = 'Apr';
months[4] = 'May';
months[5] = 'Jun';
months[6] = 'Jul';
months[7] = 'Aug';
months[8] = 'Sep';
months[9] = 'Oct';
months[10] = 'Nov';
months[11] = 'Dec';
currDate.innerHTML = `${timeData.getDate()}${months[timeData.getMonth()]}`;

const inpVal = document.getElementById('inpval');
const cityName = document.getElementById('cityname');
const goBtn = document.getElementById('submitbtn');
const tempArea = document.getElementById('tempval');
const midLayer = document.querySelector('.mid-layer');
const tempStatus = document.getElementById('tempstatus');
midLayer.classList.add('hide');
const getWeatherApi = async (event) => {
    console.log(inpVal.value);
    if(inpVal.value === '') {
        cityName.innerText = 'Search field cant be empty';
        midLayer.classList.add('hide');
    }
    else {
        try {
            let weatherUrl =`https://api.openweathermap.org/data/2.5/weather?q=${inpVal.value}&units=metric&appid=10431ccea32b8cd125f5c41619db4448`;
            const res = await fetch(weatherUrl);
            const data = await res.json();
            console.log(data);
            tempArea.innerHTML = data.main.temp;
            cityName.innerText = `${data.name},${data.sys.country}`;
            midLayer.classList.remove('hide');

            //condition to check sunny,cloud or rainy
            const tempMood = data.weather[0].main;
            console.log('status is:',tempMood);
            if(tempMood == 'Clear') {
                tempStatus.innerHTML = `<i class = 'fas fa-sun' style = 'color : #eccc68'></i>`;
            }
            else if(tempMood == 'Clouds') {
                tempStatus.innerHTML = `<i class = 'fas fa-cloud' style = 'color : #f1f2f6'></i>`;
            }
            else if(tempMood == 'Rain' || tempMood == 'Snow') {
                tempStatus.innerHTML = `<i class = 'fas fa-cloud-rain' style = 'color : #a4b0be'></i>`;
            }
            else {
                tempStatus.innerHTML = `<i class = 'fas fa-sun' style = 'color : #eccc68'></i>`;
            }
        }
        catch {
            cityName.innerText = `${inpVal.value} does not exists`;
            midLayer.classList.add('hide');
        }
        inpVal.value = '';
    }
    
}
goBtn.addEventListener('click', (e) => {
    console.log('clicked');
    getWeatherApi(e);
    e.preventDefault();
});