/**
 * Компонент продукта в корзине
 */
var Bundle = Bundle || {};

Bundle.Model = Backbone.Model.extend({
	defaults: function() {
		return {
			_id         : 0,
			title       : "no name",
			desc        : "no description",
			amount      : 1,
			timestamp   : 0
		};
	},
	validate: function(options) {
		if (!options.amount) {
			return "Amount should be positive"
		}
	},
	initialize: function(options) {
		// сохраняю для последующей сортировки по времени добавления в корзину
		this.set({ 'timestamp': Date.now() });
		return this
	}
});

Bundle.View = Backbone.View.extend({
	initialize: function() {
		this.template = _.template($('#bundle-template').html());
		_.bindAll(this, "render", "_removeHandler", "removeQuery");

		this.listenTo(this.model, {
			'change'        : this.render,
			'destroy'       : this._removeHandler,
			'removeQuery'   : this.removeQuery
		});

		this.show();
	},
	events: {
		"click .remove" : "removeQuery"
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	/**
	 * Появление текущего товара
	 */
	show: function() {
		this.render();
		this.$el.css({ display: 'none' }).show('fast');
	},

	/**
	 * Запрос на уничтожение текущего товара
	 */
	removeQuery: function() {
		this.model.destroy();
	},

	/**
	 * Событие уничтожения
	 */
	_removeHandler: function() {
		//console.trace();
		this.$el.hide({
			duration: 200,
			complete: this.remove.bind(this)
		});
	}
});