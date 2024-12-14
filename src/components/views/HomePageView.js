/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(4),
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing(4),
    maxWidth: '800px',
    margin: '20px auto',
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: theme.spacing(3),
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(3),
    fontWeight: 'bold'
  },
  welcomeText: {
    marginBottom: theme.spacing(2),
    lineHeight: 1.6
  }
}));

const HomePageView = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h3" component="h1" className={classes.title}>
            Welcome to Our Campus Management System
          </Typography>

          <Typography variant="h6" className={classes.welcomeText}>
            Your Gateway to Campus and Student Information Management
          </Typography>

          <Typography variant="body1" className={classes.welcomeText}>
            Our platform provides easy access to comprehensive information about our educational 
            community. Here you can:
          </Typography>

          <Typography variant="body1" paragraph>
            • Browse through our network of campuses and learn about their unique features
            <br />
            • Access detailed student information and records
            <br />
            • Navigate seamlessly between different campuses and student profiles
          </Typography>

          <Typography variant="body1" className={classes.welcomeText}>
            Use the navigation buttons above to explore our campuses and student directory.
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}

export default HomePageView;