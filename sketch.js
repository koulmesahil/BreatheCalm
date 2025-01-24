// Variable to track the current animation state
let bgColorP5;
let gridSizeX, gridSizeY; // Separate grid sizes for rows and columns
let letters = [];
let angles = [];
let targetAngles = [];
let letterColorsP5 = [];
let spacingX, spacingY;
let button;
let falling = false;
let yOffsets = [];
let fallSpeeds = [];
let xOffsets = [];
let bubbleRadius ;
let breathingIn = true;
let breathStartTime;
let bubbleCenterX, bubbleCenterY;
let timerStartTime;
let timerRunning = false; // Variable to track if the timer is running
let timerDelayStarted = false; // Flag to track if timer delay has started
let timerDelayStartTime; // Time when the 6-second delay started
let refreshButton;
let customLetters = ["|","B", "R", "E", "A", "T", "H", "W", "O", "R", "K","|","|","B", "R", "E", "A", "T", "H", "W", "O", "R", "K","|","|","B", "R", "E", "A", "T", "H", "W", "O", "R", "K","|","|","B", "R", "E", "A", "T", "H", "W", "O", "R", "K","|","|","B", "R", "E", "A", "T", "H", "W", "O", "R", "K","|","|","B", "R", "E", "A", "T", "H", "W", "O", "R", "K","|"];
// Select the "Change Colors" button

// Define a background color or other properties for your home screen
//slet bgColorP5 = color(255, 82, 113); // White background for initial state
let startTime = 0; // Global start time


// variables for breathing box animaiton 

let squareSize = 200; // Initial square size
let centerX, centerY; // Center of the canvas
let phase = 0; // Tracks the animation phase
let breathingTime = 4; // Time for expanding/shrinking in seconds



let holdTime = 4; // Time for holding size in seconds






let cycleTime = (breathingTime + holdTime) * 2; // Total cycle time




let totalDuration = cycleTime * 1000; // Total duration in milliseconds





let pointSpeed = (2 * (squareSize + 10)) / (breathingTime * 60); // Point speed
let timeElapsed = 0;

// variables for breathing box animaiton 

// variables for the homescreenanimation

let gridSize;  // This will be calculated based on screen size
let letterColors = [];
let spacing;

let currentAnimation = 'homeScreenAnimation'; // Initial animation state

//variables for the bubblel animation already exist above 
let svgIcon;
let icon;
let lungicon;
let noseiconexhale;

function preload() {
    // Load the PNG icon
    icon = loadImage('assets/images/noseicon.png', function() {
      // Invert the colors after the image is loaded
      icon.loadPixels();
      for (let i = 0; i < icon.pixels.length; i += 4) {
        // Invert colors (R, G, B)
        icon.pixels[i] = 255 - icon.pixels[i];     // Red
        icon.pixels[i + 1] = 255 - icon.pixels[i + 1]; // Green
        icon.pixels[i + 2] = 255 - icon.pixels[i + 2]; // Blue
      }
      icon.updatePixels();
  
      // Resize the image to 50x50
      //icon.resize(80, 80);  // Resize the icon to 50x50
    });

    noseiconexhale = loadImage('assets/images/noseiconexhale.png', function() {
      // Invert the colors after the image is loaded
      noseiconexhale.loadPixels();
      for (let i = 0; i < noseiconexhale.pixels.length; i += 4) {
        // Invert colors (R, G, B)
        noseiconexhale.pixels[i] = 255 - noseiconexhale.pixels[i];     // Red
        noseiconexhale.pixels[i + 1] = 255 - noseiconexhale.pixels[i + 1]; // Green
        noseiconexhale.pixels[i + 2] = 255 - noseiconexhale.pixels[i + 2]; // Blue
      }
      noseiconexhale.updatePixels();
  
      // Resize the image to 50x50
      //icon.resize(80, 80);  // Resize the icon to 50x50
    });

    svgIcon = loadImage('assets/images/mouthiconcheck.png', function() {
        // Invert the colors after the image is loaded
        svgIcon.loadPixels();
        for (let i = 0; i < svgIcon.pixels.length; i += 4) {
          // Invert colors (R, G, B)
          svgIcon.pixels[i] = 255 - svgIcon.pixels[i];     // Red
          svgIcon.pixels[i + 1] = 255 - svgIcon.pixels[i + 1]; // Green
          svgIcon.pixels[i + 2] = 255 - svgIcon.pixels[i + 2]; // Blue
        }
        svgIcon.updatePixels();
    
        // Resize the image to 50x50
        //icon.resize(80, 80);  // Resize the icon to 50x50
      }); 
      lungicon = loadImage('assets/images/lungicon2.png', function() {
        // Invert the colors after the image is loaded
        lungicon.loadPixels();
        for (let i = 0; i < lungicon.pixels.length; i += 4) {
          // Invert colors (R, G, B)
          lungicon.pixels[i] = 255 - lungicon.pixels[i];     // Red
          lungicon.pixels[i + 1] = 255 - lungicon.pixels[i + 1]; // Green
          lungicon.pixels[i + 2] = 255 - lungicon.pixels[i + 2]; // Blue
        }
        lungicon.updatePixels();
    
        // Resize the image to 50x50
        //icon.resize(80, 80);  // Resize the icon to 50x50
      }); 

  }


