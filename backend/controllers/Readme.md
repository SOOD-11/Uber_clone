# User API Documentation

This document provides details about the API endpoints for user-related operations.

---

## Base URL
`/api/v1/user`

---

## Endpoints

### 1. Register User
**URL**: `/register`  
**Method**: `POST`  
**Description**: Creates a new user account with the provided information.  

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

#### Validation Rules
- **Email**: Must be a valid email address.
- **Firstname**: Minimum 3 characters.
- **Password**:
  - Minimum 8 characters.
  - Must contain at least one uppercase letter.
  - Must contain at least one lowercase letter.
  - Must contain at least one number.

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
  },
  "token": "JWT_TOKEN"
}
```

#### Error Responses
- **Validation Error**: `400 Bad Request`
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "path": "email",
        "location": "body"
      }
    ]
  }
  ```
- **Missing Credentials**: `401 Unauthorized`
  ```json
  {
    "success": false,
    "message": "fill all the credentials"
  }
  ```
- **User Already Exists**: `401 Unauthorized`
  ```json
  {
    "success": false,
    "message": "user already exist"
  }
  ```
- **Server Error**: `500 Internal Server Error`
  ```json
  {
    "success": false,
    "message": "Internal server error"
  }
  ```

---

### 2. Login User
**URL**: `/login`  
**Method**: `POST`  
**Description**: Authenticates a user and returns a JWT token.

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

#### Validation Rules
- **Email**: Must be a valid email address.
- **Password**:
  - Minimum 8 characters.
  - Must contain at least one uppercase letter.
  - Must contain at least one lowercase letter.
  - Must contain at least one number.

#### Success Response
**Code**: `200 OK`  
```json
{
  "token": "JWT_TOKEN"
}
```

#### Error Responses
- **Validation Error**: `400 Bad Request`
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "path": "email",
        "location": "body"
      }
    ]
  }
  ```
- **Invalid Credentials**: `401 Unauthorized`
  ```json
  {
    "success": false,
    "message": "Invalid email or password"
  }
  ```

---

### 3. Logout User
**URL**: `/logout`  
**Method**: `POST`  
**Description**: Logs out the user by invalidating the JWT token.

#### Headers
- **Authorization**: Bearer `<JWT_TOKEN>`

#### Success Response
**Code**: `200 OK`  
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### Error Responses
- **Unauthorized**: `401 Unauthorized`
  ```json
  {
    "success": false,
    "message": "Unauthorized"
  }
  ```

---

### 4. Get User Details
**URL**: `/get-user`  
**Method**: `GET`  
**Description**: Retrieves the details of the authenticated user.

#### Headers
- **Authorization**: Bearer `<JWT_TOKEN>`

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
- **Unauthorized**: `401 Unauthorized`
  ```json
  {
    "success": false,
    "message": "Unauthorized"
  }
  ```

---

### Notes
- All endpoints that require authentication must include the `Authorization` header with a valid JWT token.
- Ensure that the `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` environment variables are properly configured in your `.env` file.

```env
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```