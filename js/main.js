
const form = document.querySelector('form');
 

const numero_figli_minori = document.getElementById('numero_figli_minori');
const anni_residenza_fvg = document.getElementById('anni_residenza_fvg');
const presente_persona_con_disabilita = document.getElementById('presente_persona_con_disabilità');

const result = document.getElementById('result');

function findSelection(rad_name) {
    let rad_val = document.querySelector('input[name=' + rad_name + ']:checked');
    return (rad_val ? rad_val.value : "");
}
 

const calculateButton = document.querySelector('button#calculate-button');
 

form.addEventListener('submit', handleFormSubmission);
numero_figli_minori.addEventListener('input', resetCustomValidity); 
anni_residenza_fvg.addEventListener('input', resetCustomValidity); 


function resetCustomValidity() {
    console.log('resetCustomValidity');
    
    numero_figli_minori.setCustomValidity('');
    anni_residenza_fvg.setCustomValidity('');
    presente_persona_con_disabilita.setCustomValidity('');
}

// A production site would use more stringent password testing. 
function validatePassword() {
    let message = '';
    if (!/.{8,}/.test(passwordInput.value)) {
        message = 'At least eight characters. ';
    }
    // Don't allow a compromised password: check using a service/API such as haveibeenpwned.com
    // if (isCompromisedPassword()) {
    // 	message += 'This password has been compromised. Please try again. ';
    // }
    passwordInput.setCustomValidity(message);
}


let totale = 0;

function resetOutput() {
    result.value = '';    
}


function validateInputs() {
    let message = 'prova';
    let errors = false;

    let numero_figli_minori_int = parseInt(numero_figli_minori.value);
    let anni_residenza_fvg_int = parseInt(anni_residenza_fvg.value);
    let is_presente_persona_con_disabilità = findSelection('presente_persona_con_disabilità');

    console.log('numero_figli_minori_int: ' + numero_figli_minori_int);
    console.log('anni_residenza_fvg_int: ' + anni_residenza_fvg_int);
    console.log('is_presente_persona_con_disabilità: ' + is_presente_persona_con_disabilità);
    
    if (anni_residenza_fvg_int < 2) {
        anni_residenza_fvg.setCustomValidity('Per accedere alla misura, devi risiedere da almeno 2 anni.');
        errors = true;        
    }

    //anni_residenza_fvg.setCustomValidity(message);
    if (!errors) {
        totale = 0;
        
        if (anni_residenza_fvg_int >= 5) {
            totale = numero_figli_minori_int * 250 * 2;
        } else {
            totale = numero_figli_minori_int * 250;
        }
        
        if (is_presente_persona_con_disabilità === "si") {
            totale = totale + 100;
        }
        
        
    } else {
        totale = -1;
        resetOutput();
    }
}

function handleFormSubmission(event) {
    event.preventDefault();

    console.log(event);

    validateInputs();

    form.reportValidity();
    
    if (form.checkValidity() === false) {
        // Handle invalid form
    } else {
        // On a production site do form submission.
        //alert('Signed up!');
        console.log('ok');
        
        if (totale >= 0) {
            result.value = totale + " euro";
        } else {
            resetOutput();
        }

        // Disable on successful sign-up — but don't disable pending valid input!
        //calculateButton.disabled = 'true';
    }
}

