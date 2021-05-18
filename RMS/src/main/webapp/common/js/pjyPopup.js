/**
 * 
 */

function showPopup(hasFilter) {
	const pjyPopup = document.querySelector('#pjyPopup');
  
  if (hasFilter) {
  	pjyPopup.classList.add('has-filter');
  } else {
  	pjyPopup.classList.remove('has-filter');
  }
  
  pjyPopup.classList.remove('hide');
}

function closePopup() {
	const pjyPopup = document.querySelector('#pjyPopup');
  pjyPopup.classList.add('hide');
}