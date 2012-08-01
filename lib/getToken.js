var request = require('request'),
	url = require("url");
	querystring = require("querystring");

var tokens = {};

module.exports = function (namespace, secret, cb) {

    if (!tokens[namespace] || tokens[namespace].expiration < getSecondsToDate()) {

		var authEndpoint = "https://" + namespace + ".accesscontrol.windows.net/v2/OAuth2-13";
		var scope = "https://" + namespace + ".accesscontrol.windows.net/v2/mgmt/service";
		var data = {
			grant_type: "client_credentials",
			client_id: "ManagementClient",
			client_secret: secret,
			scope: scope
		};
		request.post({ uri: authEndpoint, form: data }, function (err, res, body) {
			if (err || res.statusCode !== 200) {
				cb(err || JSON.parse(res.body));
				return;
			}
			var result = JSON.parse(body);
			tokens[namespace] = {
				access_token: result.access_token,
				expiration: ~~(getSecondsToDate() + (result.expires_in / 1000))
			};

			cb(null, tokens[namespace].access_token);
		});
	} else {
		cb(null, tokens[namespace].access_token);
	}
};

/* private functions */
function getSecondsToDate(){
    return new Date().getTime() / 1000;
}