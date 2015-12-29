/**
 * Created by JetBrains PhpStorm.
 * User: Stefan
 * Date: 02.01.11
 * Time: 19:57
 * To change this template use File | Settings | File Templates.
 */
(function ($) {
	if ($ == null) {
		return;
	}
	function Game(p, t) {
		var table,
				that = this, summaries,
				gameNumber = 1,
				onClick = $.noop,
				maxLength = 4;

		function GetRandom(min, max) {
			if (min > max) {
				return( -1 );
			}
			if (min == max) {
				return( min );
			}

			return( min + parseInt(Math.random() * ( max - min + 1 )) );
		}

		this.id = '';


		this.getAll = function () {
			return $('tfoot input', table);
		};

		var setEvents = function () {
			that.getAll().blur(function (e) {
				var player = $(this).attr('data-player');
				var v = this.value * 1;

				if (!$.isNumeric(v)) {
					this.value = '';
					return false;
				}

				var p = $(this).parents('td');

				updateSummary(player, this.value);
				return false;
			})
		};

		var updateSummary = function (player, summand) {
			var td = $('tfoot tr:last td:eq(' + player + ')', table);
			var summary = 0;
			$('tbody tr', table).each(function () {
				var v = $('td:eq(' + player + ')', this).text() * 1;
				if (!$.isNumeric(v)) {
					return;
				}
				summary += v;
			});
			if (!isNaN(summand)) {
				summary += summand * 1;
			}
			$(td).text(summary);

			$('body').trigger('game.changed');


		};

		this.addRow = function (items) {
			var tds, th, sum;

			var row = $('tfoot tr:first', table).clone();
			var inp = this.getAll();

			$('td', row).each(function (i) {
				$('*', this).remove();
				var v = (items) ? items[i] : $(inp[i]).val();
				$(this).html((v == '') ? 0 : v);
			});

			inp.each(function (i) {
				updateSummary(i, this.value);
				this.value = '';
			});

			$('tbody', table).append(row);

			gameNumber++;

			th = $('tfoot tr:first-child th', table).text(gameNumber);
//			$('input:first', table).focus();
//			this.focus();
		};

		this.setDisabled = function () {
			$(':input', table).hide();
		};

		this.setEnabled = function () {
			$(':input', table).show();
//			console.debug($( table));
//			this.focus();
		};

		this.focus = function () {
			$('tfoot tr:first-child td input:first', table).focus();
		};

		var setInputs = function () {
			var tds, th, sum;
			tds = $('tfoot tr:first-child td', table);

			tds.each(function (i) {
				$(this).text('');
				$(this).append($('<input type="number" maxlength="' + maxLength + '" data-player="' + i + '" name="player-' + i + '" />'));
				if (i == 0) {
					$(this).focus();
				}
				if (i == tds.length - 1) {
					$('input', this).blur(function () {
						$('input:first', $(this).parents('tr')).focus();
					});
				}
			});
			th = $('tfoot tr:first-child th', table).text(gameNumber);
			setEvents();

		};

		var create = function (parent, obj) {
			var nt = '<form><table><thead><tr><th>Spiel</th>';
			$.each(obj.players, function (i, player) {
				nt += '<th>' + player + '</th>';
			});
			nt += '</tr></thead><tbody></tbody><tfoot><tr><th>1</th>';

			$.each(obj.players, function () {
				nt += '<td></td>';
			});

			nt += '</tr><tr><td colspan="5"><button type="sumbit">New Game</button></td></tr><tr><th>Gesamt</th>';

			$.each(obj.players, function () {
				nt += '<td>0</td>';
			});

			nt += '</tr></tfoot></table></form>';

			var tab = $(nt);

			$(parent).append(tab);

			return tab;
		};

		var init = function (parent, obj) {
			if ($.isPlainObject(obj) && typeof(obj.players) != 'undefined') {
				table = create(parent, obj);
				setInputs();
				that.focus();
				table.click(function () {
					onClick();
				});
				$(table).submit(function (event) {
					event.preventDefault();
					that.addRow();
				});
				$('table', table).on('click', 'tbody td', function () {
					var value = $(this).text();
					var player = $(this).parents(":first").find("td").index(this);
					var check = prompt("Please edit the value", value);

					if (check !== null) {
						$(this).text(check);
					}
					updateSummary(player, null);

				});

				var _summary = [];
				if ($.isArray(obj.rounds)) {
					$.each(obj.rounds, function (i, o) {
						that.addRow(o);
					});
				}
				if ($.isArray(obj.current)) {
					var inputs = $('tfoot tr:first-child td input[type=number]', table);
					inputs.each(function (i) {
						$(this).val(obj.current[i]);
						_summary.push(obj.current[i]);
					});
				}
				if ($.isArray(obj.rounds) || $.isArray(obj.current)) {
					var hasCurrent = $.isArray(obj.current);
					$.each(obj.players, function (i) {
						if (hasCurrent) {
							updateSummary(i, _summary[i]);
						} else {
							updateSummary(i);
						}
					});
				}
				that.id = (new Date().getTime()) + '_' + GetRandom(0, 100000);
			}
		};

		this.setClick = function (fn) {
			if ($.isFunction(fn))
				onClick = $.proxy(fn, this);
		};

		this.serialize = function () {
			var saveItems = {players:t.players}, rounds = [], current = [];
			$('tbody tr', table).each(function () {
				var curRound = [];
				$('td', this).each(function () {
					curRound.push($(this).text() * 1);
				});
				rounds.push(curRound);
			});
			$('tfoot input[type=number]').each(function () {
				var value = $(this).val();
				if ($.isNumeric(value)) {
					current.push(parseInt(value));
				} else {
					current.push("");
				}

			});
			saveItems.rounds = rounds;
			saveItems.current = current;
			return saveItems;

		};

		init(p, t);

	}

	if (window.Games == undefined) {
		window.Games = {};
	}

	window.Games.Default = Game;

})(jQuery);
