/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent } = props;

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      
      {/* Display either campus information with link or "Not Enrolled" message */}
      {student.campus ? (
        <Link to={`/campus/${student.campus.id}`}>
          <h3>{student.campus.name}</h3>
        </Link>
      ) : (
        <h3>Not Currently Enrolled at Any Campus</h3>
      )}

      {/* Edit and Delete buttons */}
      <div className="student-actions">
        <Link to={`/student/${student.id}/edit`}>
          <button>Edit Student Information</button>
        </Link>
        <button onClick={() => {
          deleteStudent(student.id);
          // Redirect to all students
          props.history.push('/students');
        }}>
          Delete Student
        </button>
      </div>
    </div>
  );
};

export default StudentView;