function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColorP5 = color(101, 67, 33); // Dark brownish color (earthy and calming)
  background(bgColorP5);
  centerX = width / 2;
  centerY = height / 2;
  gridSize = floor(width / 90);  // Choose a factor (e.g., 120) to control the size of the grid cells
  spacing = width / gridSize;  // Calculate spacing for the grid based on the gridSize
  bubbleCenterX = width / 2;
  bubbleCenterY = height / 2;

  // Initialize letters and angles
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let letter = random(["S", "K"]);  // Random letter "S" or "K"
      letters.push(letter);
      angles.push(0);  // Initial angle for each letter
      targetAngles.push(0);  // Target angle (90 or 180 degrees)

      // Use white and black colors for letters
      let randomColor = random([
        color(255, 255, 255),  // White (#FFFFFF)
        color(0, 0, 0)         // Black (#000000)
      ]);
      letterColors.push(randomColor);
    }
}

}

function draw() {
    background(bgColorP5);

  
    // Draw the current animation based on the state
    if (currentAnimation === 'homeScreenAnimation') {
      homeScreenAnimation();
    } else if (currentAnimation === 'boxBreathing') {
      boxBreathingAnimation(); // Box breathing animation
    } else if (currentAnimation === 'secondBreathing') {
        animateBreathingBubble(); // Second breathing animation
    } else if (currentAnimation === 'thirdBreathing') {
      animateBreathingBubbletwo();
    } else if (currentAnimation === 'fourthBreathing') {
        animateBreathingBubblethree();
    } else if (currentAnimation === 'fifthBreathing') {
      animateBreathingBubblefour();
    }
    
    
    
  }

function startAnimation(animationName) {
    currentAnimation = animationName;
    startTime = millis(); 


}




function homeScreenAnimation() {
  background(bgColorP5);

  // Update and draw each letter
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let x = (i + 0.5) * spacing;
      let y = (j + 0.5) * spacing;

      let index = i * gridSize + j;
      let letter = letters[index];
      let letterColor = letterColors[index];

      // Smoothly rotate letters to their target angle
      if (angles[index] !== targetAngles[index]) {
        let step = 0.1 * (targetAngles[index] - angles[index]);
        angles[index] += step;
      }

      // Change target angle every 2 seconds
      if (frameCount % 90 === 0) {
        targetAngles[index] = random([90, 180]);
      }

      // Draw the letter with smooth rotation and color
      // Draw the letter with smooth rotation and color
      push();
      translate(x, y);  // Position the letter
      rotate(radians(angles[index]));  // Apply the rotation based on its own center
      fill(letterColor);

// Center the text and set its size
      textAlign(CENTER, CENTER);  // Align the text to be centered
      textSize(30);  // Adjust the text size as needed

// Draw the letter
      text(letter, 0, 0);  // The text will be drawn centered at (0, 0)

      pop();

    }
  }
}

function mousePressed() {
  // Loop through all letters to check if the mouse is over any letter
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let x = (i + 0.5) * spacing; // Center x-coordinate of the letter
      let y = (j + 0.5) * spacing; // Center y-coordinate of the letter

      // Calculate the distance between the mouse and the letter's center
      let distance = dist(mouseX, mouseY, x, y);

      // Check if the mouse click is within the letter's area
      if (distance < spacing / 2) {
        let clickedIndex = i * gridSize + j; // Index of the clicked letter

        // Trigger the virus-like spread rotation starting from this letter
        triggerRotationSpread(i, j);
        return; // Exit the function once the clicked letter is found
      }
    }
  }
}

