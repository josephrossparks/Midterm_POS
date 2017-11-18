import React, { Component } from 'react';

class MenuItem extends Component {

  render() {
    return (
		<div className="MenuItem" id={this.props.item.code}>
			<h4>{this.props.item.name}</h4>
			<p>{this.props.item.price}</p>
			<p>{this.props.item.class}</p>
			<p>{this.props.item.description}</p>
		</div>
    );
  }
}

export default MenuItem;