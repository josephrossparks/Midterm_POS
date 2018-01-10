import React, { Component } from 'react';

class OriginalCode extends Component {

  render() {
    return (
      
      	<div className="OriginalCode">

	        <h1>Select Your Items</h1>
		    <div id="shopPage"></div>

		    <div id="cartFooterContainer">
		      <div id="cartFooter">
		        <div id="cartIcon"><span>0</span></div>
		        <span id="displayItemTotal">$0.00</span>
		        <span id="viewCartButton">View Cart</span>
		      </div>
		    </div>

		    <div id="checkoutContainer">
		      <div id="cartPage">
		        <h3>Cart Details</h3>
		        <div id="shoppingCart"></div>
		        <div id="shoppingCartTotals"></div>
		        <div id="shoppingCartButtons">
		          <button id="returnToShopPage">Continue Shopping</button>
		          <button id="goToPaymentPage">Checkout</button>
		        </div>
		      </div>


		      <div id="cashOrCredit">
		        <h3>How would you like to pay?</h3>
		        <h1 id="selectCash">Cash</h1>
		        <p>or</p>
		        <h1 id="selectCard">Card</h1>
		      </div>


		      <div id="cashTransaction">
		        <h3>Enter Cash Recieved</h3>
		        <p>Hit enter to calculate change:</p>
		        <input type="text" id="cashReceived" placeholder="0.00" />
		        <button id="submitCashAmount">Enter</button>
		        <div id="displayChangeAmount"></div>

		        <h4 id="cashToReceipt">Continue</h4>
		      </div>


		      <div id="cardTransaction">
		        <h3>Enter Card Details</h3>
		        <input type="text" id="cardNumber" placeholder="00000000000000000" />
		        <input type="text" id="cardExpiration" placeholder="MMYY" />
		        <input type="text" id="cardCVV" placeholder="CVV" />
		        <button id="verifyCardDetails">Pay</button>
		      </div>

		      <div id="receiptDisplay">
		        <h3>Thank You!</h3>
		        <div id="transactionReceipt">
		          <div id="receiptItems"></div>
		          <div id="receiptTotals"></div>
		          <div id="paymentMethod"></div>
		        </div>
		        <h4 id="newOrder">Finish</h4>
		      </div>

		    </div> 

	    </div>
    );
  }
}

export default OriginalCode;