function triggerRotationSpread(startRow, startCol) {
  // Loop through all the letters
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let index = i * gridSize + j;

      // Calculate Manhattan distance from the starting letter
      let distance = abs(i - startRow) + abs(j - startCol);

      // Delay the rotation based on the distance to create a spreading effect
      setTimeout(() => {
        // Set a new target angle with a fast spin
        targetAngles[index] = angles[index] + random([360, 720]); // Fast rotation
      }, distance * 100); // Adjust the spread speed with the multiplier
    }
  }
}



function boxBreathingAnimation() {
  let elapsedTime = millis() - startTime; // Time elapsed since animation started
  let currentTime = elapsedTime % totalDuration;

  // Determine the current phase of the breathing cycle
  if (currentTime < breathingTime * 1000) {
      phase = 0; // Expanding
  } else if (currentTime < (breathingTime + holdTime) * 1000) {
      phase = 1; // Holding at maximum size
  } else if (currentTime < (2 * breathingTime + holdTime) * 1000) {
      phase = 2; // Shrinking
  } else {
      phase = 3; // Holding at minimum size
  }

  let t;
  if (phase === 0) {
      t = map(currentTime, 0, breathingTime * 1000, 1, 1.5);
  } else if (phase === 1) {
      t = 1.5;
  } else if (phase === 2) {
      t = map(currentTime, (breathingTime + holdTime) * 1000, (2 * breathingTime + holdTime) * 1000, 1.5, 1);
  } else {
      t = 1;
  }

  let currentSize = squareSize * t;

  // Draw the square with or without outline
  if (isOutlineVisible) {
      stroke(255);
      strokeWeight(3);
      fill(255, 182, 193, 100);  // Light Pink (pastel)
  } else {
      noStroke();
      fill(255, 182, 193, 100);  // Light Pink (pastel)
  }
  rectMode(CENTER);
  rect(centerX, centerY, currentSize, currentSize);

  // Display text based on the phase, only if instructions are visible
  if (isInstructionsVisible) {
      textSize(30);
      textAlign(CENTER, CENTER);
      noStroke();
      fill(255); // White text
      if (phase === 0) {
          text("Breathe In", centerX, centerY);
      } else if (phase === 1) {
          text("Hold", centerX, centerY);
      } else if (phase === 2) {
          text("Breathe Out", centerX, centerY);
      } else if (phase === 3) {
          text("Hold", centerX, centerY);
      }
  }

  // Point movement logic
  let travelTime = 4000;
  let progress = (currentTime % travelTime) / travelTime;
  let perimeter = currentSize * 4;
  let distance = progress * perimeter;
  let x, y;

  if (distance < currentSize) {
      x = centerX - currentSize / 2 + distance;
      y = centerY - currentSize / 2;
  } else if (distance < currentSize * 2) {
      x = centerX + currentSize / 2;
      y = centerY - currentSize / 2 + (distance - currentSize);
  } else if (distance < currentSize * 3) {
      x = centerX + currentSize / 2 - (distance - currentSize * 2);
      y = centerY + currentSize / 2;
  } else {
      x = centerX - currentSize / 2;
      y = centerY + currentSize / 2 - (distance - currentSize * 3);
  }
  
  if (isOutlineVisible) {

  noStroke();
  fill(255);
  ellipse(x, y, 15);
  }
}









