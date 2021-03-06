'use strict';
import {
  handleKeyPressAnimation
} from "./main-transition.js";
const formModal = document.querySelector('.form-modal');
const formModalSuccess = document.querySelector('.form-modal__success');
const formModalError = document.querySelector('.form-modal__error');
const closeFormBtnAll = document.querySelectorAll('.form-modal__btn')
const formBtn = document.querySelector('.js-form-btn');
const formNameInput = document.querySelector('#name');
const formSubjectInput = document.querySelector('#subject');

formBtn.addEventListener('mouseover', formValidate);
formBtn.addEventListener('mouseleave', formValidateCancel);
formBtn.addEventListener('click', formValidateClick)
closeFormBtnAll.forEach(btn => {
  btn.addEventListener('click', closeForm)
})
formModal.addEventListener('click', backdropCloseForm)


function formValidate(e) {
  if (formNameInput.value === '' || formSubjectInput.value === '') {
    if (formNameInput.value === '' && formSubjectInput.value === '') {
      formNameInput.classList.add('input-error');
      formSubjectInput.classList.add('input-error');
    } else if (formSubjectInput.value === '') {
      formSubjectInput.classList.add('input-error');
    } else if (formNameInput.value === '') {
      formNameInput.classList.add('input-error');
    }
  } else {
    if (!formBtn.classList.contains('loading')) {
      formBtn.classList.add('hello-hero__btn-send')
    }

  }
}

function formValidateClick(e) {
  if (formNameInput.value === '' || formSubjectInput.value === '') {
    e.preventDefault()
    if (formNameInput.value === '' && formSubjectInput.value === '') {
      e.preventDefault()
    }
  } else {

    formBtn.classList.remove('hello-hero__btn-send')
    formBtn.classList.add('loading')
  }
}

function formValidateCancel() {
  formNameInput.classList.remove('input-error');
  formSubjectInput.classList.remove('input-error');
}

function closeForm() {
  window.addEventListener('keydown', handleKeyPressAnimation)
  formModal.classList.remove('form-modal-is-open');
  document.body.classList.remove('form-modal-active')
  window.removeEventListener('keydown', handleKeyPress)
}

function backdropCloseForm(e) {
  if (e.currentTarget !== e.target) {
    return
  }
  closeForm()
}

function handleKeyPress(e) {
  if (e.code !== 'Escape') {
    return
  }
  closeForm()
}

window.onload = function () {
  document
    .getElementById('contact-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      // generate a five digit number for the contact_number variable
      this.contact_number.value = (Math.random() * 100000) | 0;
      // these IDs from the previous steps
      emailjs.sendForm('service_2wvpzy9', 'template_cq5wma', this).then(
        function () {
          window.removeEventListener('keydown', handleKeyPressAnimation)
          document.body.classList.add('form-modal-active')
          formModal.classList.add('form-modal-is-open');
          window.addEventListener('keydown', handleKeyPress)
          formModalSuccess.style.opacity = 1;
          formModalSuccess.style.zIndex = 1;
          formBtn.classList.remove('loading')
        },
        function (error) {
          window.removeEventListener('keydown', handleKeyPressAnimation)
          document.body.classList.add('form-modal-active')
          formModal.classList.add('form-modal-is-open');
          window.addEventListener('keydown', handleKeyPress)
          formModalError.style.opacity = 1;
          formModalError.style.zIndex = 1;
          formBtn.classList.remove('loading')
        },
      );
    });
};