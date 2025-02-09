const FirebaseStorage = require('multer-firebase-storage')
const multer = require('multer');
const fbAdmin = require('firebase-admin');
const serviceCredentials = require('../etc/secrete/durable-stack-449615-n0-firebase-adminsdk-fbsvc-6377ce54f4.json');

const storage = new FirebaseStorage({ 
    bucketName: "gs://durable-stack-449615-n0.firebasestorage.app",
    credential: fbAdmin.credential.cert(serviceCredentials),
    public: true,
    unique: true,

 });

const upload = multer({
     storage: storage 
    
    });
    
module.exports = upload;