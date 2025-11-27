import React from 'react';

const StudentList = ({ students, onLoad, onEdit, onDelete, onView }) => {
    return (
        <div className="student-list-container">
            <div className="list-header">
                <h2>Student List</h2>
                <button className="btn-primary" onClick={onLoad}>Load Students</button>
            </div>
            <div className="table-wrapper">
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Section</th>
                            <th>Marks</th>
                            <th>Grade</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="no-data">No students loaded. Click "Load Students" to fetch data.</td>
                            </tr>
                        ) : (
                            students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.section}</td>
                                    <td>{student.marks}</td>
                                    <td>{student.grade}</td>
                                    <td className="actions-cell">
                                        <button className="btn-sm btn-view" onClick={() => onView(student)} title="View Details">
                                            View
                                        </button>
                                        <button className="btn-sm btn-edit" onClick={() => onEdit(student)} title="Edit">
                                            Edit
                                        </button>
                                        <button className="btn-sm btn-delete" onClick={() => onDelete(student.id)} title="Delete">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
