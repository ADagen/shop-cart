/**
 * @author dagen-niger
 */

ShopCart = function(options) {
	this.options = options;
	this.initialize();
};

ShopCart.prototype = {
	constructor: ShopCart,
	initialize: function() {
		jQuery(document).ready(function() {
			this.start();
		}.bind(this));
		console.log('i am initialized with options', this.options);
		return this;
	},
	start: function() {
		console.log('i am started');

		var cartModel = new Cart.Model();
		this.cart = new Cart.View({
			nest: $('body'),
			model: cartModel
		});

		Backbone.history.start();
		return this;
	},
	add: function(options) {
		console.log(this, this.cart);
		this.cart.add(options);
	},
	postToServer: function() {
		console.log('sync');
	},
	getFromServer: function() {
		console.log('sync');
	}
};