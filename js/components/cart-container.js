/**
 * Компонент контейнера корзины (список товаров в корзине)
 * @require bundle.js
 */

var CartContainer = Backbone.Collection.extend({

	model: Bundle.Model,

	// тестовый урл для проверки this.pullData()
	// передаётся из ShopCart
	//url: 'serverResponse.json',

	localStorage: new Store("shop-cart"),

	initialize: function(options) {
		// wtf? по документации должно быть автоматическое присваивание
		this.url = options.url;

		_.bindAll(this, "_updateLocalStorage", "_errorHandler", "removeModelHandler");
		this.on('remove', this.removeModelHandler)
	},
	/**
	 * Сортировка по времени добавления в корзину
	 * @param {Bundle.Model} bundle1
	 * @param {Bundle.Model} bundle2
	 * @return {number}
	 */
	comparator: function(bundle1, bundle2) {
		var t1 = bundle1.get('timestamp'),
			t2 = bundle2.get('timestamp');

		if (t1 < t2) return -1;
		if (t2 > t1) return 1;
		return 0
	},

	/**
	 * Отправляет корзину на указанный урл
	 * @return {jqXHR}
	 */
	pushData: function() {
		return Backbone.ajaxSync('update', this, {
			success : this._updateLocalStorage,
			error   : this._errorHandler
		});
	},

	/**
	 * Забирает корзину с указанного урл
	 * @return {jqXHR}
	 */
	pullData: function() {
		return Backbone.ajaxSync('read', this, {
			success : this._updateLocalStorage,
			error   : this._errorHandler
		});
	},

	/**
	 * Обновляет коллекцию в localStorage
	 * @param {object} response
	 */
	_updateLocalStorage: function(response) {

		// reset не удалит отображение моделей в localStorage, поэтому сбрасываю его
		this.localStorage._clear();

		this.reset(response);
		this.each(function(model) {
			model.save();
		});
	},

	/**
	 * Обработчик ошибок
	 * @param {object} response
	 */
	_errorHandler: function(response) {
		//this.trigger("invalid", response, this);
	},

	removeModelHandler: function(model) {
		//console.log('removeModelHandler', model);
	}
});