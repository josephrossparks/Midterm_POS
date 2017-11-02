(function() {

//Master Item Array
var masterItemList = [
    {
        name: 'Grape Juice',
        price: 4,
        class: 'Juice',
        description: 'The purest juice from delicious grapes.',
        itemNumber: 1
    },
    {
        name: 'Apple Juice',
        price: 3,
        class: 'Juice',
        description: 'We squeezed an apple into a cup!',
        itemNumber: 2
    },
    {
        name: 'Kiwi Lime Blitz',
        price: 5,
        class: 'Smoothie',
        description: 'Savory blend of kiwis, lime juice, and sorbet.',
        itemNumber: 3
    },
    {
        name: 'Mango Guava Jive',
        price: 6,
        class: 'Smoothie',
        description: 'Put the mango in the guava and what do you get?',
        itemNumber: 4
    },
    {   name: 'Pomegranate Passion',
        price: 5,
        class: 'Smoothie',
        description: 'A passionate combination of pomegranate and pineapple.',
        itemNumber: 5
    },
    {
        name: 'Groovey Green Goddess ',
        price: 4,
        class: 'Juice',
        description: 'Get your groove back with natures finest greens.',
        itemNumber: 6
    },
    {
        name: 'Pink Lady',
        price: 4,
        class: 'Juice',
        description: 'Put some pink in your cheeks with the sweetest pink grapefruit.',
        itemNumber: 7
    },
    {
        name: 'Jungle Juice',
        price: 6,
        class: 'Juice',
        description: 'The purest juice from spinach and tropical fruits',
        itemNumber: 8
    },
    {
        name: 'Pineapple Pleasure',
        price: 5,
        class: 'Smoothie',
        description: 'If pineapple pleases you then this is the smoothie for you.',
        itemNumber: 9
    },
    {
        name: 'Pineapple Juice',
        price: 4,
        class: 'Juice',
        description: 'The crazy crash of juice from delicious pineapple.',
        itemNumber: 10
    },
    {
        name: 'Happy Monday',
        price: 7,
        class: 'Juice',
        description: 'Can make anyday of the week happy.',
        itemNumber: 11
    },
    {
        name: ' Berry Carrot Dream',
        price: 4,
        class: 'Juice',
        description: 'The purest juice from delicious carrots.',
        itemNumber: 12
    }
];

var shoppingCart = []; //Initializing empty shopping cart array
var numberOfItemsInCart = 0; //Initializing running total of items in cart
var shoppingCartRunningTotal = 0; //Initializing shopping cart running dollar total
var cartGrandTotal = 0;//Grand total of purchase, to be accessed by payment pages

//This function prints all the items to the shop page.
masterItemList.forEach(function(item){
	printItemToShopPage(item);
});


//This function finds the info of each object, creates a container, fills it, and places it in the DOM.

function printItemToShopPage(item) {//Updated all "var" declarations to "let", since this code is re-looped (we don't need to constantly re-declare the variables)
	let itemContainer = $('<div></div>');//Creates Container
	let namePTag = $('<h4>'+item.name+'</h4>');//Identifies Name
	let pricePTag = $('<p><b>'+item.price+'</b></p>');//Identifies Price
	let classPTag = $('<p>'+item.class+'</p>');//Identifies Class
	let descriptionPTag = $('<p>'+item.description+'</p>');//Identifies Description
	
	let itemContainerId = 'item'+item.itemNumber;//Identifies Item Number
	$(itemContainer).attr('id', itemContainerId).attr('class', 'itemContainer');//Assigns number as ID to container

	itemContainer.append(namePTag).append(pricePTag).append(classPTag).append(descriptionPTag);//adds info to container

	$("#shopPage").append(itemContainer);//puts container in the DOM
}


//The following function triggers the addition of a selected item to the shopping cart.
$(".itemContainer").on("click", function(event) {

	var itemSelected = $(this).attr("id");//acquire ID of selected item container
	// console.log(itemSelected);
	var itemSelectedId = itemSelected.substr(4);//remove first four characters from the itemSelected ("item"), thereby resulting in just the number
	// console.log(itemSelectedId);
	var addToCart = matchProductId(itemSelectedId);

	function matchProductId(id) {//Iterate through product list array until itemNumber matches container ID; return this object
    	let len = masterItemList.length;
    	for (let i = 0; i < len; i++) {
        	if (masterItemList[i].itemNumber == id) {
            	return masterItemList[i];
        	}
    	}
	return null;
    }
    	
    /*	
    pos = shoppingCart.length;//Determine number of objects in shopping cart array
    shoppingCart[pos] = addToCart;//Drop selected item into next empty slot in shopping cart array (remember that the first position is zero, the second is one, and so forth)
	*/

	shoppingCart.push(addToCart);

	console.log(shoppingCart);

    numberOfItemsInCart++;//Add one to number of items in cart
    shoppingCartRunningTotal = shoppingCartRunningTotal + addToCart.price;//Add price of selected item to running shopping cart total
    $("#displayItemTotal").text("$" + shoppingCartRunningTotal.toFixed(2));

    console.log(numberOfItemsInCart);
    console.log(shoppingCartRunningTotal);

});

$("#viewCartButton").on("click", checkoutPage);//Upon clicking the view cart / checkout icon, launch the checkout page function.

function checkoutPage() {
	
    $("#checkoutContainer").css("display", "block");//Display the checkout containing element, which will house all of the subsequent checkout "pages".  (Defaulted to display: none)

    //NOTE: Presumably here we will want to add super-cool transition functionality for the cart page 
	
    listItems(shoppingCart); //Run the list items function on the current shopping cart array, adding them to the checkout page

    $("#returnToShopPage").on("click", function () {

        $("#checkoutContainer").css("display", "none");//Display the checkout containing element, which will house all of the subsequent checkout "pages".  (Defaulted to display: none)

        $("#shoppingCart").html("");
        $("#ShoppingCartTotals").html("");

    });

    $("#makePayment").on("click", function () {
        
        $("#cartPage").css("display", "none");//Cart page goes away.  Transitions pending.
        $("#cashOrCredit").css("display", "block");//Payment sequence continues on to cash or credit page.
        
    });
}

// The following function adds the shopping cart to the checkout page and displays the totals.

function listItems(cartObject) {

	var cartSubTotal = 0;
	const salesTax = .06;

	cartObject.forEach(function(item) {

		let lineItemContainer = $('<div></div>');//Creates Container
		let lineItemPTag = $('<p>'+item.name+'</p>');//List item added
		let lineItemPricePTag = $('<p>$'+item.price+'</p>');//Price of added item

		lineItemContainer.append(lineItemPTag).append(lineItemPricePTag);//Add item and price to container

		$("#shoppingCart").append(lineItemContainer);//place item container in the DOM

		cartSubTotal = cartSubTotal + item.price;//Add to cart sub-total

	});

	var taxAdded = cartSubTotal * salesTax;//Calculate added tax for order
	cartGrandTotal = cartSubTotal + taxAdded; //Grand total is sub-total including tax

	let subTotalPTag = $("<p>Sub Total: $" + cartSubTotal.toFixed(2) + "</p>");//Create sub-total HTML
	let salesTaxPTag = $("<p>Tax: $" + taxAdded.toFixed(2) + "</p>");//Create sales tax HTML
	let grandTotalPTag = $("<p>Grand Total: $" + cartGrandTotal.toFixed(2) + "</p>");//Create grand total HTML

	$("#shoppingCartTotals").append(subTotalPTag).append(salesTaxPTag).append(grandTotalPTag);//Add totals to shopping cart container
}

})();