


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
         'assets/audio/riverstreamaudio.mp3', // Second audio file

        'assets/audio/healingfrequencies.mp3', // First audio file
        'assets/audio/healingfrequencies2.mp3', // First audio file
        'assets/audio/riverstreamaudio.mp3', // Second audio file



        'assets/audio/rainaudio.mp3', // First audio file
     
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
  textRegion.innerHTML = text; // Use innerHTML to render HTML tags
}

document.getElementById('boxBreathingButton').addEventListener('click', function() {
  // Clear the canvas and start box breathing animation
  startAnimation('boxBreathing');
  updateTextRegion(`
    <div style="text-align: center;">
      <u><b>Box Breathing</b></u>
    </div><br>
    Also called "square breathing," this technique is used by Navy SEALs to stay calm and focused.<br><br>
    <div style="text-align: left;">
        <u><b>How to Do It:</b><br></u>
      - Inhale through your nose for 4 seconds.<br>
      - Hold your breath for 4 seconds.<br>
      - Exhale through your mouth for 4 seconds.<br>
      - Hold again for 4 seconds.<br>
      - Repeat for a few minutes.<br><br>
      <u><b>Benefits:</b><br></u>
      - Reduces stress and anxiety.<br>
      - Boosts emotional control.<br>
      - Regulates blood pressure.
    </div>
  `);
  
});

document.getElementById('second_breathing').addEventListener('click', function() {
        // Clear the canvas and start second breathing animation
        startAnimation('secondBreathing');
        updateTextRegion(`
          <div style="text-align: center;">
            <u><b>Slow Paced Breathing</b></u>
          </div><br>
          A simple and effective breathing technique to promote relaxation and reduce stress.<br><br>
          <div style="text-align: left;">
            <u><b>How to Do It:</b><br></u>
            - Breathe in slowly through your nose for 5 seconds.<br>
            - Exhale slowly through your mouth for 5 seconds.<br>
            - Repeat the cycle for a few minutes.<br><br>
            <u><b>Benefits:</b><br></u>
            - Promotes relaxation and reduces stress.<br>
            - Helps improve focus and mindfulness.<br>
            - Aids in better sleep and emotional well-being.
          </div>
        `);
        
      });
      
document.getElementById('third_breathing').addEventListener('click', function() {
        // Clear the canvas and start third breathing animation
        startAnimation('thirdBreathing');
        updateTextRegion(`
          <div style="text-align: center;">
            <u><b>Resonance Breathing</b></u>
          </div><br>
          A calming breathing exercise designed to create a balanced rhythm between your breath and body.<br><br>
          <div style="text-align: left;">
            <u><b>How to Do It:</b><br></u>
            - Breathe in slowly through your nose for 4 seconds.<br>
            - Breathe out slowly through your nose  for 6 seconds.<br>
            - Maintain a calming and consistent rhythm.<br>
            - Repeat for a few minutes.<br><br>
            <u><b>Benefits:</b><br></u>
            - Enhances relaxation and reduces stress.<br>
            - Improves heart rate variability and emotional balance.<br>
            - Promotes mindfulness and a sense of calm.
          </div>
        `);
        
      });
      
document.getElementById('fourth_breathing').addEventListener('click', function() {
        // Clear the canvas and start fourth breathing animation
        startAnimation('fourthBreathing');
        updateTextRegion(`
          <div style="text-align: center;">
            <u><b>4-7-8 Breathwork</b></u>
          </div><br>
          A powerful breathing technique to help calm the mind, reduce stress, and promote better sleep.<br><br>
          <div style="text-align: left;">
            <u><b>How to Do It:</b><br></u>
            - Inhale slowly through your nose for 4 seconds.<br>
            - Hold your breath for 7 seconds.<br>
            - Exhale slowly through your mouth for 8 seconds.<br>
            - Repeat the cycle for a few minutes.<br><br>
            <u><b>Benefits:</b><br></u>
            - Reduces stress and anxiety.<br>
            - Helps with relaxation and falling asleep.<br>
            - Improves focus and emotional control.<br>
            - Enhances overall respiratory function.
          </div>
        `);
        
      });
      
document.getElementById('fifth_breathing').addEventListener('click', function() {
        // Clear the canvas and start fifth breathing animation
        startAnimation('fifthBreathing');
        updateTextRegion(`
          <div style="text-align: center;">
            <u><b>Pursed Lip Breathing</b></u>
          </div><br>
          A breathing technique that helps improve airflow and promotes relaxation by slowing the breath.<br><br>
          <div style="text-align: left;">
            <u><b>How to Do It:</b><br></u>
            - Inhale slowly through your nose for 2 seconds.<br>
            - Purse your lips (as if blowing out a candle) and exhale slowly for 4 seconds.<br>
            - Repeat the cycle for a few minutes.<br><br>
            <u><b>Benefits:</b><br></u>
            - Helps improve breathing efficiency.<br>
            - Reduces shortness of breath and promotes relaxation.<br>
            - Aids in reducing stress and anxiety.
          </div>
        `);
        
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