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

        document.querySelector('#address').innerHTML = address;
        document.querySelector('#lat').innerHTML = lat;
        document.querySelector('#lng').innerHTML = lng;

        requestWeatherData(placeId, name, address, lat, lng);
    });
}
function requestWeatherData(placeId, name, address, lat, lng) {
    axios
        .get(`/weather/${placeId}/${name}/${address}/${lat}/${lng}`)
        .then((res) => {
            showWeatherInfo('.infobox li span', res.data);
        });
}
function showWeatherInfo(divSelector, data) {
    let items = document.querySelectorAll(divSelector);
    items.forEach((item) => {
        item.innerHTML = data[item.id];
    });
}
function submitNewLocation(locationData) {
    axios.post(`/location/add`, locationData)
        .then((res) => {
            console.log("Req:", res.data);
        })
}

autoComplete(document.querySelector('#name'));

document.querySelectorAll('.action').forEach(function(element) {
    element.addEventListener("click", function(e) {
        if(this.dataset.action === "add") {
            const locationData = {
                placeId: this.parentNode.querySelector('#placeId').innerText,
                name: this.parentNode.querySelector('#name').innerText,
                address: this.parentNode.querySelector('#address').innerText,
                lat: this.parentNode.querySelector('#lat').innerText,
                lng: this.parentNode.querySelector('#lng').innerText,
            }
            submitNewLocation(locationData);
        } else {
            console.log('Remove button');
        }
    });
});
















////
