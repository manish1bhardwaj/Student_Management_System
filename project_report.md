# Student Result Management System - Project Report

## 1. Project Overview
This project is a **Student Result Management System** built with **React** and **Vite**. It allows users to manage student records (Name, Section, Marks, Grade) with full CRUD (Create, Read, Update, Delete) capabilities. The backend is simulated using `json-server`.

## 2. File Structure & Purpose

### 2.1 Configuration Files

#### `package.json`
**Purpose:** Manages project dependencies and scripts.
- **Dependencies:** `react`, `react-dom`, `json-server`.
- **Scripts:**
    - `dev`: Starts the Vite development server.
    - `server`: (Implied) Should be used to start `json-server`.

#### `db.json`
**Purpose:** Acts as the database for `json-server`.
- **Structure:** Contains a `students` array with student objects.
- **Fields:** `id`, `name`, `section`, `marks`, `grade`.

### 2.2 Source Code (`src/`)

#### `src/main.jsx`
**Purpose:** The entry point of the React application.
- **Function:** Mounts the `App` component into the DOM element with id `root`.
- **Key Imports:** `createRoot` from `react-dom/client`, `App`, `index.css`.

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

#### `src/App.jsx`
**Purpose:** The main container component that manages the global state and routing (view switching).
- **State:**
    - `students`: Array of student data.
    - `currentView`: Controls which screen is shown ('list', 'add', 'edit', 'details').
    - `selectedStudent`: Stores the student object being edited or viewed.
    - `loading`, `error`: UI states for async operations.
- **Functions:**
    - `handleLoadStudents`: Fetches data from the API.
    - `handleAddClick`, `handleEditClick`, `handleViewClick`: Switch views.
    - `handleDeleteClick`: Deletes a student and updates UI.
    - `handleFormSubmit`: Handles both Create and Update logic.

#### `src/services/studentService.js`
**Purpose:** Handles all HTTP requests to the backend API.
- **Functions:**
    - `getAllStudents()`: GET /students
    - `addStudent(student)`: POST /students
    - `updateStudent(id, student)`: PUT /students/:id
    - `deleteStudent(id)`: DELETE /students/:id

```javascript
const API_URL = "http://localhost:3000/students";

export const getAllStudents = async () => { /* ... */ };
export const addStudent = async (student) => { /* ... */ };
export const updateStudent = async (id, student) => { /* ... */ };
export const deleteStudent = async (id) => { /* ... */ };
```

### 2.3 Components (`src/components/`)

#### `src/components/StudentList.jsx`
**Purpose:** Displays the list of students in a table format.
- **Props:**
    - `students`: Array of student data to display.
    - `onLoad`: Function to trigger data fetching.
    - `onEdit`, `onDelete`, `onView`: Callback functions for actions.
- **Features:**
    - Renders a table with columns: Name, Section, Marks, Grade, Actions.
    - "View", "Edit", "Delete" buttons for each row.

#### `src/components/StudentForm.jsx`
**Purpose:** A reusable form for adding and editing students.
- **Props:**
    - `onSubmit`: Function called when form is submitted.
    - `initialData`: Student data to pre-fill (for edit mode).
    - `onCancel`: Function to go back to the list.
- **State:** Local state `student` to manage form inputs.
- **Logic:** Updates local state on change, calls `onSubmit` with form data on submit.

#### `src/components/StudentDetails.jsx`
**Purpose:** Displays detailed information about a single student.
- **Props:**
    - `student`: The student object to display.
    - `onBack`: Function to return to the list.

### 2.4 Styling

#### `src/index.css`
**Purpose:** The global stylesheet containing the "Premium" design system.
- **Variables:** Defines CSS variables for colors (`--primary-color`, `--surface-color`, etc.), shadows, and spacing.
- **Styles:**
    - Modern, clean typography (Inter font).
    - Card-based layout with soft shadows.
    - Styled buttons with hover effects.
    - Responsive table design.

#### `src/App.css`
**Purpose:** Cleaned up file (mostly empty now as styles were moved to `index.css`).

## 3. Key Features & Flow
1.  **Load Data:** User clicks "Load Students" -> `App.jsx` calls `studentService.getAllStudents` -> Data populates `StudentList`.
2.  **Add Student:** User clicks "Add New" -> `App.jsx` switches view to `StudentForm` -> User submits -> `studentService.addStudent` is called.
3.  **Edit Student:** User clicks "Edit" on a row -> `App.jsx` switches to `StudentForm` with `initialData` -> User submits -> `studentService.updateStudent` is called.
4.  **Delete Student:** User clicks "Delete" -> Confirmation prompt -> `studentService.deleteStudent` is called.

## 4. Conclusion
The project is a well-structured, modular React application. It separates concerns effectively:
- **Services** handle data fetching.
- **Components** handle UI rendering.
- **App.jsx** handles business logic and state management.
- **CSS** handles the visual presentation with a consistent design system.