function animateBreathingBubble() {
  let elapsedTime = millis() - startTime;
  let maxBubbleRadius = min(width, height) / 3;
  let minBubbleRadius = maxBubbleRadius / 2;

  // Reset bubble radius and movement at the start of each animation cycle
  if (elapsedTime === 0) {
      bubbleRadius = minBubbleRadius;
      verticalMovement = 0;
  }

  // Breathing In
  if (breathingIn) {
      bubbleRadius = map(elapsedTime, 0, 3000, minBubbleRadius, maxBubbleRadius);
      verticalMovement = map(elapsedTime, 0, 3000, 0, -20);
      if (elapsedTime > 3000) {
          breathingIn = false;
          startTime = millis(); // Reset the start time
      }
  } 
  // Breathing Out
  else {
      bubbleRadius = map(elapsedTime, 0, 5000, maxBubbleRadius, minBubbleRadius);
      verticalMovement = map(elapsedTime, 0, 5000, -20, 0);
      if (elapsedTime > 5000) {
          breathingIn = true;
          startTime = millis(); // Reset the start time
      }
  }

  // Draw the bubble (with a soft pink color)
  fill(255, 200, 200, 100);
  noStroke();
  ellipse(bubbleCenterX, bubbleCenterY + verticalMovement, bubbleRadius * 2);
  if (isInstructionsVisible) {

  // Display breathing instructions (text displayed in the center of the canvas)
  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);
  text(breathingIn ? "Breathe in" : "Breathe out", bubbleCenterX, bubbleCenterY + verticalMovement);
  }
}

function animateBreathingBubbletwo() {
    let elapsedTime = millis() - startTime;
    let maxBubbleRadius = min(width, height) / 3;
    let minBubbleRadius = maxBubbleRadius / 2;

    // Reset bubble radius and movement at the start of each animation cycle
    if (elapsedTime === 0) {
        bubbleRadius = minBubbleRadius;
        verticalMovement = 0;
    }

    // Breathing In
    if (breathingIn) {
        bubbleRadius = map(elapsedTime, 0, 5000, minBubbleRadius, maxBubbleRadius);
        verticalMovement = map(elapsedTime, 0, 5000, 0, -20);
        if (elapsedTime > 4000) {
            breathingIn = false;
            startTime = millis(); // Reset the start time
        }
    } 
    // Breathing Out
    else {
        bubbleRadius = map(elapsedTime, 0, 5000, maxBubbleRadius, minBubbleRadius);
        verticalMovement = map(elapsedTime, 0, 5000, -20, 0);
        if (elapsedTime > 7000) {
            breathingIn = true;
            startTime = millis(); // Reset the start time
        }
    }

    // Draw the bubble (with a soft pink color)
    fill(255, 200, 200, 100);
    noStroke();
    ellipse(bubbleCenterX, bubbleCenterY + verticalMovement, bubbleRadius * 2);
    
    
    if (isInstructionsVisible) {

    // Display breathing instructions (text displayed in the center of the canvas)
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    image(noseiconexhale,centerX - 40, centerY - 40 , 80,80)
    text(breathingIn ? "Breathe in" : "Breathe out", bubbleCenterX, bubbleCenterY + verticalMovement+80);
  }
}






breathingtime478=4


function animateBreathingBubblethreeoldversion() {
    let elapsedTime = millis() - startTime; // Time elapsed since animation started
    let currentTime = elapsedTime % totalDuration;
    let maxBubbleRadius = min(width, height) / 3;
    let minBubbleRadius = maxBubbleRadius / 2;
    let bubbleRadius = minBubbleRadius;


    // Determine the current phase of the breathing cycle
    if (currentTime < breathingTime * 1000) {
      phase = 0; // Expanding
    } else if (currentTime < (breathingTime + holdTime) * 1000) {
      phase = 1; // Holding at maximum size
    } else if (currentTime < (2 * breathingTime + holdTime) * 1000) {
      phase = 2; // Shrinking
    } else {
      phase = 3; // Holding at minimum size
    }
  
    let t;
    if (phase === 0) {
      t = map(currentTime, 0, breathingTime * 1000, 1, 1.5);  // Expanding
    } else if (phase === 1) {
      t = 1.5;  // Holding at max size
    } else if (phase === 2) {
      t = map(currentTime, (breathingTime + holdTime) * 1000, (2 * breathingTime + holdTime) * 1000, 1.5, 1);  // Shrinking
    } else {
      t = 1;  // Holding at min size
    }
  
    let currentSize = bubbleRadius * t;  // Calculate the current size of the bubble
  

    if(isOutlineVisible){

    // Drawing the bubble (circle)
    stroke(255);
    strokeWeight(3);
    fill(255, 182, 193, 100);  // Light Pink (pastel)

    }else{
      noFill();
      fill(255, 182, 193, 100);  // Light Pink (pastel)
    
    }

    ellipse(centerX, centerY, currentSize, currentSize); // Draw the bubble




    if (isInstructionsVisible) {


    // Display text based on the phase
    textSize(30);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255);  // White text
    if (phase === 0) {
      text("Breathe In", centerX, centerY);
    } else if (phase === 1) {
      text("Hold", centerX, centerY);
    } else if (phase === 2) {
      text("Breathe Out", centerX, centerY);
    } else if (phase === 3) {
      text("Hold", centerX, centerY);
    }
  }
    // Point movement logic (following the perimeter of the circle)
    let travelTime = 6000;  // Total time for one loop around the circle
    let progress = (currentTime % travelTime) / travelTime;  // Progress as a fraction
    let perimeter = Math.PI * currentSize;  // Calculate the perimeter of the circle
    let distance = progress * perimeter;  // Distance covered by the point
    let angle = map(distance, 0, perimeter, 0, TWO_PI);  // Convert distance to angle around the circle
  
    // Calculate point's x and y position on the circle perimeter
    let x = centerX + cos(angle) * (currentSize / 2);  // Calculate x position based on angle
    let y = centerY + sin(angle) * (currentSize / 2);  // Calculate y position based on angle
    if(isOutlineVisible){
    noStroke();
    fill(255);  // White color for the point
    ellipse(x, y, 15);  // Draw the point on the circle perimeter
    }
}


