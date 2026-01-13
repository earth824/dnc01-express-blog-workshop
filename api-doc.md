# Simple Blog API

This is an API example describing a simple blog API.

## Authentication

| Method | Endpoint       | Description                                 |
| ------ | -------------- | ------------------------------------------- |
| POST   | /auth/register | Create a new user account                   |
| POST   | /auth/login    | Authenticates a user with their credentials |

### Register

```plaintext
POST /auth/register
```

Creates a new user account. This endpoint registers a user using the provided credentials and required profile information

#### Body

| Attribute  | Type   | Required | Description                                                                                                |
| ---------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| `username` | string | Yes      | Unique identifier for the user. Must be a valid username and not already registered.                       |
| `password` | string | Yes      | User’s password. Must be at least 6 characters long and contain only letters (A–Z, a–z) and numbers (0–9). |
| `role`     | string | No       | Role assigned to the user. Allowed values are admin or user. If not provided, the default role is user.    |

##### Example

```
{
  "username": "john",
  "password": "123456",
  "role": "admin"
}
```

#### Response

`201 Created`

Registration successful. The user account has been created successfully.

##### Example response

```
{
  "message": "user registered successfully"
}
```

`400 Bad Request`

Bad request. One or more required fields are missing or invalid.

##### Example response

```
{
  "message": "validation error"
}
```

`409 Conflict`

Conflict. The username already exists.

##### Example response

```
{
  "message": "username already exists"
}
```

`500 Internal Server Error`

Internal server error. An unexpected error occurred on the server.

##### Example response

```
{
  "message": "an unexpected error occurred"
}
```

### Login

```plaintext
POST /auth/login
```

Authenticates a user with their credentials and returns an access token that can be used to authorize subsequent API requests.

#### Body

| Attribute  | Type   | Required | Description                                                                                   |
| ---------- | ------ | -------- | --------------------------------------------------------------------------------------------- |
| `username` | string | Yes      | The registered username of the user.                                                          |
| `password` | string | Yes      | The user’s password. Must be at least 6 characters long and contain only letters and numbers. |

##### Example

```
{
  "username": "john",
  "password": "123456",
}
```

#### Response

`200 OK`

Login successful. An access token is returned.

##### Example response

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
}
```

`400 Bad Request`

Bad request. Request body is invalid or incomplete.

##### Example response

```
{
  "message": "username and password are required"
}
```

`401 Unauthorized`

Unauthorized. Invalid credentials provided.

##### Example response

```
{
  "message": "invalid username or password"
}
```

`500 Internal Server Error`

Internal Server Error. An unexpected error occurred.

##### Example response

```
{
  "message": "an unexpected error occurred
}
```

## Blog

| Method | Endpoint    | Description                                             |
| ------ | ----------- | ------------------------------------------------------- |
| GET    | /blogs      | Retrieves a list of all blog posts                      |
| GET    | /blogs/{id} | Retrieves a blog post by its unique identifier          |
| POST   | /blogs      | Creates a new blog post                                 |
| PATCH  | /blogs/{id} | Partially updates an existing blog post                 |
| DELETE | /blogs/{id} | Deletes a blog post identified by its unique identifier |

### Create a blog post

```plaintext
POST /blogs
```

Creates a new blog post using the provided data. Authentication is required.

#### Authorization

Require Bearer token authentication. Include the token in the request header as follows:

```
Authorization: Bearer <access_token>
```

#### Body

| Attribute | Type    | Required | Description                        |
| --------- | ------- | -------- | ---------------------------------- |
| `content` | string  | Yes      | The main content of the blog post. |
| `status`  | boolean | No       | The status of the blog post.       |

##### Example

```
{
  "content": "This is my first blog post!",
  "status": false
}
```

#### Response

`201 Created`

Blog post created successfully.

##### Example response

```
{
  "data": {
    "id": 234,
    "content": "This is my first blog post!",
    "status": false
    "userId": 567
  }
}
```

`400 Bad Request`

Validation error or missing required fields.

##### Example response

```
{
  "message": "validation error"
}
```

`401 Unauthorized`

Invalid or missing Bearer token.

##### Example response

```
{
  "message": "access token is missing or invalid"
}
```

`500 Internal Server Error`

Internal server error. An unexpected error occurred on the server.

##### Example response

```
{
  "message": "an unexpected error occurred"
}
```

### Get all blog post

```plaintext
GET /blogs
```

Retrieves a list of all blog posts. Supports optional filtering, sorting, and pagination.

#### Authorization

Require Bearer token authentication. Include the token in the request header as follows:

```
Authorization: Bearer <access_token>
```

#### Response

`200 OK`

Successfully retrieved all blog posts

##### Example response

```
{
  "data": [
    {
      "id": 234,
      "content": "This is my first blog post!",
      "status": true,
      "userId": 567
    },
    {
      "id": 34,
      "content": "Another blog post",
      "status": true,
      "userId": 789
    }
  ]
}
```

`401 Unauthorized`

Invalid or missing Bearer token.

##### Example response

```
{
  "message": "access token is missing or invalid"
}
```

`500 Internal Server Error`

Internal server error. An unexpected error occurred on the server.

##### Example response

```
{
  "message": "an unexpected error occurred"
}
```
