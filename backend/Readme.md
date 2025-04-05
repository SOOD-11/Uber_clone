# User API Documentation

This document provides details about the user-related API endpoints.

---

## Base URL
`/api/v1/user`

---

## Endpoints

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
    "socketId": null,
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
    "socketId": null,
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

### Notes
- All endpoints requiring authentication must include the `Authorization` header with a valid JWT token.
- Ensure the following environment variables are configured in your `.env` file:
  ```env
  ACCESS_TOKEN_SECRET=your_access_token_secret
  REFRESH_TOKEN_SECRET=your_refresh_token_secret
  ACCESS_TOKEN_EXPIRY=15m
  REFRESH_TOKEN_EXPIRY=7d
  ```