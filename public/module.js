function autoComplete(input, addressDisplay, latDisplay, lngDisplay) {
    if(!input) {
        return;
    }
    const dropdown = new google.maps.places.Autocomplete(input);
    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();

        const placeId = place.place_id;
        const name = place.name;
        const address = place.formatted_address;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        requestWeatherData(placeId, lat, lng, name, address, "add")
            .then(infobox => {
                document.querySelector('.queryarea').appendChild(infobox);
            })
    });
}
function requestWeatherData(placeId, lat, lng, name, address, action) {
    url = `/weather/${placeId}/${lat}/${lng}/${name}/${address}`;
    return axios
        .get(url)
        .then((res) => {
            let infobox = makeInfoBox(res.data, action);
            return infobox;
        });
}
function submitNewLocation(locationData) {
    return axios.post(`/location/add`, locationData)
        .then((res) => {
            //console.log("Req:", res.data);
            return res.data;
        })
}
function makeInfoBox(data, action) {
    const elements = {
        placeId: "Place Id",
        name: "Name",
        address: "Address",
        lat: "Lat",
        lng: "Lng",
        timezone: "Time Zone",
        time: "Time",
        temperature: "Temperature",
        apparentTemperature: "Apparent temperature",
        dewPoint: "Dew Point",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        windGust: "Wind Gust",
        windBearing: "Wind Bearing",
        cloudCover: "Cloud Cover",
        pressure: "Pressure"
    };
    let infobox = document.createElement('div');
    infobox.classList.add('infobox');
    infobox.id = data.placeId;
    Object.keys(elements).forEach(key => {
        let li = document.createElement('li');
        li.innerHTML = `${elements[key]}:`;
        let span = document.createElement('span');
        span.id = `${data.placeId}__${key}`;
        span.innerHTML = `${data[key]}`;
        li.appendChild(span);
        infobox.appendChild(li);
    });
    let refreshDiv = document.createElement('div');
    refreshDiv.id = `${data.placeId}__refresh`;
    refreshDiv.classList.add('action');
    refreshDiv.setAttribute('data-action', 'refresh');
    refreshDiv.innerHTML = 'Refresh';
    refreshDiv.addEventListener("click", watchListActions);

    let actionDiv = document.createElement('div');
    actionDiv.id = `${data.placeId}__action`;
    actionDiv.classList.add('action');
    actionDiv.setAttribute('data-action', action);
    actionDiv.innerHTML = action;
    actionDiv.addEventListener("click", watchListActions);

    infobox.appendChild(refreshDiv);
    infobox.appendChild(actionDiv);

    return infobox;
}

function watchListActions(e) {
    console.log("Parent" + this.parentNode);
    if(this.dataset.action === "add") {
        const id = this.parentNode.id;
        const locationData = {
            placeId: this.parentNode.querySelector(`#${id}__placeId`).innerText,
            lat: this.parentNode.querySelector(`#${id}__lat`).innerText,
            lng: this.parentNode.querySelector(`#${id}__lng`).innerText,
            name: this.parentNode.querySelector(`#${id}__name`).innerText,
            address: this.parentNode.querySelector(`#${id}__address`).innerText,
        }
        submitNewLocation(locationData)
            .then(data => {
                console.log(data);
                document.querySelector('.queryarea').removeChild(this.parentNode);

                const {placeId, lat, lng, name, address} = data;
                requestWeatherData(placeId, lat, lng, name, address, "remove")
                    .then(infobox => {
                        document.querySelector('.watchlist').appendChild(infobox);
                    })
            })
    } else if (this.dataset.action === "refresh") {
        console.log("in refresh");
        const id = this.parentNode.id;
        requestWeatherData(
            this.parentNode.querySelector(`#${id}__placeId`).innerText,
            this.parentNode.querySelector(`#${id}__lat`).innerText,
            this.parentNode.querySelector(`#${id}__lng`).innerText,
            this.parentNode.querySelector(`#${id}__name`).innerText,
            this.parentNode.querySelector(`#${id}__address`).innerText,
            this.parentNode.querySelector(`#${id}__action`).dataset.action
        )
        .then(infobox => {
            this.parentNode.parentNode.replaceChild(infobox, this.parentNode);
        })
    } else if (this.dataset.action === "remove"){
        // console.log('Remove button');
        const id = this.parentNode.id;
        axios.delete(`/location/${this.parentNode.querySelector(`#${id}__placeId`).innerText}`)
            .then((data) => {
                document.querySelector('.watchlist').removeChild(this.parentNode);
                // this.parentNode.removeChild(this)
            })
            .catch(err => {
                console.log(`Could not remove ${this.parentNode.querySelector(`#${id}__placeId`).innerText}`);
            });
    }
}
autoComplete(document.querySelector('#name'));

document.querySelectorAll('.action').forEach(function(element) {
    element.addEventListener("click", watchListActions);
});

document.addEventListener("DOMContentLoaded", function(e) {
    console.log('document on load');
    axios.get(`/weather`)
        .then(response => {
            console.log(response.data);
            response.data.forEach((data) => {
                let infobox = makeInfoBox(data, "remove");
                document.querySelector('.watchlist').appendChild(infobox);
                // showWeatherInfo(`#${info.placeId} li span`, response.data);
            });
        });
});














////
