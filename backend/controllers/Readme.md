# User Registration API Documentation

## Register User
Creates a new user account with the provided information.

**URL**: `/api/v1/user/register`

**Method**: `POST`

**Content-Type**: `application/json`

### Request Body
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

### Validation Rules
- **Email**: Must be a valid email address
- **Firstname**: Minimum 3 characters
- **Password**: 
  - Minimum 8 characters
  - Must contain at least one uppercase letter
  - Must contain at least one lowercase letter
  - Must contain at least one number

### Success Response
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

### Error Responses

#### Validation Error
**Code**: `400 Bad Request`
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

#### Missing Credentials
**Code**: `401 Unauthorized`
```json
{
  "success": false,
  "message": "fill all the credentials"
}
```

#### User Already Exists
**Code**: `401 Unauthorized`
```json
{
  "success": false,
  "message": "user already exist"
}
```

#### Server Error
**Code**: `500 Internal Server Error`
```json
{
  "success": false,
  "message": "Internal server error"
}
```