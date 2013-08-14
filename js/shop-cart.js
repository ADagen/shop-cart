/**
 * @author dagen-niger
 */

ShopCart = function(options) {
	this.options = _.extend({
		endpoint: '/'
	}, options);
	this.initialize();
};

// унаследую от Backbone.Events,
// чтобы делегировать нужные события внутренних моделей/представлений
// тогда внешний код не будет зависеть от структуры ShopCart
ShopCart.prototype = Object.create(Backbone.Events);

_.extend(ShopCart.prototype, {
	constructor: ShopCart,
	initialize: function() {
		jQuery(document).ready(this.start.bind(this));
		console.log('ShopCart initialized with options', this.options);
		return this;
	},

	/**
	 * Старт корзины (когда приложение готово)
	 * @return {ShopCart}
	 */
	start: function() {
		console.log('ShopCart started', this);

		this.cartModel = new Cart.Model({
			url: this.options.endpoint
		});
		this.cart = new Cart.View({
			nest    : $('body'),
			model   : this.cartModel
		});

		return this;
	},

	/**
	 * Добавление товара
	 * @param {object} options
	 * @return {ShopCart}
	 */
	add: function(options) {
		this.cart.add(options);
		return this
	},

	/**
	 * Удаление товара по переданному при добавлении _id
	 * @param {number} _id
	 * @return {ShopCart}
	 */
	remove: function(_id) {
		this.cart.removeBundle(_id);
		return this
	},

	/**
	 * Отправка корзины на endpoint
	 * @return {jqXHR}
	 */
	push: function() {
		return this.cartModel.container.pushData();
	},

	/**
	 * Получение корзины с endpoint
	 * @return {jqXHR}
	 */
	pull: function() {
		return this.cartModel.container.pullData();
	}
});