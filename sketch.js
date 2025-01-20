let gridSizeX, gridSizeY; // Separate grid sizes for rows and columns
let letters = [];
let angles = [];
let targetAngles = [];
let letterColorsP5 = [];
let bgColorP5;
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
let changeColorsButton = document.getElementById('changeColorsButton');

// Event listener for changing colors
changeColorsButton.addEventListener('click', function() {
  // Call a function in sketch.js to change the background color
  changeBackgroundColor();
});
// Function to change the background color
function changeBackgroundColor() {
  // Randomly change the background color
  bgColorP5 = color(random(255), random(255), random(255)); // Change to a random color
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Full-page canvas
  textFont('Trebuchet MS');
  textSize(50);
  textAlign(CENTER, CENTER);
  noStroke();
  // Calculate grid sizes based on window dimensions
  gridSizeX = floor(windowWidth / 80); // Adjust column count based on window width
  gridSizeY = floor(windowHeight / 80); // Adjust row count based on window height

  // Initialize letters, angles, and colors
  for (let i = 0; i < gridSizeX; i++) {
    for (let j = 0; j < gridSizeY; j++) {
      let letter = random(["S","K"]);
      letters.push(letter);
      angles.push(0);
      targetAngles.push(0);
      letterColorsP5.push(random([color(255), color(0)])); // White or black
      yOffsets.push(0); // Initial y-offset for falling animation
      fallSpeeds.push(random(2, 7)); // Random fall speed for each letter
      xOffsets.push(random(-2, 2)); // Random horizontal movement
    }
  }

  bgColorP5 = color(255, 84, 130); // Initial color
  spacingX = width / gridSizeX;
  spacingY = height / gridSizeY;

  // Create the meditation button and center it
  button = createButton("Start Meditation");
  let buttonWidth = 200;
  let buttonHeight = 100;

  // Center button horizontally and vertically
  button.position(width / 2 - buttonWidth / 2, height / 2 - buttonHeight / 2);
  button.size(buttonWidth, buttonHeight);
  button.style("font-family", "Georgia");
  button.style("font-size", "50px");
  button.style("background-color",bgColorP5);
  button.style("color", "white");
  button.style("border", "none");
  button.style("border-radius", "5px");
  button.mousePressed(() => {
    falling = true;
    timerDelayStartTime = millis(); // Start the 6-second delay
    timerDelayStarted = true; // Flag that the delay has started
    button.hide(); // Hide the meditation button
  });

  // Create the refresh button but hide it initially
  refreshButton = createButton("⟳");
  refreshButton.position(30, 30); // Position on the top left
  refreshButton.size(30, 30);
  refreshButton.style("font-size", "30px");
  refreshButton.style("background-color", "rgba(255, 82, 113, 0)");
  refreshButton.style("color", "white");
  refreshButton.style("border", "none");
  refreshButton.style("border-radius", "5px");
  refreshButton.hide(); // Initially hide the refresh button
  refreshButton.mousePressed(() => {
    location.reload(); // Reload the page to reset everything
  });
}

function draw() {
  background(bgColorP5);

  let allOffScreen = true; // Track if all letters have fallen off screen

  // Timer functionality
  if (timerDelayStarted) {
    let delayElapsedTime = millis() - timerDelayStartTime;
    
    if (delayElapsedTime >= 6000) { // After 6 seconds
      if (!timerRunning) {
        timerStartTime = millis(); // Start the timer
        timerRunning = true;
        refreshButton.show(); // Show the refresh button when the timer starts
      }
    }
  }

  if (timerRunning) {
    let elapsedTime = millis() - timerStartTime;
    let minutes = floor(elapsedTime / 60000);
    let seconds = floor((elapsedTime % 60000) / 1000);
    let timerText = nf(minutes, 2) + ":" + nf(seconds, 2);

    // Draw the timer icon and the time
 // Timer icon centered horizontally at bottom

    drawClock(width / 2, height - 90 / 2 - 20, 30); // Draw clock at the bottom center
    textSize(30);
    textStyle(NORMAL);
    text(timerText, width / 2, height - 30);
  }

  for (let i = 0; i < gridSizeX; i++) {
    for (let j = 0; j < gridSizeY; j++) {
      let x = (i + 0.5) * spacingX;
      let y = (j + 0.5) * spacingY;

      let index = i * gridSizeY + j;
      let letter = letters[index];
      let letterColor = letterColorsP5[index];

      if (falling) {
        yOffsets[index] += fallSpeeds[index]; // Increment y-offset by random fall speed
        x += xOffsets[index]; // Add slight horizontal variation

        // If any letter is still visible, set allOffScreen to false
        if (y + yOffsets[index] < height + 50) { // Add a small buffer
          allOffScreen = false;
        }
      } else if (angles[index] !== targetAngles[index]) {
        let step = 0.1 * (targetAngles[index] - angles[index]);
        angles[index] += step;
      }

      if (!falling && frameCount % 90 === 0) {
        targetAngles[index] = random([90, 180]);
      }

      push();
      translate(x, y + yOffsets[index]);
      rotate(radians(angles[index]));
      fill(letterColor);
      text(letter, 0, 0);
      pop();
    }
  }

  // Stop the falling animation when all letters are off the screen
  if (falling && allOffScreen) {
    falling = false;

    // Set up for the breathing animation
    bubbleCenterX = width / 2;
    bubbleCenterY = height / 2;
    breathStartTime = millis();
  }

  if (!falling) {
    // Animate the bubble (breathing effect)
    let elapsedTime = millis() - breathStartTime;
    let verticalMovement = 0;

    if (breathingIn) {
      bubbleRadius = map(elapsedTime, 0, 3000, 0, 300); // Breathe in for 3 seconds
      verticalMovement = map(elapsedTime, 0, 3000, 0, -20); // Move up during "breathe in"
      if (elapsedTime > 3000) {
        breathingIn = false;
        breathStartTime = millis(); // Restart timer for "breathe out"
      }
    } else {
      bubbleRadius = map(elapsedTime, 0, 5000, 300, 0); // Breathe out for 5 seconds
      verticalMovement = map(elapsedTime, 0, 5000, -20, 0); // Move down during "breathe out"
      if (elapsedTime > 5000) {
        breathingIn = true;
        breathStartTime = millis(); // Restart timer for "breathe in"
      }
    }

    // Draw the bubble with a more organic look (gradient and smooth edges)
    fill(255, 200, 200, 100); // Semi-transparent pink bubble
    noStroke();
    ellipse(bubbleCenterX, bubbleCenterY + verticalMovement, bubbleRadius * 2);

    // Display breathing instructions
    fill(0);
    textSize(30);
    if (breathingIn) {
      text("Breathe in", bubbleCenterX, bubbleCenterY + verticalMovement);
    } else {
      text("Breathe out", bubbleCenterX, bubbleCenterY + verticalMovement);
    }

    // Space out letters evenly in a circle
    let letterSpacing = bubbleRadius / customLetters.length;
    for (let i = 0; i < customLetters.length; i++) {
      let angle = map(i, 0, customLetters.length, 0, TWO_PI);
      let x = bubbleCenterX + cos(angle) * bubbleRadius;
      let y = bubbleCenterY + verticalMovement + sin(angle) * bubbleRadius;
      fill(letterColorsP5[i]);
      text(customLetters[i], x, y);
    }
  }
}

