import "./validator.js";

// Grab every single field on the page
const allInputs = document.querySelectorAll("input, select, textarea");


// Dropdown menu
document.getElementsByClassName("dropdown-toggle").item(0).addEventListener("mouseover", showDropdown);
document.getElementsByClassName("dropdown-toggle").item(0).addEventListener("mouseout", hideDropdown);
document.getElementsByClassName("dropdown-toggle").item(0).addEventListener("click", showDropdown);
document.getElementsByClassName("dropdown-menu").item(0).addEventListener("mouseout", hideDropdown);
const dropdown = new bootstrap.Dropdown(document.getElementsByClassName("dropdown-menu").item(0));

function showDropdown() {
    if (!document.getElementById("dropdown_button").classList.contains("show")) {
        document.getElementById("dropdown_button").click();
    }
}
function hideDropdown() {
    setTimeout(() => {
        if (document.querySelector(".dropdown-toggle:hover") == null 
            && document.querySelector(".dropdown-menu:hover") == null 
            && document.getElementById("dropdown_button").classList.contains("show")) {
            document.getElementById("dropdown_button").click();
        }
    }, 100);
}


// Manual address entry toggle
// Reference: txt_Category + _ + cbx_id
const manualAddressChecks = document.getElementsByClassName("manual-address ignore-field");
for (var i = 0; i < manualAddressChecks.length; i++) {
    manualAddressChecks.item(i).addEventListener("click", manualAddressClick);
}
function manualAddressClick() {
    if (this.checked == true) {
        document.getElementById("txt_SearchAddress" + "_" + this.id).disabled = true;
        document.getElementById("txt_StreetAddress" + "_" + this.id).disabled = false;
        document.getElementById("txt_City" + "_" + this.id).disabled = false;
        document.getElementById("txt_State" + "_" + this.id).disabled = false;
        document.getElementById("txt_Zip" + "_" + this.id).disabled = false;
        document.getElementById("txt_County" + "_" + this.id).disabled = false;
    }
    else {
        document.getElementById("txt_SearchAddress" + "_" + this.id).disabled = false;
        document.getElementById("txt_StreetAddress" + "_" + this.id).disabled = true;
        document.getElementById("txt_City" + "_" + this.id).disabled = true;
        document.getElementById("txt_State" + "_" + this.id).disabled = true;
        document.getElementById("txt_Zip" + "_" + this.id).disabled = true;
        document.getElementById("txt_County" + "_" + this.id).disabled = true;
    }
}


// Location same as customer
// Disables location data entry and auto-updates fields based on customer address while being entered
const locationSameAsCustomerCheck = document.getElementById("cbx_locationSameAsCustomer");
locationSameAsCustomerCheck.addEventListener("click", locationSameAsCustomerClick);
document.getElementById("txt_SearchAddress_cbx_customer").addEventListener("keyup", locationSameAsCustomerClick);
document.getElementById("txt_StreetAddress_cbx_customer").addEventListener("keyup", locationSameAsCustomerClick);
document.getElementById("txt_City_cbx_customer").addEventListener("keyup", locationSameAsCustomerClick);
document.getElementById("txt_State_cbx_customer").addEventListener("keyup", locationSameAsCustomerClick);
document.getElementById("txt_Zip_cbx_customer").addEventListener("keyup", locationSameAsCustomerClick);
document.getElementById("txt_County_cbx_customer").addEventListener("keyup", locationSameAsCustomerClick);

function locationSameAsCustomerClick() {
    if (locationSameAsCustomerCheck.checked == true) {
        
        // Enable first so they can be programmatically clicked
        document.getElementById("txt_SearchAddress_cbx_building").disabled = false;
        document.getElementById("txt_StreetAddress_cbx_building").disabled = false;
        document.getElementById("txt_City_cbx_building").disabled = false;
        document.getElementById("cbx_building").disabled = false;
        document.getElementById("txt_State_cbx_building").disabled = false;
        document.getElementById("txt_Zip_cbx_building").disabled = false;
        document.getElementById("txt_County_cbx_building").disabled = false;
        
        // Change values to match
        document.getElementById("txt_StreetAddress_cbx_building").value = document.getElementById("txt_StreetAddress_cbx_customer").value;
        document.getElementById("txt_City_cbx_building").value = document.getElementById("txt_City_cbx_customer").value;
        document.getElementById("txt_State_cbx_building").value = document.getElementById("txt_State_cbx_customer").value;
        document.getElementById("txt_Zip_cbx_building").value = document.getElementById("txt_Zip_cbx_customer").value;
        document.getElementById("txt_County_cbx_building").value = document.getElementById("txt_County_cbx_customer").value;

        // Click to trigger checkIfModified function so that they highlight if changed
        document.getElementById("txt_StreetAddress_cbx_building").click();
        document.getElementById("txt_City_cbx_building").click();
        document.getElementById("txt_State_cbx_building").click();
        document.getElementById("txt_Zip_cbx_building").click();
        document.getElementById("txt_County_cbx_building").click();
        
        // Then disable again finally
        document.getElementById("txt_SearchAddress_cbx_building").disabled = true;
        document.getElementById("txt_StreetAddress_cbx_building").disabled = true;
        document.getElementById("txt_City_cbx_building").disabled = true;
        document.getElementById("cbx_building").disabled = true;
        document.getElementById("txt_State_cbx_building").disabled = true;
        document.getElementById("txt_Zip_cbx_building").disabled = true;
        document.getElementById("txt_County_cbx_building").disabled = true;
    }
    else {
        manualAddressClickPassVar("cbx_building");
        document.getElementById("cbx_building").disabled = false;
    }
}

