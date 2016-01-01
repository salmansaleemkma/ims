var React = require('react')
var Link = require('react-router').Link

var DashBoard = React.createClass({
    render: function() {
	return (
		<div>
		<h1>Inventory Management System</h1>
		<ul>
		<li><Link to="/">Dashboard</Link></li>
		<li><Link to="/products">Products</Link></li>
		<li><Link to="/orders">Orders</Link></li>
		</ul>
		{this.props.children}
		</div>
	);
    }
});

module.exports = DashBoard;
