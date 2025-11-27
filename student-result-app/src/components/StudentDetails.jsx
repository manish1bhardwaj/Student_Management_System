import React from 'react';

const StudentDetails = ({ student, onBack }) => {
    if (!student) return null;

    return (
        <div className="details-container">
            <div className="details-card">
                <h2>Student Details</h2>
                <div className="detail-row">
                    <strong>Name:</strong> <span>{student.name}</span>
                </div>
                <div className="detail-row">
                    <strong>Section:</strong> <span>{student.section}</span>
                </div>
                <div className="detail-row">
                    <strong>Marks:</strong> <span>{student.marks}</span>
                </div>
                <div className="detail-row">
                    <strong>Grade:</strong> <span>{student.grade}</span>
                </div>
                <div className="details-actions">
                    <button className="btn-secondary" onClick={onBack}>Back to List</button>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;
