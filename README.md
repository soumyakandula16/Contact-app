# Contact-app
# 📇 Firebase Contacts Manager

A simple contact management web app built using **React** and **Firebase Firestore** with **Authentication** support. Users can **add**, **edit**, and **delete** their personal contact details — all securely stored in Firestore.

---

## 🚀 Features

- 🔐 Firebase Authentication
- 📁 User-specific contacts (stored in Firestore)
- ✍️ Add / Edit / Delete contacts
- 🔄 Realtime fetch after updates
- 💬 Notifications using `react-toastify`
- ✅ Mobile-friendly responsive UI (Bootstrap)

---

## 🛠 Tech Stack

- **Frontend:** React, Bootstrap
- **Backend:** Firebase (Auth + Firestore)
- **Other Libraries:** React Router, React Toastify

---

## 🧑‍💻 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/firebase-contacts-manager.git
cd firebase-contacts-manager

2. Install Dependencies

npm install

3. Setup Firebase

    Go to Firebase Console

    Create a new project

    Enable Authentication (Email/Password)

    Create a Firestore Database

    In the Firestore rules, use:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}

    Go to Project Settings > General > SDK config, and copy your Firebase config.

4. Add Firebase Config

Create a file called firebaseConfig.js inside src/:

// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

5. Run the App

npm start

Visit: http://localhost:3000
📂 Folder Structure

src/
├── Components/
│   ├── Home.js
│   ├── Login.js
│   └── Signup.js
├── firebaseConfig.js
├── App.js
└── index.js
✅ Future Improvements

    Search & filter contacts

    Pagination or infinite scroll

    Form validation using Yup / Formik

    Dark mode toggle 🌙

📄 License

This project is open-source and free to use.
👨‍💻 Developer

Soumya Kandula
