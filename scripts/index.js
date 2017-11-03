(function() {

    // MASTER ITEM LIST (AN ARRAY OF OBJECTS)

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

    // DEFINE GLOBAL VARIABLES

    var shoppingCart = []; //Initializing empty shopping cart array
    var numberOfItemsInCart = 0; //Initializing running total of items in cart
    var shoppingCartRunningTotal = 0; //Initializing shopping cart running dollar total
    var cartGrandTotal = 0;//Grand total of purchase, to be accessed by payment pages

    // BUILD ITEMS AND ADD TO SHOPPING PAGE

    masterItemList.forEach(function(item){
    	printItemToShopPage(item);
    });

    function printItemToShopPage(item) {//Updated all "var" declarations to "let", since this code is re-looped (we don't need to constantly re-declare the variables)
    	let itemContainer = $('<div></div>');//Creates Container
    	let namePTag = $('<h4>'+item.name+'</h4>');//Identifies Name
    	let pricePTag = $('<p>$'+item.price+'</p>');//Identifies Price
    	let classPTag = $('<p>'+item.class+'</p>');//Identifies Class
    	let descriptionPTag = $('<p>'+item.description+'</p>');//Identifies Description
    	
    	let itemContainerId = 'item'+item.itemNumber;//Identifies Item Number
    	$(itemContainer).attr('id', itemContainerId).attr('class', 'itemContainer');//Assigns number as ID to container

    	itemContainer.append(namePTag).append(pricePTag).append(classPTag).append(descriptionPTag);//adds info to container

    	$("#shopPage").append(itemContainer);//puts container in the DOM
    }

    // ADD ITEM TO SHOPPING CART

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

    	shoppingCart.push(addToCart);

    	console.log(shoppingCart);

        // NOTE:  Need to change shoppingCartRunningTotal to include tax.

        numberOfItemsInCart++;//Add one to number of items in cart
        shoppingCartRunningTotal = shoppingCartRunningTotal + addToCart.price;//Add price of selected item to running shopping cart total
        $("#displayItemTotal").text("$" + shoppingCartRunningTotal.toFixed(2));

        console.log(numberOfItemsInCart);
        console.log(shoppingCartRunningTotal);

    });

    // ACCESS PAYMENT PROCESS AND OPEN SHOPPING CART

    $("#viewCartButton").on("click", checkoutPage);//Upon clicking the view cart / checkout icon, launch the checkout page function.

    function checkoutPage() {
    	
        $("#checkoutContainer").css("display", "block");//Display the checkout containing element, which will house all of the subsequent checkout "pages".  (Defaulted to display: none)

        $("#cartPage").css("display", "block");//Display the cart page within the checkout container DIV.  (Defaulted to display: none)

        //NOTE: Presumably here we will want to add super-cool transition functionality for the cart page 
    	
        listItems(shoppingCart, "#shoppingCart", "#shoppingCartTotals"); //Run the list items function on the current shopping cart array, adding them to the checkout page

        $("#returnToShopPage").on("click", function () {

            $("#checkoutContainer").css("display", "none");//Display the checkout containing element, which will house all of the subsequent checkout "pages".  (Defaulted to display: none)

            $("#shoppingCart").html("");
            $("#shoppingCartTotals").html("");

        });

        $("#goToPaymentPage").on("click", function () {
            
            $("#cartPage").css("display", "none");//Cart page goes away.  Transitions pending.
            $("#cashOrCredit").css("display", "block");//Payment sequence continues on to cash or credit page.
            
        });

    }

    // LIST SHOPPING CART ITEMS

    // Note that this function is used both for the shopping cart and the receipt.  It takes three arguments:  the shopping cart array, the item list area into which we want to print the items, and the area in which we want to print the totals.

    function listItems(cartObject, listArea, totalsArea) {

        var cartSubTotal = 0;
        const salesTax = .06;

        $(listArea).html("");
        $(totalsArea).html("");

        cartObject.forEach(function(item) {

            let lineItemContainer = $('<div></div>');//Creates Container
            let lineItemPTag = $('<p>$' + item.price + ' - ' + item.name + '</p>');//Price of added item (and the item description)

            lineItemContainer.append(lineItemPTag);//Add item and price to container

            $(listArea).append(lineItemContainer);//place item container in the DOM

            cartSubTotal = cartSubTotal + item.price;//Add to cart sub-total

        });

        var taxAdded = cartSubTotal * salesTax;//Calculate added tax for order
        cartGrandTotal = cartSubTotal + taxAdded; //Grand total is sub-total including tax

        let subTotalPTag = $("<p>Sub Total: $" + cartSubTotal.toFixed(2) + "</p>");//Create sub-total HTML
        let salesTaxPTag = $("<p>Tax: $" + taxAdded.toFixed(2) + "</p>");//Create sales tax HTML
        let grandTotalPTag = $("<p>Grand Total: $" + cartGrandTotal.toFixed(2) + "</p>");//Create grand total HTML

        $(totalsArea).append(subTotalPTag).append(salesTaxPTag).append(grandTotalPTag);//Add totals to shopping cart container

    }

    // CASH OR CREDIT PAYMENT SELECTION

    $("#selectCash").on("click", function () {
        $("#cashOrCredit").css("display", "none");//Cash or credit "page" goes away.  Transitions pending.
        $("#cashTransaction").css("display", "block");//Payment sequence continues on to cash payment page.
        $("#displayChangeAmount").html("");//If change display is pre-filled out in the HTML DOM, clear it.
        $("#cashReceived").val("");
    });

    $("#selectCard").on("click", function () {
        $("#cashOrCredit").css("display", "none");//Cash or credit "page" goes away.  Transitions pending.
        $("#cardTransaction").css("display", "block");//Payment sequence continues on to card payment page.     
    });

    // CASH PAYMENT PROCESSING

    $("#submitCashAmount").on("click", function () {

        let totalCashReceived = $("#cashReceived").val();
        let changeAmount = totalCashReceived - cartGrandTotal;
        $("#displayChangeAmount").html("");

        // Add functionality which verifies that the total cash entered is at least equal to the sub-total.

        console.log(totalCashReceived);
        console.log(changeAmount);

        let cashReceivedPTag = $("<p>Cash Received: $" + totalCashReceived + "</p>");
        let cartGrandTotalPTag = $("<p>Total Purchase: $" + cartGrandTotal.toFixed(2) + "</p>");
        let changeAmountPTag = $("<p>Change: $" + changeAmount.toFixed(2) + "</p>");

        console.log(totalCashReceived);
        console.log(cartGrandTotalPTag);
        console.log(changeAmountPTag);


        $("#displayChangeAmount").append(cashReceivedPTag).append(cartGrandTotalPTag).append(changeAmountPTag);

        $("#cashToReceipt").on("click", function () {
            $("#cashTransaction").css("display", "none");//Cash transaction "page" goes away.  Transitions pending.
            showReceipt("cash");//Run the show receipt function; pass "cash" as payment method.
        });

    });

    // CREDIT CARD PAYMENT PROCESSING

    $("#verifyCardDetails").on("click", function () {

        //This area should include functionality to check whether the card number was entered correct, as well as the expiration date and security code.

        // Add a "fake delay" to this screen.  Also an animated gif of "processing".

        // The following items will need to be changed once the above has been ironed out.

        $("#cardTransaction").css("display", "none");//Card transaction "page" goes away.  Transitions pending.

        let cardNumber = $("#cardNumber").val();
        let cardExpiration = $("#cardExpiration").val();
        let cardCVV = $("#cardCVV").val();

        showReceipt("card");//Run the show receipt function; pass "card" as payment method.

    });

    // BUILD FINAL RECEIPT 

    function showReceipt(paymentMethod) {

        $("#receiptDisplay").css("display", "block");//Display receipt "page"

        listItems(shoppingCart, "#receiptItems", "#receiptTotals");//Call the listItems function to print items and prices to the receipt

        if (paymentMethod == "cash") {
            $("#paymentMethod").html("<p>Payment Method: Cash</p>");
        } else if (paymentMethod == "card") {
            $("#paymentMethod").html("<p>Payment Method: Credit Card</p>");
        } else {
            $("#paymentMethod").html("<p>Payment Method: Unknown</p>");   
        }

    }

    // FINISH ORDER AND RESET VARIABLES

    $("#newOrder").on("click", function() {

        $("#receiptDisplay").css("display", "none");//The receipt "page" goes away.  Transitions pending.

        $("#checkoutContainer").css("display", "none");//The checkout container DIV (which "floats" above the item selection area) goes away.  Transitions pending.

        // Need to reset all values for new order.

        shoppingCart = []; //Initializing empty shopping cart array
        numberOfItemsInCart = 0; //Initializing running total of items in cart
        shoppingCartRunningTotal = 0; //Initializing shopping cart running dollar total
        cartGrandTotal = 0;//Grand total of purchase, to be accessed by payment pages
        $("#displayItemTotal").text("$0.00");

    });

})();