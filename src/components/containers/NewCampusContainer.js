import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      name: "", 
      address: "", 
      description: "",
      imageUrl: "",
      redirect: false, 
      redirectId: null,
      formErrors: {}
    };
  }

  // Validate single field
  validateField = (name, value) => {
    switch (name) {
      case "name":
      case "address":
      case "description":
        return !value.trim() ? `${name} is required` : "";
      case "imageUrl":
        if (value) {
          try {
            new URL(value);
            return "";
          } catch {
            return "Invalid URL format";
          }
        }
        return "";
      default:
        return "";
    }
  }

  // Check if form is valid
  isFormValid = () => {
    const { name, address, description } = this.state;
    const hasRequiredFields = name.trim() && address.trim() && description.trim();
    const hasNoErrors = Object.values(this.state.formErrors).every(error => !error);
    return hasRequiredFields && hasNoErrors;
  }

  // Handle form input changes
  handleChange = event => {
    const { name, value } = event.target;
    
    this.setState({
      [name]: value,
      formErrors: {
        ...this.state.formErrors,
        [name]: this.validateField(name, value)
      }
    });
  }

  // Handle form submission
  handleSubmit = async event => {
    event.preventDefault();

    let campus = {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        imageUrl: this.state.imageUrl || null
    };
    
    let newCampus = await this.props.addCampus(campus);

    this.setState({
      redirect: true, 
      redirectId: newCampus.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new campus input form
  render() {
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    return (
      <div>
        <Header />
        <NewCampusView 
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

// Map dispatch to props
const mapDispatch = (dispatch) => {
    return({
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
    })
}

// Export store-connected container by default
export default connect(null, mapDispatch)(NewCampusContainer);