let breatheInDuration =  4;
let holdDuration1 =  7;
let breatheOutDuration =  8;
let holdDuration2  = 0;

function animateBreathingBubblethree() {
  let elapsedTime = millis() - startTime; // Time elapsed since animation started
  let cycleDuration = (breatheInDuration + holdDuration1 + breatheOutDuration + holdDuration2) * 1000; // Total duration of one cycle
  let currentCycle = Math.floor(elapsedTime / cycleDuration) + 1; // Current cycle number
  let currentTime = elapsedTime % cycleDuration; // Time within the current cycle
  let imgWidth = 80;
  let imgHeight = 80;
  let maxBubbleRadius = min(width, height) / 3;
  let minBubbleRadius = maxBubbleRadius / 2;
  let bubbleRadius = minBubbleRadius;
  // Determine the phase of the breathing cycle
  let phase;
  if (currentTime < breatheInDuration * 1000) {
    phase = 0; // Expanding (Breathe In)
  } else if (currentTime < (breatheInDuration + holdDuration1) * 1000) {
    phase = 1; // Holding at max size
  } else if (currentTime < (breatheInDuration + holdDuration1 + breatheOutDuration) * 1000) {
    phase = 2; // Shrinking (Breathe Out)
  } else {
    phase = 3; // Holding at min size
  }

  // Map the bubble size based on the phase
  let t = 2; // Default size multiplier
  if (phase === 0) {
    t = map(currentTime, 0, breatheInDuration * 1000, 2, 3); // Expanding
  } else if (phase === 1) {
    t = 3; // Holding at max size
  } else if (phase === 2) {
    t = map(
      currentTime,
      (breatheInDuration + holdDuration1) * 1000,
      (breatheInDuration + holdDuration1 + breatheOutDuration) * 1000,
      3,
      2
    ); // Shrinking
  } else if (phase === 3) {
    t = 2; // Holding at min size
  }

  let currentSize = bubbleRadius * t; // Calculate bubble size

  // Draw the bubble
  if (isOutlineVisible) {
    stroke(255);
    strokeWeight(3);
    fill(255, 182, 193, 100); // Light Pink
  } else {
    noFill();
    fill(255, 182, 193, 100); // Light Pink
  }
  ellipse(centerX, centerY, currentSize, currentSize); // Draw the bubble

  // Display breathing phase and cycle number
  if (isInstructionsVisible) {
    textSize(30);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255); // White text
    if (phase === 0) {
      text("Breathe In", centerX, centerY +70 );
      image(icon, centerX - imgWidth / 2, centerY - imgHeight / 2, imgWidth, imgHeight);
    } else if (phase === 1) {
      image(lungicon, centerX - imgWidth / 2, centerY - imgHeight / 2, imgWidth, imgHeight);

      text("Hold", centerX, centerY+70 );
    } else if (phase === 2) {
      image(svgIcon, centerX - imgWidth / 2, centerY - imgHeight / 2, imgWidth, imgHeight);

      text("Breathe Out", centerX, centerY+70 );
    } else if (phase === 3) {
      image(lungicon, centerX - imgWidth / 2, centerY - imgHeight / 2, imgWidth, imgHeight);

      text("Hold", centerX, centerY+70 );
    }

    //textSize(20);
    //text(`Cycle: ${currentCycle}`, centerX, centerY + 50);
  }

  // Simple point movement around the bubble
  if (isOutlineVisible) {
    let angle = map(currentTime, 0, cycleDuration, 0, TWO_PI); // Angle progression
    let x = centerX + cos(angle) * (currentSize / 2); // x position
    let y = centerY + sin(angle) * (currentSize / 2); // y position

    fill(255); // White color for the point
    ellipse(x, y, 15); // Draw the point
  }
}


