import React, { Component } from 'react';

class AppFooter extends Component {

  render() {
    return (
      <div className="AppFooter">
		<div id="cartIcon"><span>0</span></div>
        <span id="displayItemTotal">$0.00</span>
        <span id="viewCartButton">View Cart</span>
      </div>
    );
  }
}

export default AppFooter;