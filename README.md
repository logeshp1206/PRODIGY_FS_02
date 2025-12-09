# Employee Management System (Authentication + CROD Operations)

**PRODIGY_FS_02 — Prodigy InfoTech Full-Stack Development Internship (Task 02)**

---

## 📋 Project Overview
A role-based Employee Management Dashboard with secure authentication and role-based access control. Only Admin users can perform CRUD operations on employee records, while regular users have limited view-only access.

---

## ✨ Key Features
• Secure User Authentication with JWT
• Role-Based Access Control (Admin/User)
• Employee CRUD Operations (Create, Read, Update, Delete)
• Protected Routes with Middleware
• Password Security with Bcrypt Hashing
• Clean Dashboard Interface
• MongoDB Database Integration

---

## 🛠️ Technology Stack

**Frontend:**
• HTML5
• CSS3
• Vanilla JavaScript

**Backend:**
• Node.js
• Express.js

**Database:**
• MongoDB Atlas

**Authentication & Security:**
• JSON Web Tokens (JWT)
• Bcrypt for Password Hashing

---

## 📁 Project Structure
PRODIGY_FS_02/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── employeeController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Employee.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── employeeRoutes.js
│   ├── createAdmin.js
│   ├── app.js
│   ├── package.json
│   └── .env
└── client/
    ├── index.html
    ├── dashboard.html
    ├── style.css
    └── script.js

---

## 🚀 Installation & Setup

### Prerequisites:
• Node.js installed
• MongoDB Atlas account
• Git

### Step-by-Step Setup:

1. Clone the repository:
```
git clone https://github.com/yourusername/PRODIGY_FS_02.git
cd PRODIGY_FS_02
```

2. Navigate to server directory and install dependencies:
```
cd server
npm install
```

3. Configure environment variables:
Create a `.env` file in the server directory with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

4. Create the initial Admin user:
```
node createAdmin.js
```

5. Start the backend server:
```
node app.js
```

6. Access the application:
Open your browser and navigate to `http://localhost:5001`

---

## 👥 User Roles & Permissions

### Admin User:
• Can login with credentials created via createAdmin.js
• Full access to all employee records
• Can Add, Edit, Delete employees
• Can View all employee details

### Regular User:
• Can login with user credentials
• Can only view employee records
• Cannot modify any data
• No access to admin functions

---

## 🔒 Authentication Flow

1. User Login:
   - Enter email and password
   - Server validates credentials
   - Generates JWT token
   - Returns token to client

2. Protected Access:
   - All dashboard requests include JWT
   - Middleware validates token
   - Role-based access control enforced

3. Session Management:
   - Token stored in localStorage
   - Automatic logout on token expiry
   - Secure logout functionality

---

## 📊 API Endpoints

**Authentication Routes:**
• POST /api/auth/login - User login

**Employee Routes (Protected):**
• GET /api/employees - Get all employees
• POST /api/employees - Add new employee (Admin only)
• PUT /api/employees/:id - Update employee (Admin only)
• DELETE /api/employees/:id - Delete employee (Admin only)

---

## 🎯 Task Requirements Completed

✅ Secure Authentication System
✅ Role-Based Access Control
✅ Complete CRUD Operations
✅ MongoDB Database Integration
✅ Responsive Dashboard UI
✅ Protected Routes Implementation
✅ Password Security with Hashing
✅ RESTful API Design

---

## 📝 Key Learnings

• Full-Stack Development Workflow
• JWT Authentication Implementation
• Role-Based Authorization
• MongoDB CRUD Operations
• Express Middleware Development
• Frontend-Backend Integration
• Error Handling and Validation
• Security Best Practices

---

## 🐛 Testing Credentials

After running `createAdmin.js`, use:
• Email: masteradmin@example.com
• Password: Admin@123

For regular users, register through the application interface.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📞 Support

For issues or questions:
• Create an issue in the GitHub repository
• Check the project documentation
• Review the code structure

---

## 🔗 Repository
GitHub: https://github.com/logeshp1206/PRODIGY_FS_02

---

## 👨‍💻 Developer Information

**Developer:** Logesh
**Internship:** Prodigy InfoTech Full-Stack Development
**Project:** PRODIGY_FS_02 - Employee Management System
**Task:** Task 02 - Authentication with CRUD Operations

---

## 📜 License

This project was developed as part of the Prodigy InfoTech Full-Stack Development Internship Program.

---
