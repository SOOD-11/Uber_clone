# API Documentation

This document provides details about the **User** and **Driver** API endpoints.

---

## Base URLs
- **User API**: `/api/v1/user`
- **Driver API**: `/api/v1/driver`

---

## User Endpoints

### 1. Register User
**URL**: `/register`  
**Method**: `POST`  
**Description**: Creates a new user account.  

#### Request Body
```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "Password123"
}
```

#### Success Response
**Code**: `200 OK`  
```json
{
  "user": {
    "email": "user@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "_id": "userId",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

#### Error Responses
- **400 Bad Request**: Validation errors.
- **401 Unauthorized**: Missing credentials or user already exists.

---

### 2. Login User
**URL**: `/login`  
**Method**: `POST`  
**Description**: Authenticates a user and returns access and refresh tokens.

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

#### Success Response
**Code**: `201 Created`  
```json
{
  "message": "logged in",
  "Accesstoken": "JWT_ACCESS_TOKEN",
  "Refreshtoken": "JWT_REFRESH_TOKEN"
}
```

#### Error Responses
- **400 Bad Request**: Validation errors.
- **401 Unauthorized**: Missing credentials or invalid email/password.
- **404 Not Found**: User not registered.
- **403 Forbidden**: Incorrect password.

---

### 3. Logout User
**URL**: `/logout`  
**Method**: `POST`  
**Description**: Logs out the user by invalidating tokens.

#### Headers
- **Authorization**: Bearer `<JWT_TOKEN>`

#### Success Response
**Code**: `201 Created`  
```json
{
  "message": "logged out"
}
```

#### Error Responses
- **401 Unauthorized**: User not authenticated.

---

### 4. Get User Details
**URL**: `/get-user`  
**Method**: `GET`  
**Description**: Retrieves details of the authenticated user.

#### Headers
- **Authorization**: Bearer `<JWT_TOKEN>`

#### Success Response
**Code**: `201 Created`  
```json
{
  "Users": {
    "email": "user@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "_id": "userId",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

#### Error Responses
- **401 Unauthorized**: User not authenticated.

---

### 5. Refresh Tokens
**URL**: `/refreshtoken`  
**Method**: `POST`  
**Description**: Generates new access and refresh tokens.

#### Request Body
```json
{
  "Refreshtoken": "JWT_REFRESH_TOKEN"
}
```

#### Success Response
**Code**: `201 Created`  
```json
{
  "Accesstoken": "JWT_ACCESS_TOKEN",
  "Refreshtoken": "JWT_REFRESH_TOKEN"
}
```

#### Error Responses
- **403 Forbidden**: Token not found or invalid.
- **402 Payment Required**: Tokens expired.
- **404 Not Found**: Both tokens expired.

---

## Driver Endpoints

### 1. Register Driver
**URL**: `/register`  
**Method**: `POST`  
**Description**: Registers a new driver with vehicle details.

#### Request Body
```json
{
  "email": "driver@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "Password123",
  "VehicleDetails": {
    "vehiclename": "Toyota",
    "vehicletype": "Car",
    "plate": "AB12CD3456",
    "Capacity": 4
  }
}
```

#### Success Response
**Code**: `201 Created`  
```json
{
  "drivers": {
    "email": "driver@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "VehicleDetails": {
      "vehiclename": "Toyota",
      "vehicletype": "Car",
      "plate": "AB12CD3456",
      "Capacity": 4
    },
    "_id": "driverId",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

#### Error Responses
- **400 Bad Request**: Validation errors.
- **401 Unauthorized**: Missing credentials.
- **402 Conflict**: Email or vehicle already registered.

---

### 2. Login Driver
**URL**: `/login`  
**Method**: `POST`  
**Description**: Authenticates a driver and returns access and refresh tokens.

#### Request Body
```json
{
  "email": "driver@example.com",
  "password": "Password123"
}
```

#### Success Response
**Code**: `201 Created`  
```json
{
  "message": "logged in",
  "Accesstoken": "JWT_ACCESS_TOKEN",
  "Refreshtoken": "JWT_REFRESH_TOKEN"
}
```

#### Error Responses
- **400 Bad Request**: Validation errors.
- **401 Unauthorized**: Missing credentials or invalid email/password.
- **404 Not Found**: Driver not registered.
- **403 Forbidden**: Incorrect password.

---

### 3. Logout Driver
**URL**: `/logout`  
**Method**: `POST`  
**Description**: Logs out the driver by invalidating tokens.

#### Headers
- **Authorization**: Bearer `<JWT_TOKEN>`

#### Success Response
**Code**: `201 Created`  
```json
{
  "message": "logged out"
}
```

#### Error Responses
- **401 Unauthorized**: Driver not authenticated.

---

### 4. Get Driver Details
**URL**: `/get-driver`  
**Method**: `GET`  
**Description**: Retrieves details of the authenticated driver.

#### Headers
- **Authorization**: Bearer `<JWT_TOKEN>`

#### Success Response
**Code**: `201 Created`  
```json
{
  "driver": {
    "email": "driver@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "VehicleDetails": {
      "vehiclename": "Toyota",
      "vehicletype": "Car",
      "plate": "AB12CD3456",
      "Capacity": 4
    },
    "_id": "driverId",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

#### Error Responses
- **401 Unauthorized**: Driver not authenticated.

---

### 5. Refresh Tokens
**URL**: `/refreshtoken`  
**Method**: `POST`  
**Description**: Generates new access and refresh tokens for the driver.

#### Request Body
```json
{
  "Refreshtoken": "JWT_REFRESH_TOKEN"
}
```

#### Success Response
**Code**: `201 Created`  
```json
{
  "Accesstoken": "JWT_ACCESS_TOKEN",
  "Refreshtoken": "JWT_REFRESH_TOKEN"
}
```

#### Error Responses
- **403 Forbidden**: Token not found or invalid.
- **402 Payment Required**: Tokens expired.
- **404 Not Found**: Both tokens expired.

---

### Notes
- All endpoints requiring authentication must include the `Authorization` header with a valid JWT token.
- Ensure the following environment variables are configured in your `.env` file:
  ```env
  ACCESS_TOKEN_SECRET=your_access_token_secret
  REFRESH_TOKEN_SECRET=your_refresh_token_secret
  ACCESS_TOKEN_EXPIRY=15m
  REFRESH_TOKEN_EXPIRY=7d
  ```