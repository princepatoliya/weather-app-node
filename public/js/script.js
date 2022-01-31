console.log("client side js running");

const weatherForm = document.querySelector('.weather-form');
const searchAddress = document.querySelector('.search-address');
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');

msg1.textContent = "Loading...";

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getWeatherData(searchAddress.value);
});

function getWeatherData(address){
    fetch(`/weather?address=${address}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                // console.log(data);
                msg1.textContent = data.error;
            }
            else{
                msg1.textContent = data.temp_info;
                // console.log("latitude:", data.location);
                // console.log("latitude:", data.latitude);
                // console.log("latitude:", data.longitude);
            }
        })
    });
}

