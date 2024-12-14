/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

// Take in props data to construct the component
const CampusView = (props) => {
  const {
    campus, 
    handleDelete, 
    handleEnroll, 
    handleUnenroll, 
    isEditing,
    handleEdit,
    handleChange,
    handleSubmit,
  } = props;
  
  // Render a single Campus view with list of its students
  return (
    <div>
      {isEditing ? (
        // Edit mode
        <div>
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom: '10px'}}>
              <label>Name: </label>
              <input 
                type="text" 
                name="name"
                value={campus.name || ''} 
                onChange={handleChange}
              />
            </div>

            <div style={{marginBottom: '10px'}}>
              <label>Address: </label>
              <input 
                type="text" 
                name="address"
                value={campus.address || ''} 
                onChange={handleChange}
              />
            </div>

            <div style={{marginBottom: '10px'}}>
              <label>Description: </label>
              <textarea 
                name="description"
                value={campus.description || ''} 
                onChange={handleChange}
              />
            </div>

            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              style={{marginRight: '10px'}}
            >
              Save Changes
            </Button>

            <Button 
              variant="contained"
              onClick={() => handleEdit(false)}
            >
              Cancel
            </Button>
          </form>
        </div>
      ) : (
        // View mode
        <div>
          <h1>{campus.name}</h1>
          <p>{campus.address}</p>
          <p>{campus.description}</p>

          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleEdit(true)}
            style={{marginRight: '10px'}}
          >
            Edit Campus Info
          </Button>

          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => handleDelete(campus.id)}
            style={{marginRight: '10px'}}
          >
            Delete Campus
          </Button>
        </div>
      )}

      <div style={{marginTop: '20px'}}>
        <h2>Students</h2>
        {campus.students && campus.students.length > 0 ? (
          campus.students.map(student => {
            let name = student.firstname + " " + student.lastname;
            return (
              <div key={student.id} style={{marginBottom: '10px'}}>
                <Link to={`/student/${student.id}`}>
                  <h2>{name}</h2>
                </Link>
                <Button 
                  variant="contained" 
                  size="small"
                  onClick={() => handleUnenroll(student.id)}
                  style={{marginLeft: '10px'}}
                >
                  Remove from Campus
                </Button>
              </div>
            );
          })
        ) : (
          <div>
            <p>No students are currently enrolled at this campus.</p>
            <p>Use the button below to enroll students.</p>
          </div>
        )}

        <Button 
          variant="contained" 
          color="primary"
          onClick={handleEnroll}
          style={{marginTop: '20px'}}
        >
          Enroll Student
        </Button>
      </div>
    </div>
  );
};

export default CampusView;