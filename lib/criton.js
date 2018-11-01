'use strict';

const crypto = require('crypto');

module.exports = (password, algo = 'sha512WithRSAEncryption') => {
    if (!password)
        throw Error('password could not be empty!');
    
    const sha = crypto.createHash(algo);
    
    sha.update(password);
    
    return sha.digest('hex');
};

