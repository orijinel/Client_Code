/*==================================================
NewCampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new campus input form.
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

const NewCampusView = (props) => {
  const {handleChange, handleSubmit, formErrors, formValues, isFormValid } = props;
  const classes = useStyles();

  // Render a New Campus view with an input form
  return (
    <div>
      <h1>New Campus</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Add a Campus
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <label style={{color:'#11153e', fontWeight: 'bold'}}>Name: </label>
            <input 
              type="text" 
              name="name"
              value={formValues.name}
              onChange={(e) => handleChange(e)} 
            />
            {formErrors.name && (
              <div className={classes.errorMessage}>{formErrors.name}</div>
            )}
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Address: </label>
            <input 
              type="text" 
              name="address"
              value={formValues.address}
              onChange={(e) => handleChange(e)} 
            />
            {formErrors.address && (
              <div className={classes.errorMessage}>{formErrors.address}</div>
            )}
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Description: </label>
            <textarea 
              name="description"
              value={formValues.description}
              onChange={(e) => handleChange(e)} 
              style={{width: '200px', height: '100px'}}
            />
            {formErrors.description && (
              <div className={classes.errorMessage}>{formErrors.description}</div>
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

export default NewCampusView;