Azure ACS Management Service API for node.js

#Installation
```
	npm install node-acs-cli
```
#Usage
You will need to pass the acs namespace and the secret taken from the ACS console.

```js
	var client = new ManagementClient(namespace, secret);
	client.getRelayingParties( function ( err, result ) {
		//do something with the result.d.results
	});
```

# Tests
You can run the tests with 'npm test' or with mocha directly, but remember to use a considerable --timeout parameter.
In order for the unit tests to run, you need to set up the following environment variables for the acs namespace and the secret: NODE_ACS_CLI_NAMESPACE and NODE_ACS_CLI_SECRET.


# License

The MIT License : http://opensource.org/licenses/MIT

Copyright (c) 2011-2012 Leandro Boffi.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.