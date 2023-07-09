const modal = document.querySelector('.contact_modal')
const formQuery = document.querySelector('form')
const firstField = document.querySelector('#firstname')
const errorMessages = document.querySelectorAll('.field-error-message')
const contactModalButton = document.querySelector('.contact_button')

/**
 * Fonction gérant l'ouverture de la modal
*
*/
function displayModal() {
    modal.classList.add('modal-display')
    firstField.focus()
}

/**
 * Fonction gérant la fermeture de la modal
*
*/
function closeModal() {
    modal.classList.remove('modal-display')
    formQuery.reset()
    contactModalButton.focus()
}

/**
 * Fonction gérant le test de la valeur de champ
*
* @param {*} name
* @param {*} value
* @return {*} True si le test est valide
*/
function formRegexTest(name, value) {
    const nameRegex = /^[a-zA-Z\- ]+$/ 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const messageRegex = /^[^<>\n]*$/

    switch (name) {
    case 'firstname':
        if (value.length < 3 || !nameRegex.test(value)) {
            return false
        } else {
            return true
        };
    case 'lastname':
        if (value.length < 3 || !nameRegex.test(value)) {
            return false
        } else {
            return true
        };
    case 'email':
        if (value.trim() === '' || !emailRegex.test(value)) {
            return false
        } else {
            return true
        };
    case 'message':
        if (value.trim() === '' || !messageRegex.test(value)) {
            return false
        } else {
            return true
        };
    default:
        break
    }
}

/**
 * Fonction gérant la validité des champs
*
* @return {*} True quand les champs sont valide
*/
function formFieldValidation() {
    let isValid = true

    errorMessages.forEach((errorMessage) => errorMessage.remove())

    for (field of formQuery) {
        if (field.tagName !== 'BUTTON') {
            const isFieldValid = formRegexTest(field.name, field.value)

            if (!isFieldValid) {
                field.classList.add('field-error')

                const errorElement = document.createElement('div')
                errorElement.classList.add('field-error-message')
                Object.assign(errorElement, {
                    role: 'alert',
                    ariaLive: 'assertive',
                })
                errorElement.innerText = 'Champ invalide'

                field.parentNode.insertBefore(errorElement, field)

                isValid = false
            } else {
                field.classList.remove('field-error')
            }
        }
    }

    return isValid
}

/**
 * Fonction gérent l'envoie des données du formulaire et la fermeture de la modal
*
*/
function sendContact() {
    const formValidation = formFieldValidation()

    for (fieldValues of formQuery) {
        if (fieldValues.tagName !== 'BUTTON') {
            console.log('La valeur de ', fieldValues.name, ' est: ', fieldValues.value)
        }
    }

    if (formValidation) {
        closeModal()
    }
}

// Event listener gérant la fermeture de la modal au clavier sans nécessairement avoir de champ rempli
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal-display')) {
        closeModal()
    }
})
