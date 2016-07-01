'use strict';

var nconf = module.parent.require('nconf');

function searchURL(term) {
	return 'https://www.google.com/search?q=site:' + encodeURIComponent(nconf.get('url')) + '+' + encodeURIComponent(term);
}

module.exports = {
	"init": function(data, callback) {
		data.router.route('/search/:term?').all(function(req, res, next) {
			res.redirect(301, searchURL(req.params.term || '')).end();
		});
		data.router.route('/api/search/:term?').all(function(req, res, next) {
			res.status(308).json(searchURL(req.params.term || '')).end();
		});

		callback();
	},
	"dummy": function(data, callback) {
		callback(new Error('search redirect failed'));
	}
};
