import React,{useState} from 'react';
import axios from "axios";
import Copyright from './Copyright'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import VisibilityOffSharpIcon from '@material-ui/icons/VisibilityOffSharp';


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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [cpassword,setcPassword] = useState("");
    const [nameError,setNameError] = useState("");
    const [emailError,setEmailError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [cpasswordError,setcPasswordError] = useState("");
    const [donotMatch,setDonotMatch] = useState("");
    const [error,setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showcPassword, setShowcPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function onRegister(e){
      setIsLoading(true);
        e.preventDefault();
        const isValid = validate();
    if(isValid){
        await axios({
         method: "POST",
         url: "http://192.168.1.119:5000/api/logger/register",
         headers: { "Content-Type": "application/json" },
         data: { name: name, email: email, password: password, cpassword: cpassword},
       }).then(response => { 
        console.log(response)
        alert(response.data.message)
        setIsLoading(false);
      }).catch (error=>{
       console.log(error.response.data.error)
       setIsLoading(false);
       setError(error.response.data.error)
      })
     } else{
      setIsLoading(false);
    }
    }

     const validate = () => {
      let nameError = "";
      let emailError = "";
      let passwordError = ""; 
      let cpasswordError = ""; 
      let donotMatch ="";
   
      if(!name){  
        nameError = "First Name cannot be blank"
      }
  
      if(!email.includes('@') && !email.includes('.')){  
        emailError = "Empty or Invalid Email"
      }
  
      if(!password){  
        passwordError = "Password cannot be blank"
      }
  
      if(!cpassword){  
        cpasswordError = "Password cannot be blank"
      }

      if(password !== cpassword){  
        // alert("Passwords don't match");
        donotMatch = "Password doesn't match"
      }

      if(nameError || emailError || passwordError || cpasswordError || donotMatch) {  
        setNameError(nameError)
        setEmailError(emailError)
        setPasswordError(passwordError)
        setcPasswordError(cpasswordError)
        setDonotMatch(donotMatch)
        return false;
      }
      return true;
    }

    const handleClick = () => {
      setShowPassword(!showPassword)
    }

    const onHandleClick = () => {
      setShowcPassword(!showcPassword)
    }

    const enabled = name.length > 0 && email.length > 0 && password.length > 0 && cpassword.length > 0;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                value={name} 
            onChange={(e)=> {setName(e.target.value)}}
              />
              {nameError ? <div style={{fontSize: 12, color: 'red'}}>{nameError}</div> : ''}
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email} 
            onChange={(e)=> {setEmail(e.target.value);}}
              />
              {emailError ? <div style={{fontSize: 12, color: 'red'}}>{emailError}</div> : ''}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password} 
            onChange={(e)=> {setPassword(e.target.value)}}
                InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton onClick={handleClick}>
                        {showPassword ? <VisibilitySharpIcon/> : <VisibilityOffSharpIcon/> }
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
              />
              {passwordError ? <div style={{fontSize: 12, color: 'red'}}>{passwordError}</div> : ''}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type={showcPassword ? 'text' : 'password'}
                id="cpassword"
                autoComplete="current-password"
                value={cpassword} 
            onChange={(e)=> {setcPassword(e.target.value)}}
                InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton onClick={onHandleClick}>
                        {showcPassword ? <VisibilitySharpIcon/> : <VisibilityOffSharpIcon/> }
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
              />
              {cpasswordError ? <div style={{fontSize: 12, color: 'red'}}>{cpasswordError}</div> : ''}
              {donotMatch ? <div style={{fontSize: 12, color: 'red'}}>{donotMatch}</div> : ''}
              {error ? <div style={{fontSize: 12, color: 'red'}}>{error}</div> : ''}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!enabled}
            className={classes.submit}
            onClick={(e) => {onRegister(e)}}
          >
          { isLoading ? 'Loading...' : 'Sign Up'} 
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}