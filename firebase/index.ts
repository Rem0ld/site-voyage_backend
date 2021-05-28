import admin from "firebase-admin";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require("./site-voyage-development-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;