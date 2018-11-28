'use strict';

const crypto = require('crypto');
const test = require('tape');
const stub = require('@cloudcmd/stub');

const criton = require('..');

test('no arguments', (t) => {
    t.throws(criton, /password could not be empty!/, 'should throw when no password');
    t.end();
});

test('arguments: no algo, just a password', (t) => {
    const hash = '9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043';
    
    t.equal(criton('hello'), hash, 'sha512WithRSAEncryption should be used');
    t.end();
});

test('arguments: password and algo used', (t) => {
    const hash = '5d41402abc4b2a76b9719d911017c592';
    
    t.equal(criton('hello', 'MD5'), hash, 'should crypt with defined algo');
    t.end();
});

test('internals: crypto should be used', (t) => {
    const createHash = crypto.createHash;
    const algo = 'MD5';
    
    crypto.createHash = stub().returns({
        update: stub(),
        digest: stub()
    });
    
    criton('hello', algo);
    
    t.ok(crypto.createHash.calledWith('MD5'), 'createHash should have been called');
    
    crypto.createHash = createHash;
    t.end();
});

test('internals: hash update should be used', (t) => {
    const createHash = crypto.createHash;
    const algo = 'MD5';
    const update = stub();
    const digest = stub();
    
    crypto.createHash = stub().returns({
        update,
        digest,
    });
    
    criton('hello', algo);
    
    t.ok(update.called, 'update should have been called');
    
    crypto.createHash = createHash;
    t.end();
});

test('internals: hash update should be used', (t) => {
    const createHash = crypto.createHash;
    const algo = 'MD5';
    const update = stub();
    const digest = stub();
    
    crypto.createHash = stub().returns({
        update,
        digest,
    });
    
    criton('hello', algo);
    
    t.ok(digest.calledWith('hex'), 'digest should have been called');
    
    crypto.createHash = createHash;
    t.end();
});

