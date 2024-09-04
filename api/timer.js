const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json'); // Adjust path if needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://game-33e6e-default-rtdb.firebaseio.com/' // Replace with your Firebase DB URL
});

const db = admin.database();
const timerRef = db.ref('timer');

const TIMER_DURATION = 15; // 15 seconds
let timerValue = TIMER_DURATION;

exports.handler = async (req, res) => {
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

  res.status(200).json({ message: 'Timer function is running' });
};