// Global flag to toggle visibility
let isOutlineVisible = true;

let isInstructionsVisible = true;

// Function to toggle the outline visibility
function toggleOutline() {
  isOutlineVisible = !isOutlineVisible; // Toggle the flag
}

function toggleInstructions() {
    isInstructionsVisible = !isInstructionsVisible; // Toggle the flag
  }

// Breathing durations (in seconds)
//let breatheInTime = 4; // Breathe In duration
//let holdTime = 2;      // Hold duration
//let breatheOutTime = 6; // Breathe Out duration

// Calculate the total cycle duration
//let totalDuration = (breatheInTime + holdTime + breatheOutTime + holdTime) * 1000;
let breatheInTime = 2; // Breathe In time in seconds
let breatheOutTime = 6; // Breathe Out time in seconds
let totalCycles = 5; // Total number of cycles
 
// Breathing bubble animation function with specific times and cycle tracking
function animateBreathingBubblefour() {
    let elapsedTime = millis() - startTime; // Time elapsed since animation started
    let cycleDuration = (breatheInTime + holdTime1 + breatheOutTime + holdTime2) * 1000; // Total duration of one cycle
    let currentCycle = Math.floor(elapsedTime / cycleDuration) + 1; // Current cycle number
    let currentTime = elapsedTime % cycleDuration; // Time within the current cycle
    let imgWidth = 80;
    let imgHeight = 80;
    let maxBubbleRadius = min(width, height) / 3;
    let minBubbleRadius = maxBubbleRadius / 2;
    let bubbleRadius = minBubbleRadius;
    // Determine the phase of the breathing cycle
    let phase;
    if (currentTime < breatheInTime * 1000) {
      phase = 0; // Expanding (Breathe In)
    } else if (currentTime < (breatheInTime + holdTime1) * 1000) {
      phase = 1; // Holding at max size
    } else if (currentTime < (breatheInTime + holdTime1 + breatheOutTime) * 1000) {
      phase = 2; // Shrinking (Breathe Out)
    } else {
      phase = 3; // Holding at min size
    }
  
    // Map the bubble size based on the phase
    let t = 2; // Default size multiplier
    if (phase === 0) {
      t = map(currentTime, 0, breatheInTime * 1000, 2, 3); // Expanding
    } else if (phase === 1) {
      t = 3; // Holding at max size
    } else if (phase === 2) {
      t = map(
        currentTime,
        (breatheInTime + holdTime1) * 1000,
        (breatheInTime + holdTime1 + breatheOutTime) * 1000,
        3,
        2
      ); // Shrinking
    } else if (phase === 3) {
      t = 2; // Holding at min size
    }
  
    let currentSize = bubbleRadius * t; // Calculate bubble size
  
    // Draw the bubble
    if (isOutlineVisible) {
      stroke(255);
      strokeWeight(3);
      fill(255, 182, 193, 100); // Light Pink
    } else {
      noFill();
      fill(255, 182, 193, 100); // Light Pink
    }
    ellipse(centerX, centerY, currentSize, currentSize); // Draw the bubble
  
    // Display breathing phase and cycle number
    if (isInstructionsVisible) {
      textSize(30);
      textAlign(CENTER, CENTER);
      noStroke();
      fill(255); // White text
      if (phase === 0) {
        text("Breathe In", centerX, centerY +70 );
        image(icon, centerX - imgWidth / 2, centerY - imgHeight / 2, imgWidth, imgHeight);
      } else if (phase === 1) {
        image(lungicon, centerX - imgWidth / 2, centerY - imgHeight / 2, imgWidth, imgHeight);

        text("Hold", centerX, centerY+70 );
      } else if (phase === 2) {
        image(svgIcon, centerX - imgWidth / 2, centerY - imgHeight / 2, imgWidth, imgHeight);

        text("Breathe Out", centerX, centerY+70 );
      } else if (phase === 3) {
        image(lungicon, centerX - imgWidth / 2, centerY - imgHeight / 2, imgWidth, imgHeight);

        text("Hold", centerX, centerY+70 );
      }
  
      //textSize(20);
      //text(`Cycle: ${currentCycle}`, centerX, centerY + 50);
    }
  
    // Simple point movement around the bubble
    if (isOutlineVisible) {
      let angle = map(currentTime, 0, cycleDuration, 0, TWO_PI); // Angle progression
      let x = centerX + cos(angle) * (currentSize / 2); // x position
      let y = centerY + sin(angle) * (currentSize / 2); // y position
  
      fill(255); // White color for the point
      ellipse(x, y, 15); // Draw the point
    }
  }
  
  // Variables for breathing times, cycle tracking, and start time
  //let breatheInTime = 3; // Breathe In time in seconds
  let holdTime1 = 0; // Hold time after Breathe In in seconds
  //let breatheOutTime = 5; // Breathe Out time in seconds
  let holdTime2 = 0; // Hold time after Breathe Out in seconds
  //let totalCycles = 5; // Total number of cycles
  









 // Relaxing breathing bubble animation function with just breathe in and breathe out