// Manual address entry with different ID pass
function manualAddressClickPassVar(id) {
    if (document.getElementById(id).checked == true) {
        document.getElementById("txt_SearchAddress" + "_" + id).disabled = true;
        document.getElementById("txt_StreetAddress" + "_" + id).disabled = false;
        document.getElementById("txt_City" + "_" + id).disabled = false;
        document.getElementById("txt_State" + "_" + id).disabled = false;
        document.getElementById("txt_Zip" + "_" + id).disabled = false;
        document.getElementById("txt_County" + "_" + id).disabled = false;
    }
    else {
        document.getElementById("txt_SearchAddress" + "_" + id).disabled = false;
        document.getElementById("txt_StreetAddress" + "_" + id).disabled = true;
        document.getElementById("txt_City" + "_" + id).disabled = true;
        document.getElementById("txt_State" + "_" + id).disabled = true;
        document.getElementById("txt_Zip" + "_" + id).disabled = true;
        document.getElementById("txt_County" + "_" + id).disabled = true;
    }
}


// Show/hide correct transaction types and tables
// Also remove validation from hidden calculation tables if the transaction type changes
// (so that the form will actually submit)
const transactionTypeRadios = document.getElementsByClassName("radio_transactionType");
const landlordInformationInputs = document.getElementById("landlord_information").getElementsByTagName("input");
for (var i = 0; i < transactionTypeRadios.length; i++) {
    transactionTypeRadios.item(i).addEventListener("click", transactionTypeClick);
}
transactionTypeClick();
function transactionTypeClick() {
    document.getElementById("noTransactionType").classList.add("visually-hidden");
    // CASH
    if (document.getElementById("rdo_cash").checked == true) {
        if (document.getElementById("calculation_cash").classList.contains("visually-hidden")) {
            document.getElementById("calculation_cash").classList.remove("visually-hidden");
            // addValidation(document.getElementById("calculation_cash").querySelectorAll("input"));
            enableValidation(document.getElementById("calculation_cash").querySelectorAll("input.check-valid-input"));
        }
        if (!document.getElementById("calculation_rto").classList.contains("visually-hidden")) {
            document.getElementById("calculation_rto").classList.add("visually-hidden");
            // removeValidation(document.getElementById("calculation_rto").querySelectorAll("input"));
            disableValidation(document.getElementById("calculation_rto").querySelectorAll("input.check-valid-input"));
        }
        if (!document.getElementById("calculation_stock").classList.contains("visually-hidden")) {
            document.getElementById("calculation_stock").classList.add("visually-hidden");
            // removeValidation(document.getElementById("calculation_stock").querySelectorAll("input"));
            disableValidation(document.getElementById("calculation_stock").querySelectorAll("input.check-valid-input"));
        }
        if (!document.getElementById("landlord_information").classList.contains("visually-hidden")) {
            document.getElementById("landlord_information").classList.add("visually-hidden");
        }
        if (!document.getElementById("nav_landlord_information").classList.contains("visually-hidden")) {
            document.getElementById("nav_landlord_information").classList.add("visually-hidden");
            // removeValidation(document.querySelectorAll("#landlord_information input"));
            disableValidation(document.getElementById("nav_landlord_information").querySelectorAll("input.check-valid-input"));
        }
        for (var i = 0; i < landlordInformationInputs.length; i++) {
            landlordInformationInputs.item(i).disabled = true;
        }
        if (document.getElementById("taxExempt").classList.contains("visually-hidden")) {
            document.getElementById("taxExempt").classList.remove("visually-hidden");
        }
    }
    // RTO
    else if (document.getElementById("rdo_rto").checked == true) {
        if (!document.getElementById("calculation_cash").classList.contains("visually-hidden")) {
            document.getElementById("calculation_cash").classList.add("visually-hidden");
            // removeValidation(document.getElementById("calculation_cash").querySelectorAll("input"));
            disableValidation(document.getElementById("calculation_cash").querySelectorAll("input.check-valid-input"));
        }
        if (document.getElementById("calculation_rto").classList.contains("visually-hidden")) {
            document.getElementById("calculation_rto").classList.remove("visually-hidden");
            // addValidation(document.getElementById("calculation_rto").querySelectorAll("input"));
            enableValidation(document.getElementById("calculation_rto").querySelectorAll("input.check-valid-input"));
        }
        if (!document.getElementById("calculation_stock").classList.contains("visually-hidden")) {
            document.getElementById("calculation_stock").classList.add("visually-hidden");
            // removeValidation(document.getElementById("calculation_stock").querySelectorAll("input"));
            disableValidation(document.getElementById("calculation_stock").querySelectorAll("input.check-valid-input"));
        }
        if (document.getElementById("landlord_information").classList.contains("visually-hidden")) {
            document.getElementById("landlord_information").classList.remove("visually-hidden");
            // addValidation(document.querySelectorAll("#landlord_information input"));
            enableValidation(document.getElementById("nav_landlord_information").querySelectorAll("input.check-valid-input"));
        }
        if (document.getElementById("nav_landlord_information").classList.contains("visually-hidden")) {
            document.getElementById("nav_landlord_information").classList.remove("visually-hidden");
        }
        for (var i = 0; i < landlordInformationInputs.length; i++) {
            landlordInformationInputs.item(i).disabled = false;
        }
        if (document.getElementById("taxExempt").classList.contains("visually-hidden")) {
            document.getElementById("taxExempt").classList.remove("visually-hidden");
        }
    }
    // STOCK
    else if (document.getElementById("rdo_stock").checked == true) {
        if (!document.getElementById("calculation_cash").classList.contains("visually-hidden")) {
            document.getElementById("calculation_cash").classList.add("visually-hidden");
            // removeValidation(document.getElementById("calculation_cash").querySelectorAll("input"));
            disableValidation(document.getElementById("calculation_cash").querySelectorAll("input.check-valid-input"));
        }
        if (!document.getElementById("calculation_rto").classList.contains("visually-hidden")) {
            document.getElementById("calculation_rto").classList.add("visually-hidden");
            // removeValidation(document.getElementById("calculation_rto").querySelectorAll("input"));
            disableValidation(document.getElementById("calculation_rto").querySelectorAll("input.check-valid-input"));
        }
        if (document.getElementById("calculation_stock").classList.contains("visually-hidden")) {
            document.getElementById("calculation_stock").classList.remove("visually-hidden");
            // addValidation(document.getElementById("calculation_stock").querySelectorAll("input"));
            enableValidation(document.getElementById("calculation_stock").querySelectorAll("input.check-valid-input"));
        }
        if (!document.getElementById("landlord_information").classList.contains("visually-hidden")) {
            document.getElementById("landlord_information").classList.add("visually-hidden");
        }
        if (!document.getElementById("nav_landlord_information").classList.contains("visually-hidden")) {
            document.getElementById("nav_landlord_information").classList.add("visually-hidden");
            // removeValidation(document.querySelectorAll("#landlord_information input"));
            disableValidation(document.getElementById("nav_landlord_information").querySelectorAll("input.check-valid-input"));
        }
        for (var i = 0; i < landlordInformationInputs.length; i++) {
            landlordInformationInputs.item(i).disabled = true;
        }
        if (!document.getElementById("taxExempt").classList.contains("visually-hidden")) {
            document.getElementById("taxExempt").classList.add("visually-hidden");
        }
    }
}


