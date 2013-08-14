/**
 * Компонент корзины
 * @require bundle.js
 * @require cart-container.js
 */
var Cart = Cart || {};
Cart.Model = Backbone.Model.extend({
	defaults: function() {
		return {
			products: [],
			foo: false
		};
	},
	initialize: function(options) {
		this.container = new CartContainer();
	},
	clear: function() {
		this.destroy();
	}
});

Cart.View = Backbone.View.extend({
	initialize: function() {
		// шаблон компилируется только при создании экземпляра
		this.template = _.template($('#cart-template').html());
		this.createDOM();

		_.bindAll(this, "addBundleHandler", "removeBundleHandler", "addRandom", "addBundle");
		this.model.container.on('add', this.addBundleHandler, this);
		this.model.container.on('reset', this.addBundlesHandler, this);
		this.model.container.on('remove', this.removeBundleHandler, this);
		this.model.container.reset(this.model.container.localStorage.findAll());
	},

	events: {
		"click .add-to-cart" : "addRandom"
	},

	createDOM: function() {
		this.$el.appendTo(this.options.nest);
		this.show();
	},

	show: function() {
		this.render();
		this.$el.show('fast');
	},

	hide: function() {
		this.$el.hide('fast');
	},

	/**
	 * Добавляет случайный товар
	 */
	addRandom: function() {
		var randomId = Math.round(Math.random() * 1e6),
			options = {
				id      : randomId,
				title   : "Name" + randomId,
				desc    : "no description",
				amount  : 1
			};
		this.addBundle(options);
	},
	/**
	 * Обработчик события появления нового товара в корзине
	 * @param {object} options - хэшмап с параметрами добавляемого товара
	 */
	addBundle: function(options) {
		this.model.container.create(options)
	},

	/**
	 * Обработчик события появления нового товара в корзине
	 * @param {object} bundleOptions
	 */
	addBundleHandler: function(bundleOptions) {
		console.log('CartView addBundle', bundleOptions);
		var nest = $('<div>');
		this.$list.append(nest);
		new Bundle.View({
			model   : bundleOptions,
			nest    : nest
		});
	},
	addBundlesHandler: function(bundleOptions) {
		this.model.container.each(this.addBundleHandler);
	},
	removeBundleHandler: function() {
		console.log('CartView removeBundle');
	},
	render: function() {
		var context = _.extend(this.model.toJSON(), { cid: this.model.cid });
		this.$el.html(this.template(context));
		this.$list = this.$('.bundleList');
		return this;
	}
});