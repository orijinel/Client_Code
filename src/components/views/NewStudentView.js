/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles( () => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar:{
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
  errorMessage: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '5px'
  }
}));

const NewStudentView = (props) => {
  const {handleChange, handleSubmit, formErrors, formValues, isFormValid } = props;
  const classes = useStyles();

  // Render a New Student view with an input form
  return (
    <div>
      <h1>New Student</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Add a Student
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
            <input 
              type="text" 
              name="firstname" 
              value={formValues.firstname}
              onChange={(e) => handleChange(e)} 
            />
            {formErrors.firstname && (
              <div className={classes.errorMessage}>{formErrors.firstname}</div>
            )}
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
            <input 
              type="text" 
              name="lastname"
              value={formValues.lastname} 
              onChange={(e) => handleChange(e)} 
            />
            {formErrors.lastname && (
              <div className={classes.errorMessage}>{formErrors.lastname}</div>
            )}
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
            <input 
              type="email" 
              name="email"
              value={formValues.email}
              onChange={(e) => handleChange(e)} 
            />
            {formErrors.email && (
              <div className={classes.errorMessage}>{formErrors.email}</div>
            )}
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Image URL: </label>
            <input 
              type="url" 
              name="imageUrl"
              value={formValues.imageUrl}
              onChange={(e) => handleChange(e)} 
            />
            {formErrors.imageUrl && (
              <div className={classes.errorMessage}>{formErrors.imageUrl}</div>
            )}
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>GPA: </label>
            <input 
              type="number" 
              step="0.1" 
              min="0.0" 
              max="4.0"
              name="gpa"
              value={formValues.gpa}
              onChange={(e) => handleChange(e)} 
            />
            {formErrors.gpa && (
              <div className={classes.errorMessage}>{formErrors.gpa}</div>
            )}
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus Id: </label>
            <input 
              type="text" 
              name="campusId"
              value={formValues.campusId}
              onChange={(e) => handleChange(e)} 
            />
            {formErrors.campusId && (
              <div className={classes.errorMessage}>{formErrors.campusId}</div>
            )}
            <br/>
            <br/>

            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              disabled={!isFormValid}
            >
              Submit
            </Button>
            <br/>
            <br/>
          </form>
          </div>
      </div>
    </div>    
  )
}

export default NewStudentView;