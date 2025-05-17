### Nested routes

✅ Example: Nested Router in Express

Suppose you want a route structure like this:
/api
  └── /users
        ├── GET /api/users/
        └── GET /api/users/:id
  └── /posts
        ├── GET /api/posts/
        └── GET /api/posts/:id

🔧 File Structure
project/
├── routes/
│   ├── api.routes.js       <-- parent router
│   └── users.routes.js     <-- nested router
│   └── posts.routes.js     <-- nested router
├── server.js


✅ Benefits of Nested Routers
    Keeps your route files clean and modular
    Encourages logical grouping (e.g., users, posts, products)
    Makes it easier to attach route-specific middleware (e.g., auth)