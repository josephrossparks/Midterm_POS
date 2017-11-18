import React, { Component } from 'react';
import ShopPage from './ShopPage';
import AppFooter from './AppFooter';

class AppContainer extends Component {

  render() {
    return (
      <div className="AppContainer">
        <h1>Select Your Items</h1>
        <ShopPage />
        <AppFooter />
      </div>
    );
  }
}

export default AppContainer;