import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import { getAllStudents, addStudent, updateStudent, deleteStudent } from './services/studentService';

function App() {
  const [students, setStudents] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit', 'details'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoadStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setSelectedStudent(null);
    setCurrentView('add');
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setCurrentView('edit');
  };

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setCurrentView('details');
  };

  const handleDeleteClick = async (id) => {
    const stringId = String(id);
    console.log('Attempting to delete student with ID:', stringId);
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(stringId);
        console.log('Delete successful for ID:', stringId);
        alert('Student deleted successfully! Please reload the list.');
        // Requirement: "After adding/editing/deleting → show an alert and let them click the 'Load Students' button again"
        // So we don't auto-reload here, just show alert.
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Failed to delete student: ' + err.message);
      }
    }
  };

  const handleFormSubmit = async (studentData) => {
    try {
      if (currentView === 'add') {
        await addStudent(studentData);
        alert('Student added successfully! Please reload the list.');
      } else if (currentView === 'edit') {
        await updateStudent(selectedStudent.id, studentData);
        alert('Student updated successfully! Please reload the list.');
      }
      setCurrentView('list');
    } catch (err) {
      alert('Operation failed: ' + err.message);
    }
  };

  const handleCancel = () => {
    setCurrentView('list');
    setSelectedStudent(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Result Management</h1>
      </header>

      <main className="app-content">
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-spinner">Loading...</div>}

        {currentView === 'list' && (
          <>
            <div className="actions-bar">
              <button className="btn-primary" onClick={handleAddClick}>+ Add New Student</button>
            </div>
            <StudentList
              students={students}
              onLoad={handleLoadStudents}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onView={handleViewClick}
            />
          </>
        )}

        {(currentView === 'add' || currentView === 'edit') && (
          <StudentForm
            onSubmit={handleFormSubmit}
            initialData={selectedStudent}
            onCancel={handleCancel}
          />
        )}

        {currentView === 'details' && (
          <StudentDetails
            student={selectedStudent}
            onBack={handleCancel}
          />
        )}
      </main>
    </div>
  );
}

export default App;
