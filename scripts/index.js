(function() {

//Master Item Array
var masterItemList = [
	{
		name: 'Grape Juice',
		price: 4,
		class: 'juice',
		description: 'The purest juice from delicious grapes.',
		itemNumber: 1
	},
	{
		name: 'Apple Juice',
		price: 3,
		class: 'juice',
		description: 'We squeezed an apple into a cup!',
		itemNumber: 2
	},
	{
		name: 'Kiwi Lime Blitz',
		price: 5,
		class: 'smoothie',
		description: 'Savory blend of kiwis, lime juice, and sorbet.',
		itemNumber: 3
	},
	{
		name: 'Mango Guava Jive',
		price: 6,
		class: 'smoothie',
		description: 'Put the mango in the guava and what do you get?',
		itemNumber: 4
	}
];

var shoppingCart = []; //Initializing empty shopping cart array
var numberOfItemsInCart = 0; //Initializing running total of items in cart
var shoppingCartRunningTotal = 0; //Initializing shopping cart running dollar total

//This function prints all the items to the shop page.
masterItemList.forEach(function(item){
	printItemToShopPage(item);
});


//This function finds the info of each object, creates a container, fills it, and places it in the DOM.
function printItemToShopPage(item) {//Updated all "var" declarations to "let", since this code is re-looped (we don't need to constantly re-declare the variables)
	let itemContainer = $('<div></div>');//Creates Container
	let namePTag = $('<p>'+item.name+'</p>');//Identifies Name
	let pricePTag = $('<p>'+item.price+'</p>');//Identifies Price
	let classPTag = $('<p>'+item.class+'</p><');//Identifies Class
	let descriptionPTag = $('<p>'+item.description+'</p>');//Identifies Description
	
	let itemContainerId = 'item'+item.itemNumber;//Identifies Item Number
	$(itemContainer).attr('id', itemContainerId).attr('class', 'itemContainer');//Assigns number as ID to container

	itemContainer.append(namePTag).append(pricePTag).append(classPTag).append(descriptionPTag);//adds info to container

	$("#shopPage").append(itemContainer);//puts container in the DOM
}

//The following function triggers the addition of a selected item to the shopping cart.
$(".itemContainer").on("click", function(event) {

	var itemSelected = $(this).attr("id");//acquire ID of selected item container
	var itemSelectedId = itemSelected.CharAt(4);//acquire 5th character from container ID (the number itself)

	var addToCart = function(itemNum) {//Iterate through product list array until itemNumber matches container ID; return this object
    	for (var i = 0, len = masterItemList.length; i < len; i++) {
        	if (masterItemList[i].itemNumber === itemSelectedId) {
            	return masterItemList[i];
        	} else {
        		return null;
        	}
    	}
    };	
    	
    pos = shoppingCart.length();//Determine number of objects in shopping cart array
    shoppingCart[pos] = addToCart;//Drop selected item into next empty slot in shopping cart array (remember that the first position is zero, the second is one, and so forth)

    numberOfItemsInCart++;//Add one to number of items in cart
    shoppingCartRunningTotal = shoppingCartRunningTotal + addToCart.price;//Add price of selected item to running shopping cart total

});

$(".viewCart").on("click", checkoutPage);//Upon clicking the view cart / checkout icon, launch the checkout page function.

function checkoutPage() {
	
	$(".checkoutPage").css("display", "block");//Display checkoutPage DIV (defaulted to display: none)
	//NOTE: Presumably here we will want to add super-cool transition functionality.
	listItems(shoppingCart); //Run the list items function on the current shopping cart array, adding them to the checkout page

	// Run a sub-function called listItems() which parses the shopping cart array, listing all of the items in the cart.
	// After running listItems(), do the math to determine a sub-total, add tax, and then create a grand total.
	// Add two buttons:  one which closes the checkoutPage and one which moves forward to the payment page.
}

// The following function adds the shopping cart to the checkout page and displays the totals.

function listItems() {

	var cartSubTotal;
	const salesTax = .06;

	shoppingCart.forEach(function(item){

		let lineItemContainer = $('<div></div>');//Creates Container
		let lineItemPTag = $('<p>'+item.name+'</p>');//List item added
		let lineItemPricePTag = $('<p>'+item.price+'</p>');//Price of added item

		lineItemContainer.append(lineItemPTag).append(lineItemPTag);//Add item and price to container

		$("#shoppingCart").append(itemContainer);//place item container in the DOM

		cartSubTotal = cartSubTotal + item.price;//Add to cart sub-total

	});

	var cartGrandTotal = cartSubTotal * (cartSubTotal * salesTax); //Grand total is sub-total including tax

	let subTotalPTag = $("<p>Sub Total: $" + cartSubTotal + "</p>");//Create sub-total HTML
	let salesTaxPTag = $("<p>Sales Tax: " + (salesTax*100) + "%</p>");//Create sale stax HTML
	let grandTotalPTag = $("<p>Grand Total: $" + cartGrandTotal + "</p>");//Create grand total HTML

	$("#shoppingCart").append(subTotalPTag).append(salesTaxPTag).append(grandTotalPTag);//Add totals to shopping cart container

}

})();