import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './Modalpage.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '30%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    position: 'absolute',
    // width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #333',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    justifyItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ModalPage(props) {
  const classes = useStyles();
  const [projectName,setProjectName] = useState("");
  const [projectDesc,setProjectDesc] = useState("");
  const [value,setValue] = useState("");
  const [items,setItems] = useState([]);
  const [projectNameError,setProjectNameError] = useState("")
  const [modelTypeError,setModelTypeError] = useState("")

  const validate = () => {
    let projectNameError="";
    let modelTypeError="";

    if(!projectName){
      projectNameError = "Project name cannot be blank"
    }
    if(items.length === 0){
      modelTypeError = "Model type cannot be blank"
    }

    if(projectNameError || modelTypeError){
      setProjectNameError(projectNameError)
      setModelTypeError(modelTypeError)
      return false;
    }
    return true;
  }

  const onKeyDownHandler = (e) => {
    console.log(e.key);
    if(["Enter", "Tab", ","].includes(e.key)){
      e.preventDefault();

      var inputVal = value.trim();
console.log(inputVal)
      if(inputVal){
        setItems([ ...items, inputVal])
        setValue("")
       
      }
    }
  }

 const handleDelete = item => {
    setItems(
       items.filter(i => i !== item)
    );
  };

  const onCreateProject = (e) => {
    e.preventDefault();
    console.log(e)
    const isValid = validate();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <form style={props.modalStyle} className={classes.form} noValidate>
      
        <Typography  component="h1" color="inherit"  variant="h5" noWrap>
          Create New Project
        </Typography>
        
          <Grid container spacing={2}>
            <Grid  item xs={12} >
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Project Name"
                autoFocus
                value={projectName} 
            onChange={(e)=> {setProjectName(e.target.value)}}
              />
              {projectNameError ? <div style={{fontSize: 12, color: 'red'}}>{projectNameError}</div> : ''}
            </Grid>

           {console.log(items)}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="desc"
                label="Project Description"
                name="desc"
                autoComplete="desc"
                value={projectDesc} 
            onChange={(e)=> {setProjectDesc(e.target.value)}}
              />
              
            </Grid>

            {items.map(item => (
              <div className="tag-item" key={item}>
                {item}
                <button
                  type="button"
                  className="button"
                  onClick={() => handleDelete(item)}
                >
                  &times;
                </button>
              </div>
            ))}
            <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="type"
              label="Model Type"
              name="type"
              autoComplete="type"
              value={value} 
              onKeyDown={(e)=> {onKeyDownHandler(e)}}
            onChange={(e)=> {setValue(e.target.value)}}
            />
            {modelTypeError ? <div style={{fontSize: 12, color: 'red'}}>{modelTypeError}</div> : ''}
          </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {onCreateProject(e)}}
          >
            Create
          </Button>
         
        </form>
      </div>
     
    </Container>
  );
}