# WeSnap 📸

### A Modern Social Media Platform for Sharing Moments

WeSnap is a modern social media web application that allows users to share moments through photos, connect with friends, and interact through likes, comments, and stories. Inspired by platforms like Snapchat and Instagram, WeSnap focuses on simple, fast, and engaging visual communication.

---

## 🚀 Features

### 🔐 Authentication

* User signup and login
* Secure authentication system
* Profile creation and management

### 📸 Post Sharing

* Upload photos and share posts
* View posts from other users in a feed
* Like and comment on posts

### 👥 Social Interaction

* Follow and unfollow users
* View profiles of other users
* Explore posts from the community

### ⏳ Stories

* Upload stories that disappear after 24 hours
* View stories from followed users

### 💬 Messaging *(Optional / Future Feature)*

* Real-time chat between users
* Share images and messages instantly

### 🔔 Notifications *(Optional / Future Feature)*

* Notifications for likes, comments, and follows

---

## 🏗️ Tech Stack

### Frontend

* **React.js** – UI development
* **Tailwind CSS** – Styling
* **React Router** – Navigation

### Backend

* **Firebase Authentication** – User authentication
* **Firebase Firestore** – Database
* **Firebase Storage** – Image storage

### Tools

* **Git & GitHub** – Version control
* **Vite / Create React App** – Development environment

---

## 📂 Project Structure

```
wesnap/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar
│   │   ├── PostCard
│   │   ├── StoryCard
│   │   └── Sidebar
│   │
│   ├── pages/
│   │   ├── Home
│   │   ├── Profile
│   │   ├── Login
│   │   ├── Signup
│   │   └── Explore
│   │
│   ├── firebase/
│   │   └── config.js
│   │
│   ├── hooks/
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/harshit-46/wesnap.git
cd wesnap
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and add your Firebase configuration:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 📊 Future Improvements

* Real-time chat system
* AI-powered content recommendations
* Image filters and editing tools
* Push notifications
* Mobile app version

---

## 🎯 Learning Objectives

This project was built to practice and demonstrate:

* Building full-stack social media applications
* Firebase authentication and database management
* Image upload and storage
* Responsive UI development with React and Tailwind
* Component-based frontend architecture

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Harshit Gupta**
Final Year B.Tech CSE (AI & Data Science)

Building projects in **AI, Full Stack Development, and Machine Learning**.