// Detect mouse click on each letter to make it spin
function mousePressed() {
  for (let i = 0; i < gridSizeX; i++) {
    for (let j = 0; j < gridSizeY; j++) {
      let x = (i + 0.5) * spacingX;
      let y = (j + 0.5) * spacingY;
      let index = i * gridSizeY + j;

      // Check if mouse click is on the letter
      if (dist(mouseX, mouseY, x, y) < 40) { // 40 is the radius of the clickable area
        targetAngles[index] = random([360, 720, 1080]); // Spin the letter quickly (360, 720, 1080 degrees)
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Recalculate grid sizes
  gridSizeX = floor(windowWidth / 100);
  gridSizeY = floor(windowHeight / 100);

  spacingX = width / gridSizeX;
  spacingY = height / gridSizeY;

  // Reset letters, angles, colors, yOffsets, fallSpeeds, and xOffsets
  letters = [];
  angles = [];
  targetAngles = [];
  letterColorsP5 = [];
  yOffsets = [];
  fallSpeeds = [];
  xOffsets = [];

  for (let i = 0; i < gridSizeX; i++) {
    for (let j = 0; j < gridSizeY; j++) {
      let letter = random(["S", "K"]);
      letters.push(letter);
      angles.push(0);
      targetAngles.push(0);
      letterColorsP5.push(random([color(255), color(0)])); // White or black
      yOffsets.push(0); // Initial y-offset for falling animation
      fallSpeeds.push(random(2, 7)); // Random fall speed for each letter
      xOffsets.push(random(-2, 2)); // Random horizontal movement
    }
  }

  // Reposition the button
  button.position(width / 2 - 50, height / 2 - 25);

  // Reposition the refresh button
  refreshButton.position(10, 10);
}


function drawClock(x, y, size) {
  // Draw the clock face (circle)
  noFill(); // Transparent clock face
  stroke(255); // White outline
  strokeWeight(2);
  ellipse(x, y, size, size);

  // Draw clock markings (hour lines)
  stroke(255); // White hour markings
  strokeWeight(2); // Thin lines for the hour markings
  for (let i = 0; i < 12; i++) {
    const angle = radians(i * 30); // 360 degrees / 12 hours = 30 degrees per hour
    const innerRadius = size / 2 * 0.8; // Inner radius for hour markings
    const outerRadius = size / 2;      // Outer radius for hour markings

    const x1 = x + cos(angle) * innerRadius;
    const y1 = y + sin(angle) * innerRadius;
    const x2 = x + cos(angle) * outerRadius;
    const y2 = y + sin(angle) * outerRadius;

    line(x1, y1, x2, y2);
  }

  // Draw the clock hands
  stroke(255); // White hands
  strokeWeight(4);
  const hourAngle = radians(42); // 4 o'clock (4 * 30 degrees)
  const minuteAngle = radians(32); // 20 minutes past (20 * 6 degrees)

  // Hour hand
  line(
    x,
    y,
    x + cos(hourAngle) * (size / 2 * 0.5),
    y + sin(hourAngle) * (size / 2 * 0.5)
  );

  // Minute hand
  strokeWeight(2); // Thinner for minute hand
  line(
    x,
    y,
    x + cos(minuteAngle) * (size / 2 * 0.7),
    y + sin(minuteAngle) * (size / 2 * 0.7)
  );
}
