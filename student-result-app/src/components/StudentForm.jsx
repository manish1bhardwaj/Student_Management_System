import React, { useState, useEffect } from 'react';

const StudentForm = ({ onSubmit, initialData, onCancel }) => {
    const [student, setStudent] = useState({
        name: '',
        section: '',
        marks: '',
        grade: ''
    });

    useEffect(() => {
        if (initialData) {
            setStudent(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure marks is a number
        onSubmit({
            ...student,
            marks: Number(student.marks)
        });
    };

    return (
        <div className="form-container">
            <h2>{initialData ? 'Edit Student' : 'Add New Student'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter student name"
                    />
                </div>
                <div className="form-group">
                    <label>Section</label>
                    <input
                        type="text"
                        name="section"
                        value={student.section}
                        onChange={handleChange}
                        required
                        placeholder="Enter section"
                    />
                </div>
                <div className="form-group">
                    <label>Marks</label>
                    <input
                        type="number"
                        name="marks"
                        value={student.marks}
                        onChange={handleChange}
                        required
                        placeholder="Enter marks"
                    />
                </div>
                <div className="form-group">
                    <label>Grade</label>
                    <input
                        type="text"
                        name="grade"
                        value={student.grade}
                        onChange={handleChange}
                        required
                        placeholder="Enter grade"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        {initialData ? 'Update Student' : 'Add Student'}
                    </button>
                    <button type="button" className="btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
