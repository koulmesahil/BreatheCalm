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
let bubbleRadius = 0;
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
  
    // Reset start time for both animations
    startTime = millis(); 
  

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
  
    // Drawing the square and point animation
    stroke(255);
    strokeWeight(3);
    fill(255, 182, 193, 100);  // Light Pink (pastel)
    rectMode(CENTER);
    rect(centerX, centerY, currentSize, currentSize);
  
    // Display text based on the phase
    textSize(30);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255); // Black text
    if (phase === 0) {
      text("Breathe In", centerX, centerY);
    } else if (phase === 1) {
      text("Hold", centerX, centerY);
    } else if (phase === 2) {
      text("Breathe Out", centerX, centerY);
    } else if (phase === 3) {
      text("Hold", centerX, centerY);
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
  
    noStroke();
    fill(255);
    ellipse(x, y, 15);
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
    // Check if the mouse is over any letter
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        let x = (i + 0.5) * spacing;
        let y = (j + 0.5) * spacing;
  
        // Calculate distance between mouse and letter position
        let distance = dist(mouseX, mouseY, x, y);
  
        // If clicked on the letter, make it rotate quickly
        if (distance < spacing / 2) {
          let index = i * gridSize + j;
  
          // Set a new target angle with a fast spin
          targetAngles[index] = angles[index] + random([360, 720]); // Fast rotation
        }
      }
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

    // Display breathing instructions (text displayed in the center of the canvas)
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text(breathingIn ? "Breathe in" : "Breathe out", bubbleCenterX, bubbleCenterY + verticalMovement);
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
        bubbleRadius = map(elapsedTime, 0, 4000, minBubbleRadius, maxBubbleRadius);
        verticalMovement = map(elapsedTime, 0, 4000, 0, -20);
        if (elapsedTime > 4000) {
            breathingIn = false;
            startTime = millis(); // Reset the start time
        }
    } 
    // Breathing Out
    else {
        bubbleRadius = map(elapsedTime, 0, 7000, maxBubbleRadius, minBubbleRadius);
        verticalMovement = map(elapsedTime, 0, 7000, -20, 0);
        if (elapsedTime > 7000) {
            breathingIn = true;
            startTime = millis(); // Reset the start time
        }
    }

    // Draw the bubble (with a soft pink color)
    fill(255, 200, 200, 100);
    noStroke();
    ellipse(bubbleCenterX, bubbleCenterY + verticalMovement, bubbleRadius * 2);

    // Display breathing instructions (text displayed in the center of the canvas)
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text(breathingIn ? "Breathe in" : "Breathe out", bubbleCenterX, bubbleCenterY + verticalMovement);
}










function animateBreathingBubblethree() {
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
      t = map(currentTime, 0, breathingTime * 1000, 1, 1.5);  // Expanding
    } else if (phase === 1) {
      t = 1.5;  // Holding at max size
    } else if (phase === 2) {
      t = map(currentTime, (breathingTime + holdTime) * 1000, (2 * breathingTime + holdTime) * 1000, 1.5, 1);  // Shrinking
    } else {
      t = 1;  // Holding at min size
    }
  
    let currentSize = bubbleRadius * t;  // Calculate the current size of the bubble
  
    // Drawing the bubble (circle)
    stroke(255);
    strokeWeight(3);
    fill(255, 182, 193, 100);  // Light Pink (pastel)
    ellipse(centerX, centerY, currentSize, currentSize);  // Draw the circle instead of the square
  
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
  
    // Point movement logic (following the perimeter of the circle)
    let travelTime = 6000;  // Total time for one loop around the circle
    let progress = (currentTime % travelTime) / travelTime;  // Progress as a fraction
    let perimeter = Math.PI * currentSize;  // Calculate the perimeter of the circle
    let distance = progress * perimeter;  // Distance covered by the point
    let angle = map(distance, 0, perimeter, 0, TWO_PI);  // Convert distance to angle around the circle
  
    // Calculate point's x and y position on the circle perimeter
    let x = centerX + cos(angle) * (currentSize / 2);  // Calculate x position based on angle
    let y = centerY + sin(angle) * (currentSize / 2);  // Calculate y position based on angle
  
    noStroke();
    fill(255);  // White color for the point
    ellipse(x, y, 15);  // Draw the point on the circle perimeter
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
let breatheInTime = 4; // Breathe In duration
//let holdTime = 2;      // Hold duration
let breatheOutTime = 6; // Breathe Out duration

// Calculate the total cycle duration
//let totalDuration = (breatheInTime + holdTime + breatheOutTime + holdTime) * 1000;

// Breathing bubble animation function
function animateBreathingBubblefour() {
  let elapsedTime = millis() - startTime; // Time elapsed since animation started
  let currentTime = elapsedTime % totalDuration; // Current time within the cycle

  // Determine the phase of the breathing cycle
  let phase;
  if (currentTime < breatheInTime * 1000) {
    phase = 0; // Expanding (Breathe In)
  } else if (currentTime < (breatheInTime + holdTime) * 1000) {
    phase = 1; // Holding at max size
  } else if (currentTime < (breatheInTime + holdTime + breatheOutTime) * 1000) {
    phase = 2; // Shrinking (Breathe Out)
  } else {
    phase = 3; // Holding at min size
  }

  // Map the bubble size based on the phase
  let t = 1; // Default size multiplier
  if (phase === 0) {
    t = map(currentTime, 0, breatheInTime * 1000, 1, 1.5); // Expanding
  } else if (phase === 1) {
    t = 1.5; // Holding at max size
  } else if (phase === 2) {
    t = map(
      currentTime,
      (breatheInTime + holdTime) * 1000,
      (breatheInTime + holdTime + breatheOutTime) * 1000,
      1.5,
      1
    ); // Shrinking
  } else if (phase === 3) {
    t = 1; // Holding at min size
  }

  let currentSize = bubbleRadius * t; // Calculate bubble size

  // Draw the bubble only if the outline is visible
  if (isOutlineVisible) {
    stroke(255);
    strokeWeight(3);
    fill(255, 182, 193, 100); // Light Pink
  } else {
    noFill();
    fill(255, 182, 193, 100); // Light Pink
  }
  ellipse(centerX, centerY, currentSize, currentSize); // Draw the bubble
    
  
  if (isInstructionsVisible) {

  // Display breathing phase text
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
  
  

  // Simple point movement around the bubble
  if (isOutlineVisible) {
    let angle = map(currentTime % totalDuration, 0, totalDuration, 0, TWO_PI); // Angle progression
    let x = centerX + cos(angle) * (currentSize / 2); // x position
    let y = centerY + sin(angle) * (currentSize / 2); // y position

    fill(255); // White color for the point
    ellipse(x, y, 15); // Draw the point
  }
}
