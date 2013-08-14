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
			var errorMsg = "Amount should be positive";
			this.trigger("invalid:amount", errorMsg, this);
			return errorMsg;
		}
	},
	initialize: function(options) {
		this.set({ 'timestamp': Date.now() });
		return this
	}
});

Bundle.View = Backbone.View.extend({
	initialize: function() {
		this.template = _.template($('#bundle-template').html());
		this.model.on('change', this.render, this);
		this.model.on('destroy', this._removeHandler, this);
		this.model.on('removeQuery', this.removeQuery, this);
		this.show();
	},
	events: {
		"click .remove" : "removeQuery"
	},
	render: function() {
		var context = _.extend(this.model.toJSON(), { cid: this.model.cid });
		this.$el.html(this.template(context));
		return this;
	},

	/**
	 * Появление текущего товара
	 */
	show: function() {
		this.$el
			.appendTo(this.options.nest)
			.css({ display: 'none' });
		this.render();
		this.$el.show('fast');
	},

	/**
	 * Уничтожает текущий товар
	 */
	removeQuery: function() {
		this.model.destroy();
	},

	_removeHandler: function() {
		//console.trace();
		this.$el.hide({
			duration: 200,
			complete: function() {
				this.remove();
				this.options.nest.remove();
			}.bind(this)
		});
	}
});