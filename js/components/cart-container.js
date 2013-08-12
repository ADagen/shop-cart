/**
 * Компонент контейнера корзины (список товаров в корзине)
 * @require bundle.js
 */

var CartContainer =  Backbone.Collection.extend({
	model: BundleModel,
	localStorage: new Store("shop-cart"),
	/**
	 * Сортировка по времени добавления в корзину
	 * @param {BundleModel} bundle1
	 * @param {BundleModel} bundle2
	 * @returns {*}
	 */
	comparator: function(bundle1, bundle2) {
		return 0
	}
});