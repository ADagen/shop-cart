/**
 * @author dagen-niger
 */

App = function() {};

App.prototype = {
	constructor: App,
	initialize: function() {
		console.log('i am initialized');
		return this;
	},
	start: function() {
		console.log('i am started');
		var cart = new CartRouter({});
		$('body').append(cart.get$el());
		Backbone.history.start();

		setInterval(function() {
			this.add();
		}.bind(this), 1000);

		this.cart = cart;
		return this;
	},
	add: function() {
		console.log(this, this.cart);
		this.cart.add();
	},
	postToServer: function() {
		console.log('sync');
	},
	getFromServer: function() {
		console.log('sync');
	}
};