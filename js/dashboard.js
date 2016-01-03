var React = require('react')
var Link = require('react-router').Link

var DashBoard = React.createClass({
    render: function() {
	return (
		<body>
		<header>
		<h1>Inventory Management System</h1>

		<nav>
		<Link to="/"><li>Dashboard</li></Link>
		<Link to="products"><li>Products</li></Link>
		<Link to="orders"><li>Orders</li></Link>
		<li className="active">Account Settings</li>
		</nav>
		</header>

		<main>
		{this.props.children}
		</main>
		<footer>
		IMS &copy; 2016.
	    </footer>

		</body>
	);
    }
});

module.exports = DashBoard;