function animateRelaxingBreathing() {
    let elapsedTime = millis() - startTime; // Time elapsed since animation started
    let cycleDuration = (breatheInTime + breatheOutTime) * 1000; // Total duration of one cycle
    let currentCycle = Math.floor(elapsedTime / cycleDuration) + 1; // Current cycle number
    let currentTime = elapsedTime % cycleDuration; // Time within the current cycle
    let imgWidth = 80;
    let imgHeight = 80;
    let maxBubbleRadius = min(width, height) / 3;
    let minBubbleRadius = maxBubbleRadius / 2;
    let bubbleRadius = minBubbleRadius;

    // Determine the phase of the breathing cycle
    let phase;
    if (currentTime < breatheInTime * 1000) {
      phase = 0; // Expanding (Breathe In)
    } else {
      phase = 1; // Shrinking (Breathe Out)
    }

    // Map the bubble size based on the phase
    let t = 2; // Default size multiplier
    if (phase === 0) {
      t = map(currentTime, 0, breatheInTime * 1000, 2, 3); // Expanding
    } else if (phase === 1) {
      t = map(
        currentTime,
        breatheInTime * 1000,
        (breatheInTime + breatheOutTime) * 1000,
        3,
        2
      ); // Shrinking
    }

    let currentSize = bubbleRadius * t; // Calculate bubble size

    // Draw the bubble
    if (isOutlineVisible) {
      stroke(255);
      strokeWeight(3);
      fill(255, 182, 193, 100); // Light Pink
    } else {
      noFill();
      fill(255, 182, 193, 100); // Light Pink
    }
    ellipse(centerX, centerY, currentSize, currentSize); // Draw the bubble

    // Display breathing phase and cycle number
    if (isInstructionsVisible) {
      textSize(30);
      textAlign(CENTER, CENTER);
      noStroke();
      fill(255); // White text
      if (phase === 0) {
        text("Breathe In", centerX, centerY + 70);
        image(icon, centerX - imgWidth / 2, centerY - imgHeight / 2, imgWidth, imgHeight);
      } else if (phase === 1) {
        image(svgIcon, centerX - imgWidth / 2, centerY - imgHeight / 2, imgWidth, imgHeight);
        text("Breathe Out", centerX, centerY + 70);
      }
    }

    // Simple point movement around the bubble
    if (isOutlineVisible) {
      let angle = map(currentTime, 0, cycleDuration, 0, TWO_PI); // Angle progression
      let x = centerX + cos(angle) * (currentSize / 2); // x position
      let y = centerY + sin(angle) * (currentSize / 2); // y position

      fill(255); // White color for the point
      ellipse(x, y, 15); // Draw the point
    }
}

// Variables for breathing times, cycle tracking, and start time
