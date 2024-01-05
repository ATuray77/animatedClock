// //Get currentPosition()
// function curSuccess(pos) {
//     const coords = pos.coords;

//     console.log(`Latitude: ${coords.latitude}`);
//     console.log(`Longitude: ${coords.longitude}`);
//     console.log(`Accuracy: ${coords.accuracy} meters`);
// }

// function curError() {
//     console.log(`error: ${error.code} - ${error.message}`);
// }

// const curOptions = {
//     enableHIghAccuracy: true, //use gps if available
//     timeout: 5000, //time to wait to stop trying for location
//     maximumAge: 0 //do not use a cached position
// };

// navigator.geolocation.getCurrentPosition(curSuccess, curError, curOptions);


// //Get watchPosition()

// const target = {
//     latitude: 38.7468447,
//     longitude: -77.5338283
// }

// function watchSuccess(pos) {
//     const coords = pos.coords;
//     console.log(coords)

//     if (target.latitude === coords.latitude && target.longitude === coords.longitude) {
//         console.log('You have reached your destination!');
//         navigator.geolocation.clearWatch(id);
//     }

// }

// function watchError() {
//     console.log(`error: ${error.code} - ${error.message}`);
// }

// const watchOptions = {
//     enableHIghAccuracy: true, //use gps if available
//     timeout: 5000, //time to wait to stop trying for location
//     maximumAge: 0 //do not use a cached position
// };

// const id = navigator.geolocation.getCurrentPosition(watchSuccess, watchError, watchOptions);


// const map = L.map('map').setView([0, 0 ], 2);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     //maxZoom: 19,
//     attribution: 
//     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// const marker = L.marker([0, 0]).addTo(map);

// navigator.geolocation.getCurrentPosition(function(pos) {
//     console.log(pos)
//     const lat = pos.coords.latitude
//     const lng = pos.coords.longitude
    

//     marker.setLatLng([lat, lng]).update();
//     map.setView([lat, lng], 15)

//     marker.bindPopup("<b>Hello world!</b><br>I am divine.").openPopup();
// })


// circle.bindPopup("I am a circle.").openPopup();
// polygon.bindPopup("I am a polygon.");

// const canvas = document.getElementById('my-canvas');

// const ctx = canvas.getContext('2d')

// //draw rectangle
// ctx.fillStyle = 'yellow';
// ctx.fillRect(10, 10, 100, 100);

// //draw circle
// ctx.fillStyle = 'green'
// ctx.arc(200, 200, 150, 0, Math.PI * 2);
// ctx.fill();

// //drawing lines
// ctx.beginPath();
// ctx.strokeStyle = 'red';
// ctx.lineWidth = 10;
// ctx.moveTo(10, 10);
// ctx.lineTo(200, 200);
// ctx.stroke();

// //draw text
// ctx.font = '20px Arial'
// ctx.lineWidth = 1.5;
// ctx.fillStyle = 'blue'
// ctx.fillText('Hello World', 30, 28, 80)
// ctx.strokeText('I am divine', 30, 390, 80)

// //draw image
// const image = document.querySelector('img');
// image.style.display = 'none'; 

// image.addEventListener('load', () => {
//     ctx.drawImage(image, 200, 200, 100, 100)
// })

// const image = document.querySelector('img')

// let start;
// let done = false;

// function step(timestamp) {
//     if (start === undefined) {
//         start = timestamp;
//     }

//     const elapsed = timestamp - start
    
//     if (elapsed > 5000) {
//         done = true;
//     }

//     if (done) {
//         return;
//     }

//     image.style.transform = `translateY(${elapsed /20}px) rotate(${elapsed / 20}deg)`;

//     requestAnimationFrame(step)
// }

// requestAnimationFrame(step);

//bringing all the needed inputs
const faceColor = document.getElementById('face-color');
const borderColor = document.getElementById('border-color');
const lineColor = document.getElementById('line-color');
const largeHandColor = document.getElementById('large-hand-color');
const secondHandColor = document.getElementById('second-hand-color');

function clock(){
const now = new Date();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')

//Setup Canvas
ctx.save(); //save the default state
ctx.clearRect(0, 0, 500, 500); //clears the canvas
ctx.translate(150, 150); //put the clock(0, 0) in the middle of the canvas
ctx.rotate(-Math.PI / 2) //rotate clock -90deg. If not the clock will act in a weird rotation

//set default styles
ctx.strokeStyle = 'white'; //line colors
ctx.fillStyle = 'grey';  //color of the face
ctx.lineWidth = 5; //size of the line
ctx.lineCap = 'round'  //makes the clock hands rounded

//draw clock face/border
ctx.save();
ctx.beginPath(); //calls this before making any changes to canvas
ctx.lineWidth = 14; //changes the line width
ctx.strokeStyle = borderColor.value; //changes the line colors only here
ctx.fillStyle = faceColor.value; //changes the face color dynamically
ctx.arc(0, 0, 140, 0, Math.PI * 2, true); // formats the circle
ctx.stroke(); //call stroke() to dray anything on canvas
ctx.fill(); // call fill to fill up the clock face
ctx.restore();

//Draw hour marks/lines
ctx.save();
ctx.strokeStyle = lineColor.value; //changes the hour marks dynamically
ctx.lineWidth = 4;
for (let i = 0; i < 12; i++) {
ctx.beginPath(); // to initiate the drawing 
ctx.rotate(Math.PI / 6) // gives us 12 hour marks or hands
ctx.moveTo(100, 0); //begin to draw
ctx.lineTo(120, 0);  //drawing ends here. Rotate makes this possible
ctx.stroke();  
}
ctx.restore();

//Draw minutes lines or tick marks
ctx.strokeStyle = lineColor.value; //changes the line colors dynamically
ctx.save();
for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {  //removes additional marks off of the hour hands
        ctx.beginPath();
     
    ctx.moveTo(117, 0);//gives us shorter lines
    ctx.lineTo(120, 0) 
    ctx.stroke();  //always execute the drawing
    }
    ctx.rotate(Math.PI / 30)
}
ctx.restore();

//Get current time
const hr = now.getHours() % 12; //gives the current time in 12hr format
const min = now.getMinutes();
const sec = now.getSeconds();

//console.log(`${hr}:${min}:${sec}`)

//Draw hour hand
ctx.save();
ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec);// targets wherever the hour hand is
ctx.strokeStyle = largeHandColor.value; //changes the hour hand color
ctx.lineWidth = 14; //changes the line width
ctx.beginPath(); // begin executing 
ctx.moveTo(-20, 0); //line begins at -20 of x axis and 80 of y-axis
ctx.lineTo(80, 0);
ctx.stroke();
ctx.restore(); //

//Draw minute hand
ctx.save();
ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec); //positioning for the minutes
ctx.strokeStyle = largeHandColor.value;
ctx.lineWidth = 10;
ctx.beginPath();
ctx.moveTo(-28, 0);
ctx.lineTo(112, 0);
ctx.stroke();
ctx.restore();

//Draw sec hand
ctx.save();
ctx.rotate((sec * Math.PI / 30));
ctx.strokeStyle = secondHandColor.value;
ctx.fillStyle = secondHandColor.value;
ctx.lineWidth = 6;
ctx.beginPath();
ctx.moveTo(-30, 0);
ctx.lineTo(100, 0);
ctx.stroke();
ctx.beginPath();//begins to draw the small circle
ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
ctx.fill();
ctx.restore();

ctx.restore(); //restores the default state

requestAnimationFrame(clock); //animate the clock
}

requestAnimationFrame(clock); //this keeps it going permanently
