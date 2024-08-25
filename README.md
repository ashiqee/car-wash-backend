# batch-3-assignment-3-0920 | Car Wash Booking System

### **Submission : (Please check my submissions:)**

- GitHub Repository URL (Server): https://github.com/ashiqee/assgn-3-car-wash-system-0920
- Live Server Link: https://assgn-3-car-wash-system-0920.onrender.com/api
- Project Overview Video: https://youtu.be/rIPQYVIBwaE?si=tsot21FvoBQKQn70

- alternative live link : https://car-wash-system-0920.vercel.app/api

**Objective:** Develop a Express application with TypeScript as the programming language, integrating MongoDB with Mongoose for effective data management. Ensure data integrity through validation using Zod.

# Car Wash Booking System API

This is a Car Wash Booking System API built with Node.js Express, Mongoose, and TypeScript.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)


## Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn
- MongoDB (running locally or a connection URI to a remote instance)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ashiqee/assgn-3-car-wash-system-0920.git
   ```

2. Install dependencies:

### usi npm:

```tsc
npm i
```

## Configuration

1. Create a `.env` file in the root directory of the project and add the following enviroment variables:

```tsc

NODE_ENV = development
PORT=5000
<!-- when use please uncomment DATABASE_URL -->
<!-- DATABASE_URL = mongodb+srv://ashiqcoder5:BLygrFDYHErU9BHV@cluster0.z58pud1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 -->
BCRYPT_SALT_ROUNDS=12
DEFAULT_PASSWORD=carWashSys@2024

JWT_ACCESS_SECRET =091b2c529dec033b5ff4531e622ea3f93170e045222963319662b7e4a34f0cdd
JWT_ACCESS_EXPIRES_IN=10d

JWT_REFRESH_SECRET = 4f5ab918b15c0a6ddaf5c404695f19a48415e402e9f1172752768665c7197300a99e0b8f16a98b7b58da721c221735274d3c2c04e311cd35976a69c92aac9279
JWT_REFRESH_EXPIRES_IN=365d
```

### Runnig the Application

1. To compile and run the TypeScript application in development mode with hot-reloading, use:

```bash
npm run dev
```

2. To build the application for production

```bash
npm run build
```

3. To start the build application:

```bash
npm run start
```

## API Endpoints
live link: https://assgn-3-car-wash-system-0920.onrender.com/api

### User Routes
    1. User sign up

  - `POST` `/auth/signup` - User signup as a admin or user.

**Request Body:**

```json
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com", //need to change for avoid duplicate user
  "password": "ph-password",
  "phone": "1234567890",
  "role": "admin", //role can be user or admin
  "address": "123 Main Street, City, Country"
}
```

  2. User login
   - `POST` `/auth/login` - User Login as a admin or user.

   [Login API](#login)

```json
https://assgn-3-car-wash-system-0920.onrender.com/api/auth/login
```

   **Request Body:**

```json
// admin login
{
    "email": "admin@programming-hero.com",
    "password": "ph-password"
}

//user login
{
    "email": "user@programming-hero.com",
    "password": "ph-password"
}

```


### 3. Create Service (Only Accessible by Admin)
   - `POST` `/services` - only admin can create services.

`#### Attention!:` only admin can post this route so if you test in postman tool, you need to login as admin and copy token from responed then paste it headers key:`Authorization` value: `token`

**Request Body:**

```json
{
    "name": "Car Glass Wash",
    "description": "Car Glass washing service",
    "price": 20,
    "duration": 60, // Duration in minutes
    "isDeleted": false
}

```


### 4. Get a service
   - `GET` `/services/:id` - Get single service by id.


**API URL:**

```json
https://assgn-3-car-wash-system-0920.onrender.com/api/services/666a56218e9d8afa23bf0ceb

```

### 5. Get all services
   - `GET` `/services` - Get All Services.


**API URL:**

```json
https://assgn-3-car-wash-system-0920.onrender.com/api/services
```

### 6.  Update Services (Only Accessible by Admin)
   - `PUT` `/services/:id` - Update Service by id.

`#### Attention!:` only admin can update this route so if you test in postman tool, you need to login as admin and copy token from responed then paste it headers key:`Authorization` value: `token`


**Request Body:**

```json
{
    "price": 700 // You can include any attribute(s) of the service collection that you want to update, one or more.
}
```

### 7. Delete a Service (Only Accessible by Admin)
   - `DELETE` `/services/:id` - Delete a Service By ID.

`#### Attention!:` only admin can delete this route so if you test in postman tool, you need to login as admin and copy token from responed then paste it headers key:`Authorization` value: `token`


**API URL:**

