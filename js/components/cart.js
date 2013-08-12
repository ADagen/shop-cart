/**
 * Компонент корзины
 * @require bundle.js
 * @require cart-container.js
 */

var CartModel = Backbone.Model.extend({
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

var CartView = Backbone.View.extend({
	initialize: function() {
		// шаблон компилируется только при создании экземпляра
		this.template = _.template($('#cart-template').html());
		_.bindAll(this, "addBundle", "removeBundle");
		this.model.container.bind('add', this.addBundle);
		this.model.container.bind('remove', this.removeBundle);
	},
	/**
	 * Добавляет новый товар (wtf в представлении?? todo: вынести)
	 * @param {object} bundleOptions
	 */
	addBundle: function(bundleOptions) {
		console.log('CartView addBundle');
		var view = new BundleView({ model: bundleOptions });
		this.$list.append(view.render().el);
	},
	removeBundle: function() {
		console.log('CartView removeBundle');
	},
	render: function() {
		var context = _.extend(this.model.toJSON(), { cid: this.model.cid });
		this.$el.html(this.template(context));
		this.$list = this.$('.bundleList');
		return this;
	}
});


var CartRouter = Backbone.Router.extend({
	initialize: function(params) {
		this.model = new CartModel();
		this.view = new CartView({ model: this.model });
		this.view.render();
	},

	routes: {
		"bundle/add": "add",
		"bundle/remove/:number": "remove"
	},

	/**
	 * Возвращает корневую html-ноду компонента Cart
	 * @return {jQuery}
	 */
	get$el: function() {
		  return this.view.$el;
	},

	/**
	 * Добавляет новый (случайный) товар в корзину
	 * отладочная функция
	 */
	add: function() {
		var randomId = Math.round(Math.random() * 1e6);
		this.model.container.add(new BundleModel({
			id      : randomId,
			title   : "Name" + randomId,
			desc    : "no description",
			amount  : 1
		}));

	},

	remove: function(cid) {
		this.model.container.remove(this.model.container.get(cid));
	}
});