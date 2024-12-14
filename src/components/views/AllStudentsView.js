/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Link } from "react-router-dom";
import { useState } from "react";

const AllStudentsView = (props) => {
  const { students, deleteStudent, editStudent } = props;
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gpa: "",
    campusId: ""
  });

  // Start editing a student
  const startEdit = (student) => {
    setEditingId(student.id);
    setEditForm({
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email || "",
      gpa: student.gpa || "",
      campusId: student.campusId || ""
    });
  };

  // Field change handler
  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  // Form submission handler
  const handleSubmit = (studentId) => {
    editStudent({
      id: studentId,
      ...editForm
    });
    setEditingId(null);
  };

  // If there is no student, display a message
  if (!students.length) {
    return (
      <div>
        <p>There are no students.</p>
        <Link to={`newstudent`}>
          <button>Add New Student</button>
        </Link>
      </div>
    );
  }
  
  // If there is at least one student, render All Students view 
  return (
    <div>
      <h1>All Students</h1>

      {students.map((student) => {
        const isEditing = editingId === student.id;
        
        if (isEditing) {
          // Render edit form
          return (
            <div key={student.id} className="student-item">
              <div className="edit-form">
                <div>
                  <label>First Name: </label>
                  <input
                    type="text"
                    name="firstname"
                    value={editForm.firstname}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label>Last Name: </label>
                  <input
                    type="text"
                    name="lastname"
                    value={editForm.lastname}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>Email: </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>GPA: </label>
                  <input
                    type="number"
                    step="0.1"
                    name="gpa"
                    value={editForm.gpa}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>Campus ID: </label>
                  <input
                    type="number"
                    name="campusId"
                    value={editForm.campusId}
                    onChange={handleChange}
                  />
                </div>

                <button onClick={() => handleSubmit(student.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
              <hr/>
            </div>
          );
        }

        // Render normal view
        return (
          <div key={student.id} className="student-item">
            <Link to={`/student/${student.id}`}>
              <h2>{student.firstname + " " + student.lastname}</h2>
            </Link>
            {student.campus ? (
              <Link to={`/campus/${student.campus.id}`}>
                <p>Enrolled at: {student.campus.name}</p>
              </Link>
            ) : (
              <p>Not Currently Enrolled</p>
            )}
            <div className="student-actions">
              <button onClick={() => startEdit(student)}>Edit</button>
              <button onClick={() => deleteStudent(student.id)}>Delete</button>
            </div>
            <hr/>
          </div>
        );
      })}
      <br/>
      <Link to={`/newstudent`}>
        <button>Add New Student</button>
      </Link>
      <br/><br/>
    </div>
  );
};

export default AllStudentsView;