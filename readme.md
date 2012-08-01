# Node.js ACS Management Client 0.0.1

> Simple ACS Management client for Node.js


### Installation

```bash
$ npm install acs-cli
```

### Example Code

```javascript

var ManagementClient = require('acs-cli');

var client = new ManagementClient('acsNamespace', 'acs-management-key');

    client
        .from('RelyingParties')
        .top(2)
        .query(function (err, res) {
            ///res...
        });

```

### License (MIT)

Copyright (c) 2012, Leandro Boffi - Gustavo Machado.

### Authors: [Leandro Boffi][0] - [Gustavo Machado][1]

[0]: http://github.com/leandrob/
[1]: http://github.com/machadogj/

