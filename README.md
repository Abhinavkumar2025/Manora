# Manora

Manora is a full-stack web platform that helps people manage real-world experiences through community reporting and personal memories.

Users can securely sign up, report lost items with images, and maintain a personal photo gallery (travel diary) to preserve important moments.  
The system focuses on clean architecture, secure authentication, and scalable API-driven design.

This project represents my journey toward building production-ready applications with real user flows, proper backend structuring, and modern frontend practices.

---

## Features

### Authentication & Users
- Signup & login with email/password  
- JWT based authentication  
- Protected routes  
- Persistent sessions  
- Google OAuth  
- GitHub OAuth  

---

### Lost & Found System
- Create lost item reports  
- Upload item images  
- Browse submitted reports  
- Backend validation using Joi  
- Organized API structure  

---

### Photo Gallery / Travel Diary
- Upload photos to cloud storage  
- Create memory collections  
- Add captions and descriptions  
- View images in organized format  
- User-based ownership of content  

---

### Home Experience
- Landing page introduction  
- Central navigation to modules  
- Clean UI layout  

---

### System Capabilities
- RESTful API communication  
- Middleware-based protection  
- Error handling  
- Secure file uploads  
- Context-driven frontend state  
- Modular and extensible design  

---

## 🛠️ Tech Stack

### Frontend
- React  
- React Router  
- Context API  
- CSS  
- Axios / Fetch  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB  
- Mongoose  

### Authentication & Security
- JWT (JSON Web Tokens)  
- Passport.js  
- Google OAuth  
- GitHub OAuth  
- bcrypt password hashing  

### Media Storage
- Cloudinary  

### Validation
- Joi  

### Other Tools
- Git & GitHub  
- Environment variables  
- Nodemon  
- Vite  

---

## Project Structure

```
MANORA/
│
├── Backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── passport.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── reportController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── upload.js
│   │   └── validate.js
│   │
│   ├── models/
│   │   ├── report.js
│   │   └── users.js
│   │
│   ├── routes/
│   │   ├── authRoute.js
│   │   └── reportRoute.js
│   │
│   ├── validators/
│   │   ├── authValidator.js
│   │   └── reportValidator.js
│   │
│   ├── app.js
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   ├── Lost_Found/
│   │   │   └── other UI components
│   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Contest/
│   │   │   ├── Reviews/
│   │   │   ├── Winners/
│   │   │   ├── Lost_And_Found/
│   │   │   └── Auth/
│   │
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## Architecture

The backend follows modular design principles:

- Controllers → handle business logic  
- Routes → define API endpoints  
- Middleware → authentication, validation, uploads  
- Models → database structure  
- Config → third-party integrations  

The frontend uses reusable components and centralized authentication state to maintain predictable behavior.

---

## What I Learned

- Building secure authentication systems  
- Implementing JWT & OAuth  
- Structuring backend using controllers & middleware  
- Designing REST APIs  
- Handling file uploads with cloud storage  
- Managing global state in React  
- Connecting frontend and backend in real environments  

---

## Status

Actively under development.  
Continuously improving structure, scalability, and feature depth.
