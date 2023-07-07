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


// Wait for document to be loaded fully
document.addEventListener("DOMContentLoaded", () => {

    initializeValidator("yesValidation");

});

// Add validator to all fields inside specified container id with .check-valid-input class 
function initializeValidator(containerId) {
    
    var container = document.getElementById(containerId.toString());
    if (container != null) {
        var elements = container.getElementsByClassName("check-valid-input");
    }
    else {
        console.error("Could not find contained with specified id: " + containerId + ".");
    }
    for (let i = 0; i < elements.length; i++) {
        console.log("Adding validation to " + elements.item(i).id);
        tryAddRegex(elements.item(i).id, elements.item(i).classList);
        addValidateListeners(elements.item(i).id);
    }
    
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

    console.log(event.target.pattern);

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

// Check all field formats
function validateFormattedFields() {
    if (document.getElementsByClassName("check-is-invalid").length == 0) {
        return true;
    }
    else {
        return false;
    }
}

// Check all required fields
function validateRequiredFields() {
    const requiredFields = document.getElementsByClassName("check-required");
    for (let i = 0; i < requiredFields.length; i++) {
        if (requiredFields.item(i).value == "") {
            return false;
        }
    }
    return true;
}

// Check if whole form is valid
function formIsValid() {
    if (validateFormattedFields() && validateRequiredFields()) {
        return true;
    }
    else {
        return false;
    }
}

// For submit button to check validation before clicking hidden asp button
function trySubmitForm(aspButton) {
    if (formIsValid()) {
        const theButton = document.getElementById(aspButton);
        theButton.click();
    }
}

function printClicked() {
    console.log("clicked invis button");
}