//SELECTORS
const table = document.getElementById('table');

class cityCreator {
    constructor(name, country, weather, temp, icon) {
        this.name = name;
        this.country = country;
        this.weather = weather;
        this.temp = temp;
        this.icon = icon;
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
            let country = getName(countries, data.list[i].sys.country);
            let temp = data.list[i].main.temp;
            let weather = data.list[i].weather[0].description;
            let icon = data.list[i].weather[0].icon;

            let obj = new cityCreator(name, country, temp, weather, icon);
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
            if (key !== 'icon'){
                let newCell = document.createElement('td');
                newRow.appendChild(newCell);
                newCell.innerHTML = `${value}`;
            }
        }
        let newCell = document.createElement('td');
        let iconDiv = document.createElement('div');
        let newIcon = document.createElement('img');
        let imgSrc = `http://openweathermap.org/img/w/${arr[i].icon}.png`;
        newIcon.src = imgSrc;
        newRow.appendChild(newCell);
        newCell.appendChild(iconDiv);
        iconDiv.appendChild(newIcon);
    }
}

function getName(obj, countryId) {   //uses countries object for full name of country
    return (obj[countryId]);
}


