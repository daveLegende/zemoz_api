const bcryptNative = require('bcrypt');
const bcryptJS = require('bcryptjs');

// Simulate HashFactory.hashPwd which uses bcryptjs
async function hashWithJS(password) {
    const salt = await bcryptJS.genSalt(10);
    return await bcryptJS.hash(password, salt);
}

// Simulate HashFactory.isRightPwd which uses bcryptjs.compare
async function compareWithJS(password, hash) {
    return await bcryptJS.compare(password, hash);
}

async function runTest() {
    const password = 'mySecretPassword';
    
    console.log('--- Testing hashing with bcryptjs (Factory) and verifying with bcryptjs (Unified Service) ---');
    const hash = await hashWithJS(password);
    console.log('Hash:', hash);
    
    const isMatch = await compareWithJS(password, hash);
    console.log('Match result:', isMatch);
    
    if (isMatch) {
        console.log('SUCCESS: Unified hashing and verification works!');
    } else {
        console.log('FAILURE: Unified hashing and verification fails!');
    }
}

runTest();
