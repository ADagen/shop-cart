/**
 * @author dagen-niger
 */

ShopCart = function(options) {
	this.options = _.extend({
		endpoint: 'serverResponse.json'
	}, options);
	this.initialize();
};

// унаследую от Backbone.Events,
// чтобы делегировать нужные события внутренних моделей и
ShopCart.prototype = Object.create(Backbone.Events);

_.extend(ShopCart.prototype, {
	constructor: ShopCart,
	initialize: function() {
		jQuery(document).ready(this.start.bind(this));
		console.log('i am initialized with options', this.options);
		return this;
	},
	start: function() {
		console.log('ShopCart: i am started', this);

		this.cartModel = new Cart.Model({
			url: this.options.endpoint
		});
		this.cart = new Cart.View({
			nest    : $('body'),
			model   : this.cartModel
		});

		return this;
	},
	add: function(options) {
		this.cart.add(options);
	},
	push: function() {
		this.cartModel.container.pushData();
	},
	pull: function() {
		this.cartModel.container.pullData();
	}
});