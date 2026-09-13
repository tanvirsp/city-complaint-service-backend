# Rent Nest 🏠

**"Find & List Rental Properties with Ease"**

---

## Project Overview

RentNest is a backend API for a rental property marketplace. Landlords can list properties, manage availability, and approve or reject rental requests. Tenants can browse listings, submit rental requests, and leave reviews. Admins oversee the entire platform, managing users and moderating content.

---

## Roles & Permissions

| Role         | Description                         | Key Permissions                                                        |
| ------------ | ----------------------------------- | ---------------------------------------------------------------------- |
| **Tenant**   | Users looking for rental properties | Browse listings, submit rental requests, leave reviews, manage profile |
| **Landlord** | Property owners who list rentals    | Create/manage listings, approve/reject requests, view tenant history   |
| **Admin**    | Platform moderators                 | Manage all users, oversee all listings & requests, manage categories   |

> 💡 **Note**: Users select their role during registration.

---

## Features

### Public Features

- Browse all available rental properties
- Search and filter by location, price range, property type, and amenities
- View detailed property listings

### Tenant Features

- Register and login as tenant
- Submit rental requests for properties
- **Make payments via SSLCommerz after rental request is approved**
- **View payment history and payment status**
- View rental request history (pending, approved, rejected)
- Leave reviews after a completed rental
- Manage Own profile

### Landlord Features

- Register and login as landlord
- Create, edit, and remove property listings
- Set property availability status
- Approve or reject rental requests
- View rental history and tenant reviews
- Manage Own profile

### Admin Features

- View all users (tenants and landlords)
- Manage user status (ban/unban)
- View all listings and rental requests
- Manage property categories

---

## 🛠️ Tech Stack

### Backend

| Technology        | Purpose        |
| ----------------- | -------------- |
| Node.js + Express | REST API       |
| TypeScript        | Type safety    |
| Postgres          | Database       |
| Prisma            | ORM            |
| JWT               | Authentication |

---

### For Payment: SSL COMMERZ

### Deployment

| Service | Purpose                |
| ------- | ---------------------- |
| Vercel  | Backend API deployment |

---

## Live Backend Link: https://rent-nest-backend-gamma.vercel.app
