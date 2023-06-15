function displayModal() {
    const modal = document.querySelector(".contact_modal");
    modal.classList.add('modal-display')
}

function closeModal() {
    const modal = document.querySelector(".contact_modal");
    const formQuery = document.querySelector("form")

    modal.classList.remove('modal-display')
    formQuery.reset()
}

function formRegexTest(name, value){
    const nameRegex = /^[a-zA-Z\- ]+$/ 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const messageRegex = /^[^<>\n]*$/
    
    switch(name){
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
            break;
    }
}

function formFieldValidation(){
    const formQuery = document.querySelector("form")
    let isValid = true

    const errorMessages = document.querySelectorAll(".field-error-message");
    errorMessages.forEach(errorMessage => errorMessage.remove());

    for(let field of formQuery){

        if(field.tagName !== "BUTTON"){
            const isFieldValid = formRegexTest(field.name, field.value)

            if(!isFieldValid){
                field.classList.add("field-error")

                const errorElement = document.createElement("div");
                errorElement.classList.add("field-error-message");
                errorElement.innerText = "Champ invalide";

                field.parentNode.insertBefore(errorElement, field);
                
                isValid = false
            }else{
                field.classList.remove("field-error")
            }
        }
    }

    return isValid
}

function sendContact(){
    
    
    const formValidation = formFieldValidation()
    
    if(formValidation){
        const response = window.confirm("Votre message a été envoyé!")
        
        if(response){        
            closeModal()
        }
    }
}