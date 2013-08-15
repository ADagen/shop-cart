/**
 * Компонент корзины
 * @require bundle.js
 * @require cart-container.js
 */
var Cart = Cart || {};
Cart.Model = Backbone.Model.extend({
	defaults: function() {
		return {
			url: '/'
		};
	},
	initialize: function() {
		this.container = new CartContainer([], {
			url: this.get('url')
		});
		this.on("resetContainer", this.resetContainerQuery, this);
	},
	resetContainerQuery: function() {
		this.container.reset(this.container.localStorage.findAll());
	}
});

Cart.View = Backbone.View.extend({
	initialize: function() {
		// шаблон компилируется только при создании экземпляра
		this.template = _.template($('#cart-template').html());
		this.createDOM();

		_.bindAll(this,
			"addBundleHandler",
			"addBundlesHandler",
			"removeBundleHandler",
			"addRandom",
			"addBundle");

		this.listenTo(this.model.container, {
			'add'   : this.addBundleHandler,
			'reset' : this.addBundlesHandler,
			'remove': this.removeBundleHandler
		});

		this.model.trigger("resetContainer");
	},

	events: {
		"click .add-to-cart" : "addRandom"
	},

	createDOM: function() {
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
				_id      : randomId,
				title   : "Name" + randomId,
				desc    : "no description",
				amount  : 1
			};
		this.addBundle(options);
	},

	/**
	 * Добавляет новый товар в корзину
	 * @param {object} options - хэшмап с параметрами добавляемого товара
	 */
	addBundle: function(options) {
		this.model.container.create(options)
	},

	/**
	 * Удаляет товар по _id
	 * @param {number} _id
	 */
	removeBundle: function(_id) {
		var bundles = this.model.container.where({ _id : _id });
		this.model.container.remove(bundles);
	},

	/**
	 * Обработчик события появления нового товара в корзине
	 * @param {object} bundleOptions
	 */
	addBundleHandler: function(bundleOptions) {
		new Bundle.View({
			model   : bundleOptions,
			el      : $('<div>').appendTo(this.$list)
		});
	},

	/**
	 * Обработчик обновления корзины
	 */
	addBundlesHandler: function() {
		this.render();
		this.model.container.each(this.addBundleHandler);
	},

	removeBundleHandler: function(model) {
		model.trigger('removeQuery');
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$list = this.$('.bundleList');
		return this;
	}
});