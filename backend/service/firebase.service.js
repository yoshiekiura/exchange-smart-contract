const admin = require('firebase-admin');

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://exchange-smart-contract.firebaseio.com'
});


const verifyIdToken = (idToken) => {
    return admin.auth().verifyIdToken(idToken);
};

const getUserFromDbByUID = (UID) => {
    const db = admin.database();
    const userRef = db.ref("/users/" + UID);

    return new Promise((resolve, reject) => {
        userRef.once('value', (snap) => {
            resolve(snap.val())
        }, (err) => {
            reject(err);
        })
    });

};

const registerUserByUID = (UID) => {
    const db = admin.database();
    const userRef = db.ref("/users/" + UID);

    return userRef.set({registered: true})
};


module.exports = {
    verifyIdToken: verifyIdToken,
    getUserFromDbByUID: getUserFromDbByUID,
    registerUserByUID: registerUserByUID
};