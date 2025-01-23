// Function to toggle the menu
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open'); // Toggle the 'open' class to show/hide the menu
}

// Function to handle the Start Meditation button
document.getElementById('startMeditationButton').addEventListener('click', function() {
    // Hide the "Start Meditation" button by adding the fade-out class
    this.classList.add('fade-out');
    
    // Toggle the 'show' class on the button container to show/hide the buttons
    const buttonContainer = document.querySelector('.button-container-top');
    buttonContainer.classList.toggle('show');



  
    // Optional: Trigger other actions here (e.g., start the breathing animation, or play a sound)
});


let changeColorsButton = document.getElementById('changeColorsButton');


// Event listener for changing colors
changeColorsButton.addEventListener('click', function() {
  // Call a function in sketch.js to change the background color
  changeBackgroundColor();
});



function changeBackgroundColor() {
    // Randomly change the background color
    bgColorP5 = color(random(255), random(255), random(255)); 
    menuToggle.style.backgroundColor = bgColorP5;
    menu.style.backgroundColor = bgColorP5.toString();
    startMeditationButton.style.backgroundColor = bgColorP5.toString();
    let buttons = document.querySelectorAll('.button-container-top .button');
    
    // Loop through each button and change its background color
    buttons.forEach(button => {
      button.style.backgroundColor = bgColorP5.toString();
    });
  // Change to a random color
  }


let removeOutline = document.getElementById('removeoutline');
  // Event listener for changing colors
  removeoutline.addEventListener('click', function() {
      // Call a function in sketch.js to change the background color
      toggleOutline();
    });


let removeinstructions = document.getElementById('removeinstructions');
    // Event listener for changing colors
    removeinstructions.addEventListener('click', function() {
        // Call a function in sketch.js to change the background color
        toggleInstructions();
      });




document.getElementById('boxBreathingButton').addEventListener('click', function() {
        // Clear the canvas and start box breathing animation
        startAnimation('boxBreathing');
      });
      
document.getElementById('second_breathing').addEventListener('click', function() {
        // Clear the canvas and start second breathing animation
        startAnimation('secondBreathing');
      });
      
document.getElementById('third_breathing').addEventListener('click', function() {
        // Clear the canvas and start third breathing animation
        startAnimation('thirdBreathing');
      });
      
document.getElementById('fourth_breathing').addEventListener('click', function() {
        // Clear the canvas and start fourth breathing animation
        startAnimation('fourthBreathing');
      });
      
document.getElementById('fifth_breathing').addEventListener('click', function() {
        // Clear the canvas and start fifth breathing animation
        startAnimation('fifthBreathing');
      });
       
  