# MERN Assignment Demo

A full-stack **MERN** (MongoDB, Express, React, Node.js) application demonstrating **user authentication** and **task management**.  

Users can register, login, manage sessions with **JWT access/refresh tokens**, and perform **CRUD operations** on tasks.

---

## 🚀 Features

### Authentication & Authorization
- User registration & login  
- Secure password hashing with **bcrypt**  
- JWT-based access & refresh tokens  
- Cookie-based refresh token storage  
- Logout & token refresh endpoints  

### Task Management
- Create, Read, Update, Delete (**CRUD**) tasks  
- Mark tasks as **completed/open**  
- Input validation & error handling  

### Frontend
- Built with **React**  
- User-friendly forms for login/registration  
- Task dashboard with **add, toggle, delete** functionality  

---

## 📸 Screenshots

**Frontend Screens**
![Register Page](https://github.com/user-attachments/assets/83776f8f-510f-474e-91ba-322e4c5c679e)
![Dashboard 1](https://github.com/user-attachments/assets/23c01a33-d910-487c-a28d-90ebbfdc0525)
![Dashboard 2](https://github.com/user-attachments/assets/96a848e7-b238-403c-948c-a9a0f6af1d36)

**API Routing**
<img width="889" height="991" alt="Screenshot 2025-10-02 200140" src="https://github.com/user-attachments/assets/3f974c94-819b-4f30-b7b8-052077de8ed8" />

<img width="946" height="989" alt="Screenshot 2025-10-02 200233" src="https://github.com/user-attachments/assets/c86907a0-cdf9-463a-9760-b8420e1c456d" />

![Auth API](https://github.com/user-attachments/assets/c0ded384-6619-4523-a45b-3d14b7751abd)
![Tasks API 1](https://github.com/user-attachments/assets/2756d100-6a95-4fc3-8c69-9d350f8110fa)
![Tasks API 2](https://github.com/user-attachments/assets/3a128a63-32ba-40ff-92c4-281a265113c7)
![Tasks API 3](https://github.com/user-attachments/assets/f7225cc5-de82-41f6-9a9f-f825ed2cdd4e)

---

## 🛠️ Tech Stack

- **Frontend:** React, Fetch API  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT (access + refresh tokens), bcryptjs  
- **Validation:** Joi  

---

## 📡 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ver1/auth/register` | Register a new user |
| POST | `/api/ver1/auth/login` | Login and receive access & refresh tokens |
| POST | `/api/ver1/auth/refresh` | Refresh access token |
| POST | `/api/ver1/auth/logout` | Logout and clear refresh token |

### Task Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ver1/tasks` | Get all tasks (for logged-in user) |
| POST | `/api/ver1/tasks` | Create a new task |
| PUT | `/api/ver1/tasks/:id` | Update a task (toggle complete/edit) |
| DELETE | `/api/ver1/tasks/:id` | Delete a task |

---

## ⚙️ Installation & Setup

### Clone Repository
```bash
git clone https://github.com/your-username/mern-assignment-demo.git
cd mern-assignment-demo
