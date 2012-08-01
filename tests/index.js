var assert = require('assert'),
    namespace = process.env["NODE_ACS_CLI_NAMESPACE"],
    secret = process.env["NODE_ACS_CLI_SECRET"],
    ManagementClient = require('../lib'),
    client = ManagementClient(namespace, secret),
    crypto = require('crypto');

describe('ManagementClient', function () {

    it('should get all relying parties', function ( done ) {

        client
            .from('RelyingParties')
            .top(2)
            .query(function ( err, res ) {
                assert.equal(err, null);
                assert.ok(res);
                done();
            });
    });

    it('should get a relying party', function ( done ) {

        client.from('RelyingParties').query( function ( err, result ) {
            var id = result.d.results[0].Id;
            client
                .from('RelyingParties')
                .withId(id)
                .query( function ( err, result ) {
                    assert.equal(err, null);
                    assert.ok(result);
                    assert.equal(result.d.Id, id);

                    console.log(result.d);
                    done();
            });
        });
    });

    it('should get a relying partys identity providers', function ( done ) {
        client
            .from('RelyingParties')
            .top(2)
            .query( function ( err, result ) {

                var id = result.d[0].Id;

                var q = client
                    .from('RelyingPartyIdentityProviders')
                    .filter('RelyingPartyId eq ' + id);
                    //.expand('IdentityProvider');
                    //console.log(q.uri);
                    q.query(function(err, result) {
                        assert.equal(err, null);
                        assert.ok(result);
                        console.log(result);
                        done();
                    });
        });
    });


    it('should get all the rule groups', function ( done ) {
        client.from('RuleGroups').query( function ( err, result ) {
            assert.equal(err, null);
            assert.ok(result);
            done();
        });
    });

    it('should get a rule group', function ( done ) {
        client.from('RuleGroups').query( function ( err, result ) {
            var id = result.d.results[0].Id;
            client.from('RuleGroups').withId(id).query(function ( err, result ) {
                assert.equal(err, null);
                assert.ok(result);
                done();
            });
        });
    });

    it('should get the rules from a group', function ( done ) {
        client.from('RuleGroups').query( function ( err, result ) {
            var id = result.d.results[0].Id;
            client
                .from('Rules')
                .filter('RuleGroupId eq ' + id)
                .query(function ( err, result ) {
                    assert.equal(err, null);
                    assert.ok(result);
                    done();
            });
        });
    });

    it('should get identity provider by name', function ( done ) {
        client
            .from('IdentityProviders')
            .query( function ( err, result ) {
                var name = result.d.results[0].DisplayName;

                client
                    .from('IdentityProviders')
                    .filter("DisplayName eq '" + name + "'")
                    .query( function ( err, result ) {
                        assert.equal(err, null);
                        assert.equal(result.d.results.length, 1);
                        done();
                    });
            });
    });

    it('should get rule group by name', function ( done ) {
        client
            .from('RuleGroups')
            .query( function ( err, result ) {
                var name = result.d.results[0].Name;

                client
                    .from('RuleGroups')
                    .filter("Name eq '" + name + "'")
                    .query( function ( err, result ) {
                        assert.equal(err, null);
                        assert.ok(result);
                        assert.equal(result.d.results.length, 1);
                        assert.equal(result.d.results[0].Name, name);
                        done();
                    });
            });
    });

    it('should create a relying party', function ( done ) { 

        var relyingParty = {
            "Name": "test" + ~~(Math.random() * 100000),
            "TokenType": "SWT",
            "TokenLifetime": 3600,
            "AsymmetricTokenEncryptionRequired": false
        };
        
        client
            .create('RelyingParties', relyingParty, function ( err, result ) {
                assert.equal(err, null);
                assert.ok(result);
                assert.ok(result.d.Id);
                var id = result.d.Id,
                    name = result.d.Name,
                    key = "c9VqjHchC8XjNLovaOtdeYa+ei+AQX4aiZFltXmQTKs=",
                    realm = {
                        RelyingPartyId: id,
                        EndpointType: 'Realm',
                        Address: 'http://localhost:6000/' + name + '/'
                    };

                client.create('RelyingPartyAddresses', realm, function ( err, result ) {
                    assert.equal(err, null);
                    assert.ok(result);

                    var reply = {
                        RelyingPartyId: id,
                        EndpointType: 'Reply',
                        Address: 'https://localhost:6000/' + name + '/fed/token'
                    };

                    client.create('RelyingPartyAddresses', reply, function ( err, result ) {
                        assert.equal(err, null);
                        assert.ok(result);
                        var hasher = crypto.createHash('sha256');
                        hasher.update(name);
                        var hash = hasher.digest('base64');
                        var relyingPartyKey =  {
                            "RelyingPartyId": id,
                            "DisplayName": "Default Signing Key for " + name,
                            "Usage": "Signing",
                            "Type": "Symmetric",
                            "Value": hash,
                            "IsPrimary": true,
                            "SystemReserved": false,
                            "StartDate": "07/30/2012", //taken from the cert!!
                            "EndDate": "07/30/2022"
                        };
                        
                        client.create('RelyingPartyKeys', relyingPartyKey, function ( err, result ) {
                            assert.equal(err, null);
                            assert.ok(result);
                            done();
                        });
                    });
                });
            });
    });
});