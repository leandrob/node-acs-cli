// ACS Management Client
var OData = require('odata-cli'),
	getToken = require('./getToken');

module.exports = ManagementClient;

function ManagementClient(namespace, secret) {

	return OData("https://" + namespace + ".accesscontrol.windows.net/v2/mgmt/service")
			.beforeRequest( function ( req, cb ) {
				
				getToken( namespace, secret, function ( err, token ) {

					req.headers.Authorization = "Bearer " + token;
					cb();

				});
			});
}