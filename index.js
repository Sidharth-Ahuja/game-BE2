const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json'); // Adjust the path if needed

const app = express();
const port = process.env.PORT || 3000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://game-33e6e-default-rtdb.firebaseio.com/' // Replace with your Firebase DB URL
});

const db = admin.database();
const timerRef = db.ref('timer');

const TIMER_DURATION = 15; // 15 seconds
let timerValue = TIMER_DURATION;

const startTimer = () => {
  setInterval(async () => {
    if (timerValue <= 0) {
      timerValue = TIMER_DURATION;
    } else {
      timerValue--;
    }

    try {
      await timerRef.set(timerValue);
      console.log(`Timer updated: ${timerValue} seconds remaining`);
    } catch (error) {
      console.error('Error updating timer:', error);
    }
  }, 1000);
};

startTimer();

app.get('/', (req, res) => {
  res.send('Timer function is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
