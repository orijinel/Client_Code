/*==================================================
CampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, deleteCampusThunk, editCampusThunk, editStudentThunk } from "../../store/thunks";
import { Redirect } from 'react-router-dom';

import { CampusView } from "../views";

class CampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      redirectId: null,
      isEditing: false,
      campusInfo: {}
    };
  }

  // Get the specific campus data from back-end database
  componentDidMount() {
    //getting campus ID from url
    this.props.fetchCampus(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    // If campus data has been fetched, update the campusInfo state
    if (prevProps.campus !== this.props.campus && !this.state.isEditing) {
      this.setState({
        campusInfo: this.props.campus
      });
    }
  }

  // Deletion Handler
  handleDelete = (campusId) => {
    this.props.deleteCampus(campusId);
    this.setState({
      redirect: true,
      redirectId: null
    });
  }

  // Enrollment handler
  handleEnroll = () => {
    this.props.history.push('/students');
  }

  // Unenrollment handler
  handleUnenroll = async (studentId) => {
    try {
      await this.props.editStudent({ id: studentId, campusId: null });
      this.props.fetchCampus(this.props.match.params.id);
    } catch(err) {
      console.error(err);
    }
  }

  // Edit handler
  handleEdit = (editMode) => {
    this.setState({
      isEditing: editMode,
      campusInfo: this.props.campus // Reset form data when entering edit mode
    });
  }

  // Input handler
  handleChange = (event) => {
    this.setState({
      campusInfo: {
        ...this.state.campusInfo,
        [event.target.name]: event.target.value
      }
    });
  }

  // Form submission handler
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await this.props.editCampus(this.state.campusInfo);
      this.setState({
        isEditing: false
      });
      this.props.fetchCampus(this.props.match.params.id);
    } catch(err) {
      console.error(err);
    }
  }

  // Render a Campus view by passing campus data as props to the corresponding View component
  render() {
    if(this.state.redirect) {
      return (<Redirect to={`/campuses`}/>)
    }

    return (
      <div>
        <Header />
        <CampusView 
          campus={this.state.campusInfo}
          handleDelete={this.handleDelete}
          handleEnroll={this.handleEnroll}
          handleUnenroll={this.handleUnenroll}
          isEditing={this.state.isEditing}
          handleEdit={this.handleEdit}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "CampusContainer" component to connect to Redux Store.
const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    deleteCampus: (campusId) => dispatch(deleteCampusThunk(campusId)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
    editStudent: (student) => dispatch(editStudentThunk(student))
  };
};

// Export store-connected container by default
// CampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(CampusContainer);