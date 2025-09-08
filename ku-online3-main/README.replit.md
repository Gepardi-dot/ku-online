# Running KU-ONLINE on Replit

Welcome to Replit! This guide will walk you through setting up and running your KU-ONLINE marketplace application in this new environment.

## 1. Configure Secrets (API Keys)

Your application needs one secret environment variable to function correctly: the `GEMINI_API_KEY`. Replit has a built-in "Secrets" manager to handle this securely.

1.  **Open the Secrets Tab:** In the left sidebar of your Replit workspace, find and click on the "Secrets" icon (it looks like a key).
2.  **Add the Secret:**
    *   In the "key" field, enter `GEMINI_API_KEY`.
    *   In the "value" field, paste your actual Gemini API key. You can get this from the [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   Click "Add new secret".

Replit will now automatically make this key available to your application as an environment variable, just like Firebase App Hosting did.

## 2. Firebase Configuration (Already in Code)

Your application's front-end needs to know which Firebase project to connect to. This configuration is public and is already included in your code in the file `src/lib/firebase.ts`. You do not need to change it.

For reference, it looks like this:

```javascript
const firebaseConfig = {
  "apiKey": "AIzaSyA6cfCjR3fXwjoN10AVeM5j36WtDENP3Cc",
  "appId": "1:348003227476:web:5a2ad7e909f9483c3adac1",
  "authDomain": "ku-online-fpva3.firebaseapp.com",
  "databaseURL": "https://ku-online-fpva3-default-rtdb.europe-west1.firebasedatabase.app",
  "messagingSenderId": "348003227476",
  "projectId": "ku-online-fpva3",
  "storageBucket": "ku-online-fpva3.appspot.com"
};
```

## 3. Running the Application

Replit should automatically detect that this is a Node.js project and configure the "Run" button to work correctly.

1.  **Install Dependencies:** The first time you run the project, Replit will automatically run `npm install` to download all the necessary packages defined in `package.json`. This may take a few minutes.
2.  **Run the App:** Click the main "Run" button at the top of the Replit interface. This will execute the `npm run dev` script from your `package.json` file, which starts the Next.js development server.

A web preview window should appear, and your KU-ONLINE application will be running!

That's it! Your project is now fully configured to run on Replit.