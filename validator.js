/**
 * Custom validator written by Ben and Sam
 */


/**
 * Main class
 * - check-valid-input
 * 
 * Input type classes
 * - check-phone
 * - check-ssn
 * - check-state
 * - check-zip
 * - check-email
 * - check-dollarAmt
 * - check-taxRate
 * 
 * Required inputs
 * - check-required
 */


// TODO: handle drop down lists
// TODO: handle radio buttons
// TODO: handle adding/removing validation when sections are hidden/shown


// Wait for document to be loaded fully
document.addEventListener("DOMContentLoaded", () => {

    initializeValidator("yesValidation");

});

// Add validator to all fields inside specified container id with .check-valid-input class 
function initializeValidator(containerId) {
    
    var container = document.getElementById(containerId);
    if (container != null) {
        var elements = container.getElementsByClassName("check-valid-input");
        for (let i = 0; i < elements.length; i++) {
            addValidation(elements.item(i).id);
        }
    }
    else {
        console.error("Could not find contained with specified id: " + containerId + ".");
    }
    
}

// Adds validation to a single field
function addValidation(inputId) {
    var element = document.getElementById(inputId);
    tryAddRegex(element.id, element.classList);
    addValidateListeners(element.id);
}


// Called by initializeValidator to check which rules to add to each element
// Also add listeners to check rule when field is being edited
function tryAddRegex(inputId, classList) {
    console.log(inputId + ": [" + classList + "]");
    if (classList.contains("check-phone")) {
        addRegularExpression(inputId, "phone");
    }
    else if (classList.contains("check-ssn")) {
        addRegularExpression(inputId, "ssn");
    }
    else if (classList.contains("check-state")) {
        addRegularExpression(inputId, "state");
    }
    else if (classList.contains("check-zip")) {
        addRegularExpression(inputId, "zip");
    }
    else if (classList.contains("check-email")) {
        addRegularExpression(inputId, "email");
    }
    else if (classList.contains("check-dollarAmt")) {
        addRegularExpression(inputId, "dollarAmt");
    }
    else if (classList.contains("check-taxRate")) {
        addRegularExpression(inputId, "taxRate");
    }
    else {
        console.log("No regular expression needed.");
    }
}

// Add regular expression to the element
function addRegularExpression(inputId, type) {
    var regex = "";
    switch (type) {
        case "phone":
            regex = "^[\\x28][0-9]{3}[\\x29][ ][0-9]{3}[\\-][0-9]{4}$";
            break;
        case "ssn":
            regex = "^[0-9]{4}$";
            break;
        case "state":
            regex = "^(A[KLRZ])|(C[AOT])|(D[CE])|(FL)|(GA)|(HI)|(I[ADLN])|(K[SY])|(LA)|(M[ADEINOST])|(N[CDEHJMVY])|(O[HKR])|(P[AR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[AIT])|(W[AIVY])$";
            break;
        case "zip":
            regex = "^([0-9]{5})([\\-][0-9]{4})?$";
            break;
        case "email":
            regex = "^.{1,}[@].{1,}[\.].{2,}$"; // Super generic, not greatly robust, but will get rid of plenty of errors
            break;
        case "dollarAmt":
            regex = "^([1-9]{1}[0-9]{0,})?[0]?([.][0-9]{2})?$";
            break;
        case "taxRate":
            regex = "(^[0]?[.]{1}[0-9]{0,10}[1-9]{1}$)|(^[1-9]{1}[0-9]{0,2}([.]{1}[0-9]{0,10}[1-9]{1})?$)";
            break;
        default:
            break;
    }
    if (regex != "") {
        document.getElementById(inputId).pattern = regex;
    }
    else {
        console.error("Could not find regular expression type.");
    }
}

// Add listeners to make sure fields are checked whenever edited
function addValidateListeners(inputId) {
    console.log("Adding listeners to " + inputId);
    document.getElementById(inputId).addEventListener("keyup", validateField);
    document.getElementById(inputId).addEventListener("click", validateField);
    document.getElementById(inputId).addEventListener("change", validateField);
}

// Validation function to check
function validateField(event) {

    if (!event.target.classList.contains("check-ignore")) {
        // If field is not empty
        if (event.target.value != "") {
            // If there's a regular expression to check against
            if (event.target.pattern != "") {
                var regex = new RegExp(event.target.pattern);
                if (regex.test(event.target.value)) {
                    applyStyle(event.target.id, "valid");
                }
                else {
                    applyStyle(event.target.id, "invalid");
                }
            }
            else {
                applyStyle(event.target.id, "unstyled");
            }
        }
        // If field is empty
        else {
            if (event.target.classList.contains("check-required")) {
                applyStyle(event.target.id, "invalid");
            }
            else {
                applyStyle(event.target.id, "unstyled");
            }
        }
    }
    else {
        // Don't check field
    }
    
}

// Add class names to fields accordingly using "valid", "invalid", and "unstyled"
function applyStyle(inputId, state) {
    var element = document.getElementById(inputId);
    switch (state) {
        case "valid":
            if (!element.classList.contains("check-is-valid")) element.classList.add("check-is-valid");
            if (element.classList.contains("check-is-invalid")) element.classList.remove("check-is-invalid");
            break;
        case "invalid":
            if (!element.classList.contains("check-is-invalid")) element.classList.add("check-is-invalid");
            if (element.classList.contains("check-is-valid")) element.classList.remove("check-is-valid");
            break;
        case "unstyled":
            if (element.classList.contains("check-is-valid")) element.classList.remove("check-is-valid");
            if (element.classList.contains("check-is-invalid")) element.classList.remove("check-is-invalid");
            break;
        default:
            console.error("Invalid style state given.");
            break;
    }
}

// Check if whole form is valid
function formIsValid(buttonId) {
    clickAllFields(document.getElementById(buttonId).name); // Click all fields in corresponding container
    if (document.getElementsByClassName("check-is-invalid").length == 0) {
        return true;
    }
    else {
        return false;
    }
}

// Clicks all fields to activate validateField() and make sure all necessary fields are filled out and formatted correctly
function clickAllFields(containerId) {
    var container = document.getElementById(containerId);
    if (container != null) {
        var elements = container.getElementsByClassName("check-valid-input");
        for (let i = 0; i < elements.length; i++) {
            elements.item(i).click();
        }
    }
    else {
        console.log("Could not find container");
    }
}

// For submit button to check validation before clicking hidden asp button
// Clicks the trigger first
function trySubmitForm(aspButton) {
    if (formIsValid(aspButton + "_trigger")) {
        const theButton = document.getElementById(aspButton);
        theButton.click();
    }
}

function printClicked() {
    console.log("clicked invis button");
}