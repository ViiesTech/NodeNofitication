import express from "express";
import admin from "firebase-admin";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Working");
});

admin.initializeApp({
    credential: admin.credential.cert({

        projectId: 'jpguide-69169',

        clientEmail: 'firebase-adminsdk-plbpy@jpguide-69169.iam.gserviceaccount.com',

        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCGoJhl1Uoqbq8l\noeyPaEVvnOwEsGi2eAjXBk61LQQ01j+jvy3+0gXPRW5lKP/OnG+FgVTP5mBy0lGl\n6BKln2e8GAbP4CcLwRRIdgF/LSig2qSHDtuzDF5Mlzx02xOmEBsW0HEq9Cm47u5/\n4rK6VYgR/SYNTHQI/PbPCBfivbRFDImPJMwil23C2keK+uU22p+oNj8kIzwMqfXh\nkQn00JaGApBYXel7vuBIPSQMe+d9Jp1k/qYKHkjFD5ed0y3aWwd//SBBCenKaK5+\n2War0JBmXdDTf+qtj8SIKhHSL6eiZmSmoPlycxQwG3pfs2wW8/4JqNh3FM9UpqEs\n3r1VgWwrAgMBAAECggEAOSY+W2g+GiIvVrXUspHse/Ns25a5dNAizIjAa7em4/kZ\nPd0/3L7yOWk7clUDtoUA8HcU9kZRJhzzDQ8lr0oqYpX+eksouBwoDJSPkRmt+A6o\nri6YA/tZooDG6MJBJosKvNYSXE4W0gsXkpE9Fs2NPDmu6BFO5qvf58YDQb0PJAoP\nSF9DtA5Zo84cR1Esw4uHnzTwTX55ZZIfaS0p0cQKRJEL/lDsxMnQMws+M4W3jnrd\nj7QyqwPnPygHCPeX6AEDK4KynC0RkzgpqW+RRVWEezximy0c+IFY8bFX3w/LOLy5\n/1/WBm68MqofgTIkB7zdkD0fBAZJdH/7KNyo1fvM/QKBgQC9/5NlJjOcrEqTkHo3\n/4lsksMg1gT4aSI39TiyvvJB5totfPjjGJGgtbo8DPwZk9390x9X2LQt7XuNaASi\nAh2TH4gie44+7C/buetIfvqcj5yO71PcJdshRVE+g3+kbZUcZT3wTtung+3glTbj\nLIfVJrpetlkU2uV4Bg5tWVb87wKBgQC1ZOmRsFAqFkO7WGO3uPpLtwdqTvUn7VCo\n6HYSZlAaFUrzzRmt7/Ij75V/DseXghTBuMoDd6t//ixDqEkr10ZM8lgkc9oSTanR\niQmuG1Oa/PUl5z+DQSNo+L3p/aU2KBsKxuXjC6aHM9HR6PwSArPZOaADgf4JgMaw\niQWoiHg8hQKBgDnRFyJVoKkRiNQkx/xYZ5JBit1oIzUQkRgkKC/EiWXigQwMlpRM\nuqwEAPsbHHAQHiKKZ2RNDm9XcByUxawjJqrJkpyjqqKdLucXSXDTKyIPVZ3tWECK\nyIb0WAfE7ke0DQcKC/IfnRn5vJ516bDxsRf85APES5FcFy4R8bv2ztDDAoGATmxY\nhwJBRlDl66NlSVMR85YoAJAucZqqWrxV/9J4Iy69fvZXednZSCwW6B3NsPUuYCqy\nPBmK7gVHweCJ8ghafn3wGaJ0z6EAIHUs2Dc8SC/BFSgLT4Xj90hDY1ykBuwD9P7U\n+Ppafu2qcyRVhrvgYbQGOD4FRLqGLGCxL5IA2bkCgYBMVbebTDy5umwaeeHdsIWG\nmgPE+XgMmLZoFPuc4NryGm4A2/o5l/4gBP/6KmBGn4TJ21mFxoRRXaaFg6O2mIkB\nIYFHQq3UZPoGrQgL9+w+SOw/1yWo8PTvUEUl4mjgIUtR/9AIztVZJ4NcXil40Ot9\nXXjKc1RML2gd3InvDpEn/Q==\n-----END PRIVATE KEY-----\n',

    }),
});

// app.post('/sendNotifications', async (req, res) => {
//     const recieveToken = req.body.fcmToken; // Fixed typo in variable name
//     const notificationMessage = req.body.message; // Changed variable name for consistency

//     const message = {
//         notification: {
//             title: "Jp Guide",
//             body: notificationMessage
//         },
//         token: recieveToken
//     };

//     admin.messaging()
//         .send(message)
//         .then((response) => {
//             res.status(200).json({
//                 message: "Successfully sent message",
//                 token: recieveToken
//             });
//             console.log("Successfully sent message: ", response);
//         })
//         .catch((error) => {
//             res.status(500).send(error); // Use a more appropriate status code
//             console.log("Error sending message: ", error);
//         });
// });


app.post('/sendNotifications', async (req, res) => {
    const recieveToken = req.body.fcmToken; // Fixed typo in variable name
    const notificationMessage = req.body.message; // Changed variable name for consistency


    const messages = recieveToken?.map((token) => ({
        notification: {
            title: "Jp Guide",
            body: notificationMessage,
        },
        token: token, // Include the FCM token for each message
    }));



    const sendPromises = messages.map(async (message) => await admin.messaging().send(message));



    try {
        await Promise.all(sendPromises);
        res.status(200).json({
            message: "Successfully sent messages",
            tokens: fcmTokens
        });
        console.log("Successfully sent messages");
    } catch (error) {
        res.status(500).send(error);
        console.error("Error sending messages:", error);
    }
});



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
