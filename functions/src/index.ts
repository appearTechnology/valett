import * as functions from 'firebase-functions';
import * as fetch from 'node-fetch';
import * as admin from 'firebase-admin';
const cors = require('cors')({origin: true});
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const app = admin.initializeApp();

export const handleTimer = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        console.log("Recieved: ", req.body);
        fetch('https://valet-timer.herokuapp.com/timer', {
            method: 'post',
            body:    req.body,
            headers: { 'Content-Type': 'application/json' },
        })
            .then(resp => resp.text())
            .then(text => {
                res.sendStatus(200);
            })
            .catch(e => res.sendStatus(500))
    });
});

export const handleFirstNotification = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        const data = req.body;
        const regId = data.registration_id;

        const payload = {
            'notification': {
                'body': data.body,
                'title': data.title
            }
        };

        app.messaging().sendToDevice(regId, payload)
            .then(resp => {
                res.sendStatus(200);
            })
            .catch(err => res.sendStatus(500));
    });
});
