//SELECTORS
const table = document.getElementById('table');

class cityCreator {
    constructor(name, country, weather, temp) {
        this.name = name;
        this.country = country;
        this.weather = weather;
        this.temp = temp;
    }
}

const citiesArray = [];

//FETCH API
const URL = "https://api.openweathermap.org/data/2.5/group?id=3172394,3128760,3117735,588409,261779&units=metric&appid=2820d5bd8091b7e5e561954c1376f240";

fetch(URL)

    .then(function (response) {
        if (response.ok)
            return response.json()
        else
            return Promise.reject("Failed!")
    })

    .then(function (data) {

        for (let i = 0; i < data.list.length; i++) {

            let name = data.list[i].name;
            let country = data.list[i].sys.country;
            let weather = data.list[i].weather[0].description;
            let temp = data.list[i].main.temp;

            let obj = new cityCreator(name, country, weather, temp);
            citiesArray.push(obj);
        }
        weatherTable(citiesArray);
        return
    })

    .catch(function (err) {
        console.log("Something went wrong: " + err)
    })


// FUNCTIONS

function weatherTable(arr) {
    for (let i = 0; i < arr.length; i++) {
        let newRow = document.createElement('tr');   
        table.appendChild(newRow);
        for (const [key, value] of Object.entries(arr[i])) {
            console.log(`${value}`);
            let newCell = document.createElement('td');
            newRow.appendChild(newCell);
            newCell.innerHTML = `${value}`;
        }
    }
}




// OLD CODE TO GET WEATHER OF CITY

/* 
            const description = data.weather[0].description;
            const innerText = `🌞 Today the weather forecast 🌡 in ${data.name} is ${description}`
            document.querySelector("body > h1").innerHTML = innerText;
        
            const imgSrc = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;                      
            document.querySelector("body > img").src = imgSrc;
 */