```json
https://assgn-3-car-wash-system-0920.onrender.com/api/services/666a58da42ab520dd4783282
```

### 8. Create Slot (Only Accessible by Admin)
   - `POST` `/services/slots` - Create Service Slots.

`#### Attention!:` only admin can post this route so if you test in postman tool, you need to login as admin and copy token from responed then paste it headers key:`Authorization` value: `token`


**API URL:**
```json
https://assgn-3-car-wash-system-0920.onrender.com/api/services/slots
```

**Request Body:**
```json
{
    "service": "666a56218e9d8afa23bf0ceb", 
    "date": "2024-06-14", //need to change if show already exits
    "startTime": "09:00", //need to change if show already exits
    "endTime": "14:00" 
}
```

### 9. Get available slots
   - `GET` `/slots/availability` - Get available Slots.
#### Query paramneters
- `date`: (Optional)  The specific date for which available slots are requested (format: YYYY-MM-DD).
- `serviceId`: (Optional) ID of the service for which available slots are requested

**Request Query Example:**
```json
https://assgn-3-car-wash-system-0920.onrender.com/api/slots/availability?date=2024-06-14&serviceId=666a56218e9d8afa23bf0ceb
```

### 10. Book a Service (Only Accessible by User)
   - `POST` `/bookings` - User Book a service with a available solt.

`#### Attention!:` only user can post this route so if you test in postman tool, you need to login as user and copy token from responed then paste it headers key:`Authorization` value: `token`



**API POST URL:**
```json
https://assgn-3-car-wash-system-0920.onrender.com/api/bookings
```

**Request Body:**
```json
{
    "service": "666a56218e9d8afa23bf0ceb",
    "slot": "666d5566ffa26bfbc2b0d504",
    "vehicleType": "car", // Example enum: 'car','truck', 'suv', 'van',
    "vehicleBrand": "Tata", // Example enum: "Toyota","Tata","Runner","Hyundai", "Bmw",
    "vehicleModel": "Camry",
    "manufacturingYear": 2020,
    "registrationPlate": "ABC123"
}
```

### 11. Get All Bookings (Only Accessible by Admin)
   - `GET` `/bookings` - Get All Bookings.

`#### Attention!:` only admin can Get this route so if you test in postman tool, you need to login as admin and copy token from responed then paste it headers key:`Authorization` value: `token`



**API URL:**
```json
https://assgn-3-car-wash-system-0920.onrender.com/api/bookings
```


### 12. Get User's Bookings (Only Accessible by User)
   - `GET` `/my-bookings` - Get User's Bookings.

`#### Attention!:` only user can Get this route so if you test in postman tool, you need to login as user and copy token from responed then paste it headers key:`Authorization` value: `token`



**API URL:**
```json
https://assgn-3-car-wash-system-0920.onrender.com/api/my-bookings
```




### Additional Information

- Environment Variables: Store all environment-specific configurations in the .env file.
- Linting: The project uses ESLint for code quality and consistency.
- Formatting: The project uses Prettier for code formatting.

### **Validation with Zod**

## Bonus part 
### 1.  No Data Found


1st Need Login as user
 [Login here - Api Link](#login)

```json
https://assgn-3-car-wash-system-0920.onrender.com/api/my-bookings
```

##If have not any data get No data found

```json
{
    "success": false,
    "statusCode": 404,
    "message": "No Data Found",
    "data": []
}
```

### 2.Error Handling
check `POST` Api link : `https://assgn-3-car-wash-system-0920.onrender.com/api/auth/signup`

Request body example

```json
{
    "password": "ph-password",
    "name": "",
    "email": "user2@programming-hero.com",
    "phone": "1234567890",
    "role": "user",
    "address": "Dhaka Main Street, City, Country"
}
```
Show Error example

```json
{
    "success": false,
    "message": "Zod validtion Error",
    "errorMessages": [
        {
            "path": "name",
            "message": "Name is required"
        }
    ],
    "stack":...
}
```

### 3. Not Found Route:
check `GET` api link: `https://assgn-3-car-wash-system-0920.onrender.com/api/my-bookingsdd`

show error: 
```json
{
    "success": false,
    "statusCode": 404,
    "message": "Not Found"
}
```
### 4. Authentication Middleware:

- `GET` Route  `/bookings/`

show error: 
```json
{
    "success": false,
    "message": "You have no access to this route",
    "errorMessages": [
        {
            "path": "",
            "message": "You have no access to this route"
        }
    ],
    "stack":
}
```


### 5. Zod Validation:

```json
{
    "success": false,
    "message": "Zod validtion Error",
    "errorMessages": [
        {
            "path": "name",
            "message": "Name is required"
        }
    ],
    "stack":...
}