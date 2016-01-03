var React = require('react')
var $ = require('jquery')

var ProductList = React.createClass({
    getInitialState: function() {
	return {data: []};
    },
    componentDidMount: function() {
	$.ajax({
	    url: "http://localhost:5000/products",
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
	    <div className="productList">
	    <h1 >Products</h1>
	    <Product data={this.state.data}></Product>
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
	    else if(product.item_description.indexOf(queryText)!=-1){
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
	    <div>
	    <input type="search" placeholder="search products..." ref="searchInput" value={this.props.query} onChange={this.doSearch}/>
	    </div>
	    
	);

    }
});

var SearchedProduct = React.createClass({
    render: function() {

	var productNodes = this.props.data.map(function (product) {
	    return (
		    <div className="product card">
		    <h5>{product.item_name}</h5>
		    <p>{product.item_units} units </p>
		    <p>{product.item_description}</p>
		    <p>{product.item_type}</p>
		    <b>Rs.</b>{product.item_price} per unit.<br/>
		    </div>
	    );
	});
	return (
		<div className="product-result">
		<p>Result: <span>{ this.props.data.length }</span> items found</p>
		{productNodes}
	    </div>
	);
    }
});

module.exports = ProductList;
