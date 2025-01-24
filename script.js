


function toggleMenu() {
    const menu = document.getElementById('menu');
    const menuToggle = document.getElementById('menuToggle');
  
    // Toggle the menu's open state
    menu.classList.toggle('open');
  
    // Show or hide the sandwich menu icon based on the menu's state
    if (menu.classList.contains('open')) {
      menuToggle.style.display = 'none'; // Hide the sandwich menu icon
    } else {
      menuToggle.style.display = 'block'; // Show the sandwich menu icon
    }
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

let changemusic = document.getElementById('changemusic');
    // Event listener for changing colors
    changemusic.addEventListener('click', function() {
        // Call a function in sketch.js to change the background color
        togglemusic();
      });



let audioFiles = [
        'assets/audio/rainaudio.mp3', // First audio file
        'assets/audio/riverstreamaudio.mp3', // Second audio file
     
      ];
      
let currentAudioIndex = 0; // Index to keep track of the current audio
      
function togglemusic() {
        currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length; // Loop back to the first file after the fourth one
      
        const audioElement = document.getElementById('background-music');
        audioElement.src = audioFiles[currentAudioIndex]; // Update the source of the audio element
      
        audioElement.play(); // Play the new audio file
      }
      


// Function to update text based on the button clicked
function updateTextRegion(text) {
  const textRegion = document.getElementById("dynamicText");
  textRegion.textContent = text;
}
















document.getElementById('boxBreathingButton').addEventListener('click', function() {
        // Clear the canvas and start box breathing animation
        startAnimation('boxBreathing');
        updateTextRegion("Box Breathing: Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, and hold for 4 seconds.");

      });
      
document.getElementById('second_breathing').addEventListener('click', function() {
        // Clear the canvas and start second breathing animation
        startAnimation('secondBreathing');
        updateTextRegion("Slow Paced Breathing: Breathe in slowly for 5 seconds, exhale slowly for 5 seconds. Repeat.");

      });
      
document.getElementById('third_breathing').addEventListener('click', function() {
        // Clear the canvas and start third breathing animation
        startAnimation('thirdBreathing');
        updateTextRegion("Resonance Breathing: Breathe in for 4 seconds, breathe out for 6 seconds. Find a calming rhythm.");

      });
      
document.getElementById('fourth_breathing').addEventListener('click', function() {
        // Clear the canvas and start fourth breathing animation
        startAnimation('fourthBreathing');
        updateTextRegion("4-7-8 Breathwork: Inhale for 4 seconds, hold your breath for 7 seconds, and exhale slowly for 8 seconds.");

      });
      
document.getElementById('fifth_breathing').addEventListener('click', function() {
        // Clear the canvas and start fifth breathing animation
        startAnimation('fifthBreathing');
        updateTextRegion("Pursed Lip Breathing: Inhale through your nose for 2 seconds, and exhale slowly through pursed lips for 4 seconds.");

      });
       
  

// Event listener to open the menu when clicked anywhere on the screen (on mobile)
document.addEventListener('click', function(event) {
  const menu = document.getElementById('menu');
  const menuToggle = document.getElementById('menuToggle');
  const menuButton = document.getElementById('menuButton'); // Assuming this is your button that triggers toggleMenu
  
  // Check if the click is outside the menu and button, and close the menu if it's open
  if (!menu.contains(event.target) && !menuToggle.contains(event.target) && !menuButton.contains(event.target)) {
      if (menu.classList.contains('open')) {
          toggleMenu(); // Close the menu if open
      }
  }
});