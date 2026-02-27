# MERN Practical – Frontend (React + Vite + Tailwind CSS)

This is the frontend for the MERN practical assignment.  
It includes login/register, product listing, search + category filter, cart page, quantity update, and a mock checkout page.

==================================================
SETUP & RUN INSTRUCTIONS
==================================================

1. Clone repository:
git clone <your-frontend-repo-url>
cd frontend

2. Install dependencies:
npm install

3. Create .env file in frontend root:
VITE_API_URL=http://localhost:5000/api

5. Start development server:
npm run dev

Frontend runs at:
http://localhost:5173


==================================================
ENV (FRONTEND)
==================================================
VITE_API_URL=http://localhost:5000/

==================================================
FOLDER STRUCTURE (FRONTEND)
==================================================

frontend/
│── src/
│   ├── api/
│   │   └── axios.ts
│   ├── components/
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Product.tsx
│   │   ├── CreateProduct.tsx
│   │   ├── Cart.tsx
│   │   └── Checkout.tsx
│   ├── App.tsx
│   └── main.tsx
│── public/
│── index.html
│── package.json
│── README.md

==================================================
FRONTEND FEATURES OVERVIEW
==================================================

----------------------------------------
AUTH (Login + Register)
----------------------------------------
✔ Login via backend  
✔ Register new users  
✔ Formik + Yup validation  
✔ JWT stored in HTTP-only cookie  
✔ AuthContext manages global state  

----------------------------------------
PRODUCT LISTING
----------------------------------------
✔ Grid view  
✔ Each product shows:
  - image  
  - name  
  - price  
✔ Add to Cart  
✔ If already added → show (-)(quantity)(+)  
✔ Live quantity updates  
✔ Always in sync with backend cart  

----------------------------------------
SEARCH + CATEGORY FILTER
----------------------------------------
✔ Search by product name  
✔ Filter by category  
✔ Category dropdown auto-loaded  
✔ Filters work instantly  

----------------------------------------
CREATE PRODUCT PAGE
----------------------------------------
✔ Formik + Yup  
✔ Image preview  
✔ Upload image via Multer  
✔ Category dropdown  

----------------------------------------
CART PAGE
----------------------------------------
✔ Show all items in cart  
✔ Increase / decrease quantity  
✔ Remove item  
✔ Total amount  
✔ ONE checkout button at bottom  
✔ Fully synced with backend  


==================================================

Frontend is ready for evaluation and works instantly after clone → install → env → run.
