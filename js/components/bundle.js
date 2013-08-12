/**
 * Компонент продукта в корзине
 */
var BundleModel = Backbone.Model.extend({
	defaults: function() {
		return {
			id      : 0,
			title   : "no name",
			desc    : "no description",
			amount  : 1
		};
	},
	validate: function(options) {
		if (!options.amount) {
			return "Amount should be positive";
		}
	},
	initialize: function(options) {
	}
});

var BundleView = Backbone.View.extend({
	initialize: function() {
		this.template = _.template($('#bundle-template').html());
	},
	events: {
		"click .remove" : "remove"
	},
	render: function() {
		var context = _.extend(this.model.toJSON(), { cid: this.model.cid });
		this.$el.html(this.template(context));
		return this;
	},
	/**
	 * Уничтожает текущий товар
	 * todo: связь с моделью через контроллер BundleRouter
	 */
	remove: function() {
		//this.model.remove();
	}
});