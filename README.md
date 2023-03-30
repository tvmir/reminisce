<div align="center">
 
<img src="https://user-images.githubusercontent.com/64425583/228790926-f175c932-59c0-43b7-a877-edfe7435e03b.PNG" height="400"/>
<img src="https://user-images.githubusercontent.com/64425583/228790847-eb9d9265-3fd7-4961-9d8e-92e6a9aa474f.PNG" height="400"/>
<img src="https://user-images.githubusercontent.com/64425583/228788547-4cf23ada-c7f4-4511-86b2-8e7e18b96301.gif" height="400"/>

  <p></p>
  <h1>Reminisce</h1>
  <p>Reminisce is an AR social platform that allows users to connect with friends and discover new places through augmented reality.</p>
  <p></p>
</div>


# Technologies Used

- React Native 
- Expo
- TypeScript
- Firebase
    - Cloud Firestore
    - Authentication
    - Storage
- Redux Toolkit
- React Navigation v6
- Google Maps API

# Getting Started
Clone the repository and install its dependencies:
```bash
# Clone
git clone https://github.com/tvmir/reminisce.git

# Install dependencies
yarn install

# Run Expo
expo start
```

# Configuration
You will have to set up a Firebase project and obtain an API key for the Google Maps API. Once setup add them to your .env file.

```javascript
const firebaseConfig = {
  apiKey: <API_KEY>,
  authDomain: <AUTH_DOMAIN>,
  projectId: <PROJECT_ID>,
  storageBucket: <STORAGE_BUCKET>,
  messagingSenderId: <MESSAGING_SENDER_ID>,
  appId: <APP_ID>,
  measurementId: <MEASUREMENT_ID>,
};
```
