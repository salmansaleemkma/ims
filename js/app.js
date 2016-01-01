var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router
var Route = require('react-router').Route
var browserHistory = require('react-router').browserHistory
var IndexRoute = require('react-router').IndexRoute

var DashBoard = require('./dashboard')
var OrdersList = require('./orders')
var Home = require('./mainpage')
var ProductList = require('./products')

ReactDOM.render(
	<Router history={browserHistory}>
	<Route path="/" component={DashBoard}>
	<IndexRoute component={Home} />
	<Route path="/products" component={ProductList} />
	<Route path="/orders" component={OrdersList} />
	</Route>
	</Router>,
    document.getElementById('ims-app'));
