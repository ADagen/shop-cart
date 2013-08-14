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
		this.show();

		_.bindAll(this, "addBundle", "removeBundle", "addRandom");
		this.model.container.bind('add', this.addBundle);
		this.model.container.bind('reset', this.addBundles, this);
		this.model.container.bind('remove', this.removeBundle, this);
		this.model.container.reset(this.model.container.localStorage.findAll());
	},

	events: {
		"click .add-to-cart" : "addRandom"
	},

	show: function() {
		this.$el.appendTo(this.options.nest);
		this.render();
	},

	hide: function() {

	},

	// добавляет случайный товар
	addRandom: function() {
		var randomId = Math.round(Math.random() * 1e6);
//			newBundle = new Bundle.Model({
//				id      : randomId,
//				title   : "Name" + randomId,
//				desc    : "no description",
//				amount  : 1
//			});
//		this.model.container.add(newBundle);
//		newBundle.save();

		this.model.container.create({
			id      : randomId,
			title   : "Name" + randomId,
			desc    : "no description",
			amount  : 1
		})
	},

	/**
	 * Добавляет новый товар
	 * @param {object} bundleOptions
	 */
	addBundle: function(bundleOptions) {
		console.log('CartView addBundle', bundleOptions);
		var nest = $('<div>');
		this.$list.append(nest);
		new Bundle.View({
			model   : bundleOptions,
			nest    : nest
		});
	},
	addBundles: function(bundleOptions) {
		this.model.container.each(this.addBundle);
	},
	removeBundle: function() {
		console.log('CartView removeBundle');
	},
	renderAll: function(model, resp, options) {
		console.log('!!!renderAll', model, resp, options);
	},
	render: function() {
		var context = _.extend(this.model.toJSON(), { cid: this.model.cid });
		this.$el.html(this.template(context));
		this.$list = this.$('.bundleList');
		return this;
	}
});