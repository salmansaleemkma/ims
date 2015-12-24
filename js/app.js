var React = require('react');
var ReactDOM = require('react-dom');

require('materialize-css/dist/css/materialize.css');
require('materialize-css/dist/js/materialize.js');

var ProductList = React.createClass({
    getInitialState: function() {
	return {data: []};
    },
    componentDidMount: function() {
	$.ajax({
	    url:this.props.url,
	    dataType: 'json',
	    cache: false,
	    success: function(data) {
		this.setState({data: data});
	    }.bind(this),
	    error: function(xhr,status, err){
		console.error(this.props.url, status, err.toString());
	    }.bind(this)
	});
    },
    render: function() {
	return (
	    <div className="row">
	    <div className="productList">
	    <h1 className="teal-text">Products</h1>
	    <Product data={this.state.data}></Product>
	    </div>
	    </div>
	);
    }
});

var Product = React.createClass({
    doSearch:function(queryText){
	var queryResult = [];
	this.props.data.forEach(function(product){
	    if(product.item_name.toLowerCase().indexOf(queryText)!=-1) {
		queryResult.push(product);
	    }
	    else if(product.item_description.toLowerCase().indexOf(queryText)!=-1){
		queryResult.push(product);
	    }

	});

	this.setState({
	    query: queryText,
	    filteredData: queryResult
	})
    },
    getInitialState:function(){
	return {
	    query:'',
	    filteredData: this.props.data
	}
    },
    render: function() {
	var passingData = [];
	if(this.state.filteredData&&this.state.query == '') {
	    passingData = this.props.data;
	} else {
	    passingData = this.state.filteredData;
	}
	return (
	    <div className="products">
	    <SearchBox query={this.state.query} doSearch={this.doSearch}/>
	    <SearchedProduct data={passingData}/>
	    </div>
	);
    }
});

var SearchBox = React.createClass({
    doSearch:function(){
	var query = this.refs.searchInput.getDOMNode().value;
	this.props.doSearch(query);
    },
    render:function(){
	return (
	    <div className="row">
	    <div className="col s6">
	    <div className="input-field">
	    <input type="search" ref="searchInput" value={this.props.query} onChange={this.doSearch}/>
	    <label>search</label>
	    <i className="material-icons">search</i>
	    </div>
	    </div>
	    <div className="col s4">
	    <a className="btn-floating btn-small waves-effect waves-light"><i className="material-icons" title="Add New Product">add</i></a>
	    </div>
	    </div>
	    
	);

    }
});

var SearchedProduct = React.createClass({
    render: function() {

	var productNodes = this.props.data.map(function (product) {
	    if(product.item_units < 150){
		return (
		    <div className="col s6">
		    <div className="card-panel hoverable #bcaaa4 brown lighten-3">
		    <div className="product">
		    <span className="right teal-text">{product.item_units} units</span>
		    <h5 className="truncate">{product.item_name}</h5>
		    <p className="truncate">{product.item_description}</p>
		    <span className="right chip">{product.item_type}</span>
		    <b>Rs.</b>{product.item_price} per unit.<br/>
		    </div>
		    </div>
		    </div>
		);

	    }
	    else return (
		<div className="col s6">
		<div className="card-panel hoverable">
		<div className="product">
		<span className="right teal-text">{product.item_units} units</span>
		<h5 className="truncate">{product.item_name}</h5>
		<p className="truncate">{product.item_description}</p>
		<span className="right chip">{product.item_type}</span>
		<b>Rs.</b>{product.item_price} per unit.<br/>
		</div>
		</div>
		</div>

	    );
	});
	return (
	    <div className="searching-product">
	    <p>Result: <span className="teal-text">{ this.props.data.length }</span> items found</p>
	    {productNodes}
	    </div>
	);
    }
});


ReactDOM.render(
    <ProductList url="http://localhost:5000/products" />,
    document.getElementById('ims-app'));
