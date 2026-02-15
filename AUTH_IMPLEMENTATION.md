# JWT Authentication Implementation Guide

## Overview

This application now uses JWT token-based authentication with role-based access control. The JWT token contains user information including role (school_admin, teacher, or student) which is used for route protection and access management.

## Setup Instructions

### 1. Configure API Base URL

Update the API base URL in one of these ways:

**Option A: Using Environment Variables (Recommended)**
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://your-api-base-url.com/api
```

**Option B: Direct Configuration**
Edit the file: `src/config/api.config.js`

```javascript
BASE_URL: "https://your-actual-api-url.com/api";
```

### 2. API Endpoint Requirements

Your backend API should provide the following endpoint:

**POST** `/auth/login`

Request Body:

```json
{
  "school_code": "ABC-015",
  "email": "user@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**JWT Token Payload Should Include:**

```json
{
  "sub": "user-id",
  "role": "school_admin|teacher|student",
  "school_id": "school-id",
  "exp": 1234567890
}
```

## Implementation Details

### Authentication Flow

1. **Login**: User provides school code, email, and password
2. **Token Storage**: JWT token is stored in localStorage
3. **Token Decode**: Token is decoded to extract user information (userId, role, schoolId)
4. **Auto-Login**: On app reload, checks for valid token in localStorage
5. **Token Expiration**: Automatically logs out if token is expired
6. **API Requests**: Token is automatically included in all API requests via interceptor

### File Structure

```
src/
├── config/
│   └── api.config.js          # API configuration
├── services/
│   ├── api.js                 # Axios instance with interceptors
│   └── authService.js         # Authentication API calls
├── utils/
│   └── auth.js                # Token management utilities
├── components/
│   └── ProtectedRoute.jsx     # Route protection component
├── pages/
│   └── Login.jsx              # Updated login page
└── App.jsx                    # Updated with AuthContext
```

### Key Features

#### 1. Token Management (`src/utils/auth.js`)

- `decodeToken()` - Decode JWT and extract user info
- `isTokenExpired()` - Check if token is still valid
- `storeAuthData()` - Store token in localStorage
- `getStoredUserData()` - Retrieve and validate stored token
- `clearAuthData()` - Clear token on logout
- `mapRoleToUserType()` - Map API roles to app roles
- `hasRole()` - Check user permissions

#### 2. API Service (`src/services/api.js`)

- Axios instance with base configuration
- Request interceptor: Automatically adds Bearer token to requests
- Response interceptor: Handles 401 errors and token expiration

#### 3. Auth Service (`src/services/authService.js`)

- `loginUser()` - Login with credentials
- `logoutUser()` - Clear auth data and redirect
- `refreshToken()` - Refresh expired token (if supported by API)

#### 4. Protected Routes (`src/components/ProtectedRoute.jsx`)

- Checks authentication status
- Verifies user role for route access
- Redirects unauthorized users

### Role Mapping

API Roles → App Roles:

- `school_admin` → `admin`
- `teacher` → `teacher`
- `student` → `student`

### Usage Examples

#### Making Authenticated API Requests

```javascript
import api from "../services/api";

// GET request
const fetchData = async () => {
  try {
    const response = await api.get("/endpoint");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// POST request
const createData = async (data) => {
  try {
    const response = await api.post("/endpoint", data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
```

#### Protecting Routes with Specific Roles

```javascript
import ProtectedRoute from './components/ProtectedRoute';

<Route
  path="/admin-only"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/teachers-and-admin"
  element={
    <ProtectedRoute allowedRoles={['admin', 'teacher']}>
      <SharedPage />
    </ProtectedRoute>
  }
/>
```

#### Accessing User Data in Components

```javascript
import { useAuth } from "../App";

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div>
      <p>User ID: {user?.userId}</p>
      <p>Role: {user?.role}</p>
      <p>User Type: {user?.userType}</p>
      <p>School ID: {user?.schoolId}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Security Considerations

1. **Token Storage**: Tokens are stored in localStorage. For higher security, consider using httpOnly cookies.

2. **Token Expiration**: The app automatically checks token expiration and logs out expired users.

3. **HTTPS**: Always use HTTPS in production to prevent token interception.

4. **Token Refresh**: Implement token refresh mechanism for better UX (partially implemented in `authService.js`).

5. **XSS Protection**: Sanitize all user inputs to prevent XSS attacks.

## Testing

Test with the following credentials:

```json
{
  "school_code": "ABC-015",
  "email": "hareeshgouthu@gmail.com",
  "password": "SchoolAdmin@12345"
}
```

Expected response with role `school_admin` will grant admin dashboard access.

## Troubleshooting

### Login Issues

- Check API URL in config
- Verify API endpoint format
- Check CORS settings on backend
- Inspect network tab for errors

### Token Issues

- Clear localStorage and try again
- Check token expiration time
- Verify JWT secret matches backend

### Route Access Issues

- Check user role mapping
- Verify allowedRoles array
- Check ProtectedRoute implementation

## Next Steps

1. ✅ JWT authentication implemented
2. ✅ Role-based access control
3. 🔄 Add token refresh mechanism
4. 🔄 Implement remember me functionality
5. 🔄 Add forgot password flow
6. 🔄 Add loading states for protected routes
7. 🔄 Implement API calls in dashboard pages

---

For questions or issues, refer to the inline documentation in each file.
