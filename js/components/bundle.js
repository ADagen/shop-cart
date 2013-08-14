/**
 * Компонент продукта в корзине
 */
var Bundle = Bundle || {};

Bundle.Model = Backbone.Model.extend({
	defaults: function() {
		return {
			_id      : 0,
			title   : "no name",
			desc    : "no description",
			amount  : 1
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
		//this.save();
		return this
	}
});

Bundle.View = Backbone.View.extend({
	initialize: function() {
		this.template = _.template($('#bundle-template').html());
		this.model.bind('change', this.render, this);
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
		console.log('remove', this.model);
		this.$el.hide({
			duration: 200,
			complete: function() {
				this.remove();
				this.options.nest.remove();
			}.bind(this)
		});
		this.model.destroy();
	}
});