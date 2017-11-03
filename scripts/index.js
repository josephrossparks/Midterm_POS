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
            name: 'Groovy Green Goddess ',
            price: 4,
            class: 'Juice',
            description: "Get your groove back with nature's finest greens.",
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
            description: 'Can make any day of the week happy.',
            itemNumber: 11
        },
        {
            name: 'Berry Carrot Dream',
            price: 4,
            class: 'Juice',
            description: 'The purest juice from delicious carrots.',
            itemNumber: 12
        }
    ];

    // DEFINE GLOBAL VARIABLES

    var shoppingCart = []; //Initialize empty shopping cart array
    var numberOfItemsInCart = 0; //Initialize running total of items in cart
    var shoppingCartRunningTotal = 0; //Initialize shopping cart running dollar total
    var cartGrandTotal = 0;//Initialize grand total of purchase, to be accessed by payment pages

    // BUILD ITEMS AND ADD TO SHOPPING PAGE

    masterItemList.forEach(function(item){//For Each loop; goes through product array and renders to the shopping page.
    	printItemToShopPage(item);
    });

    function printItemToShopPage(item) {//QUESTION:  Are we constantly re-declaring the variables with each iteration?  Also, is it necessary to encompass strings in a jQuery statement?
    	let itemContainer = $('<div></div>');//Creates item container
    	let namePTag = $('<h4>'+item.name+'</h4>');//Creates item name HTML string
    	let pricePTag = $('<p><b>$'+item.price+'</b></p>');//Creates item price HTML string
    	let classPTag = $('<p>'+item.class+'</p>');//Creates item class HTML string
    	let descriptionPTag = $('<p>'+item.description+'</p>');//Creates item description HTML string
    	
    	let itemContainerId = 'item'+item.itemNumber;//Builds item container ID from item number (e.g. item1, item2, item3, et cetera)
    	$(itemContainer).attr('id', itemContainerId).attr('class', 'itemContainer');//Assigns ID to item container

    	itemContainer.append(namePTag).append(pricePTag).append(classPTag).append(descriptionPTag);//adds info to container

    	$("#shopPage").append(itemContainer);//Places container in the HTML DOM
    }

    // ADD ITEM TO SHOPPING CART

    $(".itemContainer").on("click", function(event) {

    	var itemSelected = $(this).attr("id");//Acquire ID of selected item container
    	var itemSelectedId = itemSelected.substr(4);//Remove first four characters from the itemSelected ("item"), thereby resulting in just the number
    	var itemAddedToCart = matchProductId(itemSelectedId);//Run matchProductID function, which will return an item object.  Add this to variable itemAddedToCart.

    	function matchProductId(id) {//Iterate through product list array until itemNumber matches container ID; return the item object
        	let len = masterItemList.length;
        	for (let i = 0; i < len; i++) {
            	if (masterItemList[i].itemNumber == id) {
                	return masterItemList[i];
            	}
        	}
    	return null;//If no matching item is found, return null.  This should never happen.
        }

    	shoppingCart.push(itemAddedToCart);//Add selected item object to shopping cart array

        // NOTE:  Need to change shoppingCartRunningTotal to include tax; this will result in a better user experience through the payment process.

        numberOfItemsInCart++;//Add one to number of items in cart; this can (should?) be displayed next to the cart icon.
        shoppingCartRunningTotal = shoppingCartRunningTotal + itemAddedToCart.price;//Add price of selected item to running shopping cart total
        $("#displayItemTotal").text("$" + shoppingCartRunningTotal.toFixed(2));//Update running cart total to the HTML DOM

    });

    // ACCESS PAYMENT PROCESS AND OPEN SHOPPING CART

    $("#viewCartButton").on("click", checkoutPage);//Upon clicking the view cart / checkout icon, launch the checkout page function.

    function checkoutPage() {//NOTE:  Here the function is defined rather than being anonymous.  We need to be consistent and use defined functions or anonymous. 
    	
        $("#checkoutContainer").css("display", "block");//Display the checkout containing element, which will house all of the subsequent checkout "pages".  (Defaulted to display: none)

        $("#cartPage").css("display", "block");//Display the cart page within the checkout container DIV.  (Defaulted to display: none)

        //NOTE: Presumably here we will want to add super-cool transition functionality for the cart page 
    	
        listItems(shoppingCart, "#shoppingCart", "#shoppingCartTotals"); //Run the list items function on the current shopping cart array, adding them to the checkout page

        $("#returnToShopPage").on("click", function () {

            $("#checkoutContainer").css("display", "none");//Display the checkout containing element, which will house all of the subsequent checkout "pages".  (Defaulted to display: none)

        });

        $("#goToPaymentPage").on("click", function () {//When user clicks on the go to payment button...
            
            $("#cartPage").css("display", "none");//Cart page goes away.  Transitions pending.
            $("#cashOrCredit").css("display", "block");//Payment sequence continues on to cash or credit page.
            
        });

    }

    // LIST SHOPPING CART ITEMS

    // Note that this function is used both for the shopping cart and the receipt.  It takes three arguments:  the shopping cart array, the item list area into which we want to print the items, and the area in which we want to print the totals.

    function listItems(cartObject, listArea, totalsArea) {

        var cartSubTotal = 0;//Reset cart subtotal to zero
        const salesTax = .06;//Initialize and define sales tax

        $(listArea).html("");//If there is any existing HTML in the item list area, remove it.
        $(totalsArea).html("");//If there is any existing HTML in the item totals area, remove it.

        cartObject.forEach(function(item) {//Again: we seem to be declaring variables for each iteration.  Also, HTML DOM strings likely do not need to be defined as jQuery objects.

            let lineItemContainer = $('<div></div>');//Creates container for item name and price
            let lineItemPTag = $('<p>$' + item.price + ' - ' + item.name + '</p>');//Create HTML for price and description of added item

            lineItemContainer.append(lineItemPTag);//Add item and price to container

            $(listArea).append(lineItemContainer);//place item container in the HTML DOM

            cartSubTotal = cartSubTotal + item.price;//Add to cart sub-total

        });

        var taxAdded = cartSubTotal * salesTax;//Calculate added tax for order
        cartGrandTotal = cartSubTotal + taxAdded; //Grand total is sub-total including tax

        let subTotalPTag = $("<p>Sub Total: $" + cartSubTotal.toFixed(2) + "</p>");//Create sub-total HTML
        let salesTaxPTag = $("<p>Tax: $" + taxAdded.toFixed(2) + "</p>");//Create sales tax HTML
        let grandTotalPTag = $("<p>Grand Total: $" + cartGrandTotal.toFixed(2) + "</p>");//Create grand total HTML

        $(totalsArea).append(subTotalPTag).append(salesTaxPTag).append(grandTotalPTag);//Add totals to container

    }

    // CASH OR CREDIT PAYMENT SELECTION

    $("#selectCash").on("click", function () {//When user clicks on "cash"...
        $("#cashOrCredit").css("display", "none");//Cash or credit "page" goes away.  Transitions pending.
        $("#cashTransaction").css("display", "block");//Payment sequence continues on to cash payment page.
        $("#displayChangeAmount").html("");//If change display is pre-filled out in the HTML DOM, clear it.
        $("#cashReceived").val("");//Clear any lingering HTML DOM elements associated with the cash payment calculations.
    });

    $("#selectCard").on("click", function () {//When user clicks on "card"...
        $("#cashOrCredit").css("display", "none");//Cash or credit "page" goes away.  Transitions pending.
        $("#cardTransaction").css("display", "block");//Payment sequence continues on to card payment page.     
    });

    // CASH PAYMENT PROCESSING

    $("#submitCashAmount").on("click", function () {//User enters cash received from customer and clicks the button...

        $("#displayChangeAmount").html("");//If the display change area contains existing HTML, remove it.  This allows for multiple attempts at calculating change.
        let totalCashReceived = $("#cashReceived").val();//Acquire user input from text box
        let changeAmount = totalCashReceived - cartGrandTotal;//Calculate change

        // NOTE:  Need to add functionality which verifies that the total cash entered is at least equal to the sub-total.

        let cashReceivedPTag = $("<p>Cash Received: $" + totalCashReceived + "</p>");//Build HTML for displaying cash received
        let cartGrandTotalPTag = $("<p>Total Purchase: $" + cartGrandTotal.toFixed(2) + "</p>");//Build HTML for displaying grand total
        let changeAmountPTag = $("<p>Change: $" + changeAmount.toFixed(2) + "</p>");//Build HTML for displaying change

        $("#displayChangeAmount").append(cashReceivedPTag).append(cartGrandTotalPTag).append(changeAmountPTag);//Add cash transaction info to the HTML DOM

        $("#cashToReceipt").on("click", function () {//When the user clicks on the continue button...
            $("#cashTransaction").css("display", "none");//Cash transaction "page" goes away.  Transitions pending.
            showReceipt("cash");//Run the show receipt function; pass "cash" as payment method.
        });

    });

    // CREDIT CARD PAYMENT PROCESSING

    $("#verifyCardDetails").on("click", function () {//The user enters credit card information and clicks the button...

        let cardNumber = $("#cardNumber").val();//Acquire user input from card number text box.
        let cardExpiration = $("#cardExpiration").val();//Acquire user input from card expiration text box.
        let cardCVV = $("#cardCVV").val();//Acquire user input from card CVV text box.

        //This area should include functionality to check whether the card number was entered correct, as well as the expiration date and security code.

        //Perhaps add a "fake delay" to this screen and an animated gif of "processing".

        // The following script will need to be changed once the above has been ironed out.

        $("#cardTransaction").css("display", "none");//Card transaction "page" goes away.  Transitions pending.

        showReceipt("card");//Run the show receipt function; pass "card" as payment method.  It would be kinda cool to also pass the last four digits of the card number.

    });

    // BUILD FINAL RECEIPT 

    function showReceipt(paymentMethod) {//This function is called when continuing from the cash or card payment pages.

        $("#receiptDisplay").css("display", "block");//Display receipt "page"

        listItems(shoppingCart, "#receiptItems", "#receiptTotals");//Call the listItems function to print items and prices to the receipt

        if (paymentMethod == "cash") {//Payment method was passed in as a parameter to the function, so...
            $("#paymentMethod").html("<p>Payment Method: Cash</p>");//If the payment method was cash, print cash payment to the HTML DOM.
        } else if (paymentMethod == "card") {
            $("#paymentMethod").html("<p>Payment Method: Credit Card</p>");//If the payment method was a credit card, print card payment to the HTML DOM.
        } else {
            $("#paymentMethod").html("<p>Payment Method: Other</p>");//If paymentMethod was anything else, print other payment.  This should never happen.
        }

    }

    // FINISH ORDER AND RESET VARIABLES

    $("#newOrder").on("click", function() {//When the user clicks on the "finish" button after receiving a receipt...

        $("#receiptDisplay").css("display", "none");//The receipt "page" goes away.  Transitions pending.

        $("#checkoutContainer").css("display", "none");//The checkout container DIV (which "floats" above the item selection area) goes away.  Transitions pending.

        // Need to reset all values for new order.

        shoppingCart = []; //Empty the shopping cart array
        numberOfItemsInCart = 0; //Set running total of items in cart to zero
        shoppingCartRunningTotal = 0; //Set shopping cart running dollar total to zero
        cartGrandTotal = 0;//Reset grand total of purchase
        $("#displayItemTotal").text("$0.00");//Reset the displayed item total to zero in the HTML DOM

    });

})();