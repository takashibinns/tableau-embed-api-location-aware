//  Import the Tableau objects
import {
    TableauViz,
    TableauEventType,
} from 'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js';
  
//  Function to set the Lat/Lng as parameters in your Tableau dashboard
let updateDashboard = async (lat,lng) => {

    //  Get a reference to the tableau viz
    let viz = document.getElementById('tableauViz');

    //  Pause updates on the dashboard
    let pause = await viz.pauseAutomaticUpdatesAsync();

    //  Set both parameters
    let workbook = viz.workbook;
    let latParam =  await workbook.changeParameterValueAsync('Current Lat',lat);
    let lngParam = await workbook.changeParameterValueAsync('Current Lng',lng);

    //  Resume automatic updates on the dashboard
    let resume = await viz.resumeAutomaticUpdatesAsync();
}

//  Function to get the user's current location
let getLocation = () => {

    //  Get a reference to the details div
    let details = document.getElementById("details");

    //  Make sure the browser can get the user's location
    if('geolocation' in navigator) {
        // geolocation IS available, determine user's position and update tableau
        navigator.geolocation.getCurrentPosition(async (position) => {

            //  Display the lat/lng on the page
            details.innerHTML = `Latitude: ${position.coords.latitude}<br>Longitude: ${position.coords.longitude}`;
            
            //  Set parameter values in Tableau
            updateDashboard(position.coords.latitude, position.coords.longitude);
        })
    } else {
        // geolocation IS NOT available
        details.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//  Execute our code!
getLocation();