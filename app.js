/* global Homey, module */
(function() {
	'use strict';
}());

function init() {}
module.exports.init = init;
Homey.manager('flow').on('action.text', function(callback, args) {
	Homey.manager('insights').getLog(args.title, function(err, logs) {
		if (err !== null) {
			Homey.manager('insights').createLog(
			args.title, {
				label: {
					en: args.title,
					nl: args.title
				},
				type: 'number',
				units: {
					en: 'Triggerd',
					nl: 'Geactiveerd'
				},
				decimals: 0,
				chart: 'scatter' // prefered, or default chart type. can be: line, area, stepLine, column, spline, splineArea, scatter
			}, function callback(err, success) {
				if (err) {
					return console.error(err);
				}
			});
		}
		Homey.manager('insights').createEntry(args.title, 1, new Date(), function(err, success) {
			if (err) return console.error(err);
		});
	});
	callback(null, true); // we've fired successfully
});
var TrueFalse = function(callback, args) {
		Homey.manager('insights').getLog(args.title, function(err, logs) {
			if (err !== null) {
				Homey.manager('insights').createLog(
				args.title, {
					label: {
						en: args.title,
						nl: args.title
					},
					type: 'boolean',
					units: {
						en: 'Status',
						nl: 'Status'
					},
					decimals: 0,
					chart: 'scatter' // prefered, or default chart type. can be: line, area, stepLine, column, spline, splineArea, scatter
				}, function callback(err, success) {
					if (err) {
						return console.error(err);
					}
				});
			}
			Homey.manager('insights').createEntry(args.title, (args.boolean === 'true'), new Date(), function(err, success) {
				if (err) return console.error(err);
			});
		});
		callback(null, true); // we've fired successfully
	};
Homey.manager('flow').on('action.truefalse', function(callback, args) {
	TrueFalse(callback, args);
});
Homey.manager('flow').on('action.yesno', function(callback, args) {
	TrueFalse(callback, args);
});
Homey.manager('flow').on('action.onoff', function(callback, args) {
	TrueFalse(callback, args);
});