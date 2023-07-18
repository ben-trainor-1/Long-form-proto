/**
 * Custom validator written by Ben and Sam
 */


/**
 * Main class (put this on everything you want validated)
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
 * 
 * Ignored fields (added programmatically or manually for debugging)
 * - check-ignore
 * 
 * Toggle checkboxes for hidden sections
 * - check-toggler
 * 
 * Set default value of drop down lists to -1 and add check-required
 * 
 * NOTE: radio buttons are not handled
 */


// TODO: handle radio buttons


// Wait for document to be loaded fully
document.addEventListener("DOMContentLoaded", () => {

    initializeValidator("yesValidation");

});

// Add validator to all fields inside specified container id with .check-valid-input class
// Add toggle function to checkboxes that correspond to hidden sections
function initializeValidator(containerId) {
    
    var container = document.getElementById(containerId);
    if (container != null) {
        var elements = container.getElementsByClassName("check-valid-input");
        for (let i = 0; i < elements.length; i++) {
            addValidation(elements.item(i).id);
        }
        var toggles = container.getElementsByClassName("check-toggler");
        for (let i = 0; i < toggles.length; i++) {
            addToggleListener(toggles.item(i).id);
        }
    }
    else {
        console.error("Could not find container with specified id: " + containerId + ".");
    }
    
}

// Adds validation to a single field
function addValidation(inputId) {
    var element = document.getElementById(inputId);
    // tryAddRegex(element.id, element.classList);
    addValidateListeners(element.id);
}

// Library of regular expressions
function getRegularExpression(classList) {
    // phone
    if (classList.contains("check-phone")) {
        return "^[\\x28][0-9]{3}[\\x29][ ][0-9]{3}[\\-][0-9]{4}$";
    }
    // ssn
    else if (classList.contains("check-ssn")) {
        return "^[0-9]{4}$";
    }
    // state
    else if (classList.contains("check-state")) {
        return "^(A[KLRZ])|(C[AOT])|(D[CE])|(FL)|(GA)|(HI)|(I[ADLN])|(K[SY])|(LA)|(M[ADEINOST])|(N[CDEHJMVY])|(O[HKR])|(P[AR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[AIT])|(W[AIVY])$";
    }
    // zip
    else if (classList.contains("check-zip")) {
        return "^([0-9]{5})([\\-][0-9]{4})?$";
    }
    // email
    else if (classList.contains("check-email")) {
        return "^.{1,}[@].{1,}[\.].{2,}$"; // Super generic, not greatly robust, but will get rid of plenty of errors
    }
    // dollarAmt
    else if (classList.contains("check-dollarAmt")) {
        return "^([1-9]{1}[0-9]{0,})?[0]?([.][0-9]{2})?$";
    }
    // taxRate
    else if (classList.contains("check-taxRate")) {
        return "(^[0]?[.]{1}[0-9]{0,10}[1-9]{1}$)|(^[1-9]{1}[0-9]{0,2}([.]{1}[0-9]{0,10}[1-9]{1})?$)";
    }
    // default
    else {
        console.log("No regular expression found.");
        return null;
    }
}


// Add listeners to make sure fields are checked whenever edited
function addValidateListeners(inputId) {
    console.log("Adding listeners to " + inputId);
    document.getElementById(inputId).addEventListener("keyup", validateField);
    document.getElementById(inputId).addEventListener("click", validateField);
    document.getElementById(inputId).addEventListener("change", validateField);
}

// Add listeners to toggle checkboxes
function addToggleListener(inputId) {
    document.getElementById(inputId).addEventListener("click", toggleSection);
    document.getElementById(inputId).addEventListener("change", toggleSection);
}

// Toggles display and validation on toggleable sections
function toggleSection(event) {
    var suffix = "_container";
    var hiddenSection = document.getElementById(event.target.id + suffix);
    if (event.target.checked && hiddenSection.classList.contains("visually-hidden")) {
        hiddenSection.classList.remove("visually-hidden");
        enableValidation(hiddenSection.getElementsByClassName("check-valid-input"));
    }
    else if (!event.target.checked && !hiddenSection.classList.contains("visually-hidden")) {
        hiddenSection.classList.add("visually-hidden");
        disableValidation(hiddenSection.getElementsByClassName("check-valid-input"));
    }
}

// Validation function to check
function validateField(event) {

    if (!event.target.classList.contains("check-ignore")) {

        // If field is not empty or doesn't contain -1 (drop down lists)
        if (event.target.value != "" && event.target.value != -1) {
            // If there's a regular expression to check against
            if (getRegularExpression(event.target.classList) != null) {
                var regex = new RegExp(getRegularExpression(event.target.classList));
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

// Re-enables validation for previously hidden fields; takes in a document.getElementsByClassName() call
function enableValidation(elements) {
    for (var i = 0; i < elements.length; i++) {
        if (elements.item(i).classList.contains("check-ignore")) {
            elements.item(i).classList.remove("check-ignore");
            elements.item(i).click();
        }
    }
}

// Disables validation for previously hidden fields; takes in a document.getElementsByClassName() call
function disableValidation(elements) {
    for (var i = 0; i < elements.length; i++) {
        if (!elements.item(i).classList.contains("check-ignore")) {
            elements.item(i).classList.add("check-ignore");
        }
        if (elements.item(i).classList.contains("check-is-invalid")) {
            elements.item(i).classList.remove("check-is-invalid");
        }
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
            if (!elements.item(i).classList.contains("check-ignore")) elements.item(i).click();
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
        console.log("Form validated successfully.");
        const theButton = document.getElementById(aspButton);
        theButton.click();
    }
}

function printClicked() {
    console.log("clicked invis button");
}
