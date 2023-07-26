var options = document.getElementById("ddl_options");
options.addEventListener("change", updateOptionCostField);
options.addEventListener("click", updateOptionCostField);
options.click();

function updateOptionCostField(event) {
    var selectedIndex = event.target.selectedIndex;
    var innerHTML = event.target.children.item(selectedIndex).innerHTML;
    var itemCost = innerHTML.substring(innerHTML.indexOf("$"), innerHTML.indexOf("EACH") - 1);
    var textField = document.getElementById(event.target.id + "_displayField");
    textField.value = itemCost;
}