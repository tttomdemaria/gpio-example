module.exports = () => {
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

const LED1 = new Gpio(17, 'out'); //use GPIO pin 17, and specify that it is output
const LED2 = new Gpio(27, 'out'); //use GPIO pin 27, and specify that it is output
const LED3 = new Gpio(22, 'out'); //use GPIO pin 22, and specify that it is output

let count = 0
let activeLED;

var blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms


function blinkLED() { //function to start blinking
    switch ((count%3)+1){
        case 1:
            activeLED = LED1
            break;
        case 2:
            activeLED = LED2
            break;
        case 3:
            activeLED = LED3
            break;
    }
    console.log(count%3+1);
    if (activeLED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
        activeLED.writeSync(1); //set pin state to 1 (turn LED on)
    } 
    else {
        activeLED.writeSync(0); //set pin state to 0 (turn LED off)
    }

    count++;
}

function endBlink() { //function to stop blinking
  clearInterval(blinkInterval); // Stop blink intervals
  activeLED.writeSync(0); // Turn LED off
  activeLED.unexport(); // Unexport GPIO to free resources
}

setTimeout(endBlink, 10000); //stop blinking after 5 seconds

}
