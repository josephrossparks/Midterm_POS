import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuItem from './MenuItem';

class ShopPage extends Component {

	render() {
		const menuItemList = this.props.menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
        ));
    	return (
    		<div className="ShopPage">
    			{menuItemList}
    		</div>
		);
    }
}

const mapStateToProps = (state) => {
  return {
    menuItems: state.menuItems
  };
};

export default connect(mapStateToProps)(ShopPage);

