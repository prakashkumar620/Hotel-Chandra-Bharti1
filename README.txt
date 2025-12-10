HOTEL CHANDRA BHARTI - FULL STACK PROJECT

Steps:

1) Backend
   cd backend
   npm install
   cp .env.example .env
   # edit .env and set:
   #  - MONGO_URI
   #  - JWT_SECRET
   #  - EMAIL_USER (Gmail)
   #  - EMAIL_PASS (Gmail App Password)
   node server.js

   # (optional) create default admin
   # open: http://localhost:5000/admin/create-default-admin

2) Frontend
   cd frontend
   npm install
   npm run dev

   # open shown localhost (e.g. http://localhost:5173)

3) Replace logo
   put your logo file at:
   frontend/src/assets/logo.png

4) Set WhatsApp number
   edit: frontend/src/pages/TableBooking.jsx
   change RESTAURANT_WHATSAPP to your phone, e.g. '919812345678'