// Manual pricing in calculations table
// Enable/disable fields, update automatic/manual appropriately
const manualPricingCheck = document.getElementById("cbx_pricingManual");
manualPricingCheck.addEventListener("click", manualPricingClick);
var manualPrices = document.getElementsByClassName("manual-price-toggle");
manualPricingCheck.click();
function manualPricingClick(event) {
    if (event.target.checked == true) {
        for (var i = 0; i < manualPrices.length; i++) {
            manualPrices.item(i).disabled = false;
            document.getElementById("auto_" + manualPrices.item(i).id).innerHTML = "[Manual]";
        }
    }
    else {
        for (var i = 0; i < manualPrices.length; i++) {
            manualPrices.item(i).disabled = true;
            document.getElementById("auto_" + manualPrices.item(i).id).innerHTML = "[Automatic]";
        }
    }
}


// CHANGE TRACKING
const initialValuesCol1 = [];
const initialValuesCol2 = [];
var editHistory = [];

// Save initial values and add events
for (let i = 0; i < allInputs.length; i++) {

    // Don't include ignored fields
    if (!allInputs.item(i).classList.contains("ignore-field")) {                
        if (allInputs.item(i).type == "checkbox" || allInputs.item(i).type == "radio") {
            allInputs.item(i).addEventListener("click", (event) => checkIfModified(event));
            initialValuesCol2.push(allInputs.item(i).checked);
        }
        else if (allInputs.item(i).type == "date") {
            allInputs.item(i).addEventListener("change", (event) => checkIfModified(event));
            allInputs.item(i).addEventListener("keyup", (event) => checkIfModified(event));
            initialValuesCol2.push(allInputs.item(i).value);
        }
        else {
            allInputs.item(i).addEventListener("keyup", (event) => checkIfModified(event));
            allInputs.item(i).addEventListener("change", (event) => checkIfModified(event));
            allInputs.item(i).addEventListener("click", (event) => checkIfModified(event));
            initialValuesCol2.push(allInputs.item(i).value);
        }
        initialValuesCol1.push(allInputs.item(i).id);
    }

}


// Listener function
var proceed;
function checkIfModified(event) {

    // console.log(event.target);
    // console.log(event.target.id);
    // console.log(event.type);
    proceed = false;

    if (event.target.classList.contains("ignore-field")) {
        proceed = false;
    }
    else if (event.type == "keyup") {
        // Have to ignore Tab keyups for some weird situations
        if (event.code == "Tab") {
            proceed = false;
        }
        else {
            proceed = true;
        }
    }
    else {
        proceed = true;
    }
    
    if (proceed) {

        // Checkboxes are weird
        if (event.target.type == "checkbox") {

            if (initialValuesCol2[initialValuesCol1.indexOf(event.target.id)] != event.target.checked
                && !editHistory.includes(event.target.id)) {
                editHistory.push(event.target.id);
                event.target.classList.add("edited");
            }
            else if (initialValuesCol2[initialValuesCol1.indexOf(event.target.id)] != event.target.checked
                && editHistory.includes(event.target.id)) {
                // Do nothing
            }
            else if (editHistory.includes(event.target.id)) {
                editHistory.splice(editHistory.indexOf(event.target.id), 1);
                event.target.classList.remove("edited");
            }

        }
        // Radios are even weirder
        else if (event.target.type == "radio") {

            if (initialValuesCol2[initialValuesCol1.indexOf(event.target.id)] != event.target.checked
                && !editHistory.includes(event.target.name)) {
                editHistory.push(event.target.name);
                document.getElementById(event.target.name).classList.add("edited");
            }
            else if (initialValuesCol2[initialValuesCol1.indexOf(event.target.id)] != event.target.checked
                && editHistory.includes(event.target.name)) {
                // Do nothing
            }
            else if (editHistory.includes(event.target.name)) {
                editHistory.splice(editHistory.indexOf(event.target.name), 1);
                document.getElementById(event.target.name).classList.remove("edited");
            }

        }
        // Other elements are fine
        else {

            if (initialValuesCol2[initialValuesCol1.indexOf(event.target.id)] != event.target.value
                && !editHistory.includes(event.target.id)) {
                editHistory.push(event.target.id);
                event.target.classList.add("edited");
            }
            else if (initialValuesCol2[initialValuesCol1.indexOf(event.target.id)] != event.target.value 
                && editHistory.includes(event.target.id)) {
                // Do nothing
            }
            else if (editHistory.includes(event.target.id)) {
                editHistory.splice(editHistory.indexOf(event.target.id), 1);
                event.target.classList.remove("edited");
            }

        }
        checkEditHistory();
    }
}

// Check if any edits are remaining
function checkEditHistory() {
    // console.log(editHistory);
    if (editHistory.length == 0) {
        document.getElementById("save_button").disabled = true;
        document.getElementById("save_button").innerHTML = "No changes";
    }
    else {
        document.getElementById("save_button").disabled = false;
        document.getElementById("save_button").innerHTML = "Save changes";
    }
}


// Save with ctrl + s
document.addEventListener("keydown", e => {
    if ((e.ctrlKey && e.key === 's') || (e.metaKey && e.key === 's')) {
        // Prevent the Save dialog to open
        e.preventDefault();
        // Place your code here
        document.getElementById("save_button").click();
    }
});