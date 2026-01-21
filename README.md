# Contract Management Platform

A frontend-based Contract Management Platform built using Next.js and TypeScript, designed to demonstrate product thinking, UI design, state management, and clean frontend architecture.

This project was developed as part of a frontend hiring assignment with a focus on usability, logical contract flow, and maintainable code structure.

---

## 🚀 Features

### Blueprint Management
- Create reusable contract templates (Blueprints)
- Supported field types:
  - Text
  - Date
  - Signature
  - Checkbox
- Store field metadata (label, type, position)
- Blueprint status management (CREATED, ACTIVE, ARCHIVED)
- Filterable blueprint listing
- Status update via dropdown

### Contract Creation
- Generate contracts from selected blueprints
- Auto-inherit blueprint fields
- Dynamic form generation
- Prevent contract creation from archived blueprints

### Contract Lifecycle
Each contract follows a controlled lifecycle:


CREATED → APPROVED → SENT → SIGNED → LOCKED
REVOKED (can occur after CREATED or SENT)


Rules:
- No skipping lifecycle steps
- Locked contracts cannot be edited
- Revoked contracts cannot proceed further
- UI dynamically adapts based on contract status

### Dashboard
- Table-based contract listing
- Filters: Active, Pending, Signed
- Status change via dropdown
- View contract details
- Fully responsive UI

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
Next.js (App Router) | Framework & Routing |
TypeScript | Type Safety |
Tailwind CSS | Styling |
LocalStorage | Mock Persistence |
Component Architecture | Scalable UI Design |

---

## 📁 Project Structure

src/
│
├── app/
│ ├── layout.tsx
│ ├── page.tsx # Dashboard
│ ├── blueprints/
│ │ ├── page.tsx # Blueprint list
│ │ └── create/page.tsx # Create blueprint
│ ├── contracts/
│ │ ├── page.tsx # Contract list
│ │ ├── create/page.tsx # Create contract
│ │ └── [id]/page.tsx # View/Edit contract
│
├── components/
│ ├── blueprints/
│ ├── contracts/
│ ├── layout/
│ └── ui/
│
├── store/
│ ├── blueprintStore.ts
│ └── contractStore.ts
│
├── lib/
│ ├── storage.ts
│ └── lifecycle.ts
│
├── types/
│ └── index.ts
│
└── utils/
├── formatDate.ts
└── generateId.ts


---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/contract-management-platform.git
cd contract-management-platform

### 2. Install Dependencies
npm install

### 3. Run the Application 
npm run dev

### 4. Open in browser:
http://localhost:3000

🧠 Design Decisions
State Management
   - LocalStorage used to simulate   backend persistence
   - Separate stores for Blueprints and Contracts
   - Easy migration path to real APIs

UI & UX
    - Tailwind CSS for custom responsive UI
    - No UI frameworks used
    - Focus on clarity, usability, and logical flow

Lifecycle Enforcement
    - Centralized lifecycle rules

    - Prevents invalid state transitions

    - UI actions depend on current status

Scalability
    - Modular folder structure

    - Easily extensible to backend, auth, roles

📌 Assumptions

    - No backend required as per assignment
    - Single user environment

    - LocalStorage as mock database

    - No authentication implemented

⚠️ Limitations
    -No drag-and-drop field positioning
    - No PDF export
    - No real backend or authentication
    - No role-based access control

✨ Future Enhancements
    - Drag & drop field layout
    - Blueprint versioning
    - Contract audit trail
    - API integration
    - Role-based access
    - Unit testing

👤 Author
Prathamesh Pawar
Frontend Developer
Project developed for hiring assignment submission.