/**
 * Created by JetBrains PhpStorm.
 * User: Stefan
 * Date: 02.01.11
 * Time: 14:17
 * To change this template use File | Settings | File Templates.
 */


(function ($) {
	var STORAGE_TEMP_KEY = 'spielblock.game';
	var STORAGE_SAVE_KEY = 'spielblock.game.save';
	if ($ == null) {
		return;
	}

	var Storage = function(key){
		this.key = key;
	};
	Storage.prototype.get = function(){
		return JSON.parse(localStorage.getItem(this.key));
	};

	Storage.prototype.set = function(value){
		localStorage.setItem(this.key, JSON.stringify(value));
		return this;
	};

	Storage.prototype.remove = function(){
		localStorage.removeItem(this.key);
		return this;
	};

	var SaveStorage = function(){

	};

	SaveStorage.prototype = new Storage;

	SaveStorage.prototype.get = function(){
		var g = Storage.prototype.get.call(this);
		if(!$.isArray(g)){
			g = [];
		}
		return g;
	};

	SaveStorage.prototype.push = function(value){
		var storage = this.get();
		if(storage === null){
			storage = [];
		}
		if($.isArray(storage)){
			storage.push(value);
		}
		this.set(storage);
		return this;
	};

	SaveStorage.prototype.getByIndex = function(index){
		var storage = this.get();
		return storage[index];
	};

	SaveStorage.prototype.removeByIndex = function(index){
		var storage = this.get();
		var temp = [];
		for (var i = 0; i < storage.length; i++){
			if(i !== index){
				temp.push(storage[i]);
			}
		}
		this.set(temp);
		return temp;
	};

	SaveStorage.prototype.setByIndex = function(index, value){
		var storage = this.get();
		storage[index] = value;
		this.set(storage);
		return storage;
	};





	$(function () {
		var tempStorage = new Storage(STORAGE_TEMP_KEY);
		var saveStorage = new SaveStorage(STORAGE_SAVE_KEY);

		$('html').removeClass('no-js').addClass('js');

		var storeChanges = null;
		$('body').on('game.changed', function () {
			clearTimeout(storeChanges);
			storeChanges = setTimeout(function () {
				var serObj = {
					name:$(gameSelect).val(),
					items:game.serialize()
				};
				tempStorage.set(serObj);
				//localStorage.setItem(STORAGE_TEMP_KEY, JSON.stringify(serObj));
			}, 100);
		});

		var newGame = $('#newGame');
		var currentGame = $('#currentGame').hide();
		var savedGames = $([]);
		var playerIndex = 0,
				games = [],
				game;

		function addPlayer() {
			var p = $('p:last', nGameForm);
			if (playerIndex <= 5) {
				var playerName = 'Player ' + (playerIndex + 1);
				var pl = '<p><label for="player-' + playerIndex + '">' + playerName + '</label><input type="text" placeholder="' + playerName + '" id="player-' + playerIndex + '" name="player" /></p>';
				p.after(pl);
			}
			playerIndex++;
			if (playerIndex > 5) {
				$('button[name=addPlayer]', nGameForm).hide();
			}
		}

		function removePlayer() {

		}

		var nGameForm = $('#newGame');
		var gameSelect = $('#gameSelect', nGameForm)[0];

		for (var obj in Games) {
			gameSelect.options[gameSelect.options.length] = new Option(obj, obj, false, false);
		}

		addPlayer();
		addPlayer();

		$('button[name=addPlayer]').on('click', addPlayer);
		$('button[name=play]').on('click', function (event) {
			event.preventDefault();
			var players = [],
					player = 1,
					g = '',
					formValues = nGameForm.serializeArray();
			for (obj in formValues) {
				obj = formValues[obj];
				if (obj.name == 'player') {
					if (obj.value == '') {
						players.push('Player ' + player);
					} else {
						players.push(obj.value);
					}
					player++;
				}
				if (obj.name == 'game') {
					g = obj.value;
				}
			}

			newGame.hide();
			savedGames.hide();
			currentGame.show();
			game = new Games[g]($('div', currentGame), {players:players});

		});

		$('button[name=save]').on('click', function (event) {
			event.preventDefault();
			var title = prompt("Please name the game", game.id);
			var serObj = {
				name:$(gameSelect).val(),
				items:game.serialize(),
				title: title
			};
			saveStorage.push(serObj);
		});

		$('button[name=close]').on('click', function () {
			var serGame = game.serialize();
			currentGame.find('div').remove();
			currentGame.append('<div/>').hide();
			newGame.show();
			savedGames.show();
			clearTimeout(storeChanges);
			localStorage.removeItem(STORAGE_TEMP_KEY);
			showSavedGames();

		});

		function showSavedGames(){
			var games = saveStorage.get();
			var lis = '';
			$.each(games, function(i, o){
				lis+='<li><a href="javascript:void(0)" data-type="open" data-index="' + i + '">' + o.title + '</a><ul><li><a href="javascript:void(0)"  data-type="delete" data-index="' + i + '">Delete</a></li></ul></li>'
			});
			if(!!savedGames.size()){
				savedGames.remove();
			}
			if(lis !== ''){
				savedGames = $('<section id="savedGames"><h1>Saved Games</h1><ul>' + lis + '</ul></section>');
				newGame.before(savedGames);
			}
		}


		$(document).on('click', '#savedGames a[data-type=open]', function(){
			var $t = $(this);
			var index = $t.data('index');
			storageGameItem = saveStorage.getByIndex(index);
			newGame.hide();
			savedGames.hide();
			currentGame.show();
			game = new Games[storageGameItem.name]($('div', currentGame), storageGameItem.items);
		});

		$(document).on('click', '#savedGames a[data-type=delete]', function(){
			saveStorage.removeByIndex($(this).data('index'));
			showSavedGames();
		});


		var storageGameItem = tempStorage.get();
		if ($.isPlainObject(storageGameItem)) {
			newGame.hide();
			currentGame.show();
			game = new Games[storageGameItem.name]($('div', currentGame), storageGameItem.items);
		} else {
			showSavedGames();
		}


		nGameForm.submit(function () {
			return false;
		})
	})


})(jQuery);
