const fbAdmin = require('firebase-admin');

<<<<<<< HEAD
<<<<<<< HEAD
const serviceCredentials = require('/etc/secrets/durable-stack-449615-n0-firebase-adminsdk-fbsvc-6377ce54f4.json');
=======
const serviceCredentials = require('../etc/secrete/durable-stack-449615-n0-firebase-adminsdk-fbsvc-6377ce54f4.json');
>>>>>>> 8acefd023bb69c31eca80221c9ecc664fa58ea53
=======
const serviceCredentials = require('../etc/secrete/durable-stack-449615-n0-firebase-adminsdk-fbsvc-6377ce54f4.json');
>>>>>>> 8acefd023bb69c31eca80221c9ecc664fa58ea53


fbAdmin.initializeApp({ credential: fbAdmin.credential.cert(serviceCredentials),
    storageBucket: "gs://durable-stack-449615-n0.firebasestorage.app"
 });

module.exports = fbAdmin;