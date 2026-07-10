const admin = require("firebase-admin");

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable:", error);
  }
} else {
  try {
    serviceAccount = require("./serviceAccountKey.json");
  } catch (error) {
    console.error("serviceAccountKey.json is missing and no FIREBASE_SERVICE_ACCOUNT env variable is set.");
  }
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.error("Firebase Admin SDK failed to initialize: No credentials found.");
}

module.exports = admin;