# City Complaint & Service Platform 🏙️

**"Find a service door to door"**

---

## Project Overview

City Complaint & Service is a backend API for a service and complaint Agency. Citizen can buy service by paying amount or complate by free like rode damage, Lamp light missing, Cleaning etc

---

## Roles & Permissions

| Role        | Description               | Key Permissions                                                                      |
| ----------- | ------------------------- | ------------------------------------------------------------------------------------ |
| **CITIZEN** | Users looking for service | order service or complaint                                                           |
| **STAFF**   | service provider          | complete the service or complaint                                                    |
| **ADMIN**   | Platform moderators       | Manage all users, oversee all serivices and complaint requests and manage categories |

> 💡 **Note**: ADMIN can create STAFF .

---

## Features

### Public Features

- Browse all available services

### Citizen Features

- Register and login as cizitzen using google mail or creadential
- Submit service request or complaint
- Make payments via SSLCommerz
- View payment history and payment status\*\*
- View service request history (pending, approved, rejected)

### Staff Features

- Register by admin
- Edit service status like on-going | complate
- View all own service request

### Admin Features

- View all users
- Manage user status
- View all complaint and service request
- Manage service and complaint categories

---

## 🛠️ Tech Stack

### Backend

| Technology        | Purpose         |
| ----------------- | --------------- |
| Node.js + Express | REST API        |
| TypeScript        | Type safety     |
| Postgres          | Database        |
| Prisma            | ORM             |
| JWT, ZOD          | data validation |

---

### For Payment: SSL COMMERZ

### Deployment

| Service | Purpose                |
| ------- | ---------------------- |
| Vercel  | Backend API deployment |

---

## Live Backend Link: https://city-complaint-service-backend-a6.vercel.app
