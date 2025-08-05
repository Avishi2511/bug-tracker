# 🐞 Bug Tracker

A full-stack, role-based bug tracking system built with React, Node.js, Express, and MongoDB. Supports public and internal bug reporting, role-specific dashboards (Admin, Developer, Tester), and secure workflows. Deployed on Vercel (frontend) & Render (backend).

---

## 🚀 Features

- **Public Reporting**: Allow unauthenticated users to submit bugs directly to Admin.
- **Role-Based Dashboards**:
  - **Testers**: Report bugs, view submitted bugs.
  - **Developers**: View and update assigned bugs.
  - **Admin**: Manage users, projects, bug assignments, all-encompassing view.
- **Secure User Management**: JWT authentication, bcrypt password hashing, role-based access.
- **Complete Workflow**: Internal/external bug reporting → Admin assignment → Developer updates.
- **Security Best Practices**: Input validation, rate limiting, CORS protection.
- **Production Infrastructure**: Fully deployed with CI/CD workflows for both frontend and backend.

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Avishi2511/bug-tracker.git
cd bug-tracker

# Install dependencies for the backend
cd backend
npm install

# Start the backend
npm start

# Open a new terminal for frontend
cd ../frontend
npm install

# Start the frontend
npm start


