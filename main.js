// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  const errorModal = document.getElementById('modal');
  errorModal.classList.add('hidden'); // Hide error modal initially

  const hearts = document.querySelectorAll('.like');

  hearts.forEach(heart => {
    heart.addEventListener('click', () => {
      if (heart.classList.contains('activated-heart')) {
        // If heart is already full, remove full heart and activated class
        heart.innerText = EMPTY_HEART;
        heart.classList.remove('activated-heart');
      } else {
        // If heart is empty, try to fill it
        mimicServerCall()
          .then(() => {
            // On success, fill heart and add activated class
            heart.innerText = FULL_HEART;
            heart.classList.add('activated-heart');
          })
          .catch(error => {
            // On failure, display error modal with server error message
            const errorMessage = document.getElementById('modal-message');
            errorMessage.innerText = error;
            errorModal.classList.remove('hidden');

            // Hide error modal after 3 seconds
            setTimeout(() => {
              errorModal.classList.add('hidden');
            }, 3000);
          });
      }
    });
  });
});




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}