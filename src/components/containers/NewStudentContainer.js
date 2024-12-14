/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      gpa: "",
      campusId: "", 
      redirect: false, 
      redirectId: null,
      formErrors: {}
    };
  }

  // Validate form fields
  validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "firstname":
      case "lastname":
        if (!value.trim()) {
          error = `${name === "firstname" ? "First" : "Last"} name is required`;
        } else if (value.length < 2) {
          error = `${name === "firstname" ? "First" : "Last"} name must be at least 2 characters`;
        }
        break;
      
      case "email":
        if (value) { // Only validate if there's a value
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            error = "Invalid email format";
          }
        }
        break;
      
      case "imageUrl":
        if (value) { // Only validate if there's a value
          try {
            new URL(value);
          } catch {
            error = "Invalid URL format";
          }
        }
        break;
      
      case "gpa":
        if (value) { // Only validate if there's a value
          const gpaNum = parseFloat(value);
          if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
            error = "GPA must be between 0.0 and 4.0";
          }
        }
        break;
      
      default:
        break;
    }
    
    return error;
  }

  // Check if form is valid
  isFormValid = () => {
    // Adds a requirement for fields
    if (!this.state.firstname.trim() || !this.state.lastname.trim()) {
      return false;
    }
    
    // error checjker
    return Object.values(this.state.formErrors).every(error => !error);
  }

  // Input data
  handleChange = event => {
    const { name, value } = event.target;
    
    // Update form value
    this.setState({
      [name]: value
    }, () => {
      // Validate field and update errors
      const error = this.validateField(name, value);
      
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          [name]: error
        }
      }));
    });
  }

  // Take action submit button is clicked
  handleSubmit = async event => {
    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email || null,
        imageUrl: this.state.imageUrl || null,
        gpa: this.state.gpa || null,
        campusId: this.state.campusId || null
    };
    
    // Add new student in back-end database
    let newStudent = await this.props.addStudent(student);

    // Update state
    this.setState({
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      gpa: "",
      campusId: "", 
      redirect: true, 
      redirectId: newStudent.id,
      formErrors: {}
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView 
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit}
          formErrors={this.state.formErrors}
          formValues={this.state}
          isFormValid={this.isFormValid()}
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewStudentContainer);