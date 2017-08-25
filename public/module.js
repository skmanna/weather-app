function autoComplete(input, latDisplay, lngDisplay) {
    if(!input) {
        return;
    }
    const dropdown = new google.maps.places.Autocomplete(input);
    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        latDisplay.innerHTML = place.geometry.location.lat();
        lngDisplay.innerHTML = place.geometry.location.lng();
        // console.log(`ajax call here ${latDisplay.innerHTML}/${lngDisplay.innerHTML}`);
        //console.log(axios);
        axios
            .get(`/weather/get/${latDisplay.innerHTML}/${lngDisplay.innerHTML}`)
            .then((res) => {
                console.log(res);
                let items = document.querySelectorAll('.infobox li span');
                items.forEach((item) => {
                    item.innerHTML = res.data[item.id];
                });
            });

    });
    input.addEventListener('keydown', (e) => {
        if(e.keyCode === 13) {
            e.preventDefault();
            // console.log(`ajax call here ${document.querySelector('#lat').innerHTML}, ${lngDisplay.innerHTML}`);
        }
    });
}
autoComplete(document.querySelector('#address'), document.querySelector('#lat'), document.querySelector('#lng'));
