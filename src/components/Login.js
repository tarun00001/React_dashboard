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
import cookie from 'react-cookies'
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  
  const classes = useStyles();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [emailError,setEmailError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [backendError,setBackendError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const history = useHistory()

    async function onLogin(e){
    
      setIsLoading(true);
       e.preventDefault();
       const isValid = validate();
       if(isValid){
      console.log(email,password)
      await axios({
        method: "POST",
        url: "http://192.168.1.119:5000/api/logger/login",
        headers: { "Content-Type": "application/json" },
        data: { email: email || localStorage.getItem('email') , password: password || localStorage.getItem('password')},
      })
       .then(response => {  
         setIsLoading(false);
         console.log(response)
         console.log(response.data.token)
         cookie.save('token' , response.data.token)
         localStorage.setItem('name', response.data.name)
         history.push('/')
       })
       .catch (error => {  
         console.log(error.response)
         setIsLoading(false);
       
         setBackendError(error.response.data.error.message)
       
       })
      //   await axios({
      //   method: "POST",
      //   url: "http://192.168.1.119:5000/api/logger/login",
      //   headers: { "Content-Type": "application/json" },
      //   data: { email: email, password: password},
      // })
      // console.log(response)
      // console.log(response.data.token)
      // cookie.save('token' , response.data.token)
      // localStorage.setItem('name', response.data.name)
      // history.push('/')
      }
      else{
        setIsLoading(false);
      }
      if(rememberMe){
        localStorage.setItem('email', email, );
        localStorage.setItem( 'password',password);
        localStorage.setItem('rememberMe',rememberMe);
        }
    }

    const validate = () => {
    
      let emailError = "";
      let passwordError = "";
  
      if(!localStorage.getItem('email')&& !email.includes('@')){  
        emailError = "Empty or Invalid Email"
      }
  
      if(!localStorage.getItem('password') && !password){  
        passwordError = "Password cannot be blank"
      }

      if(emailError || passwordError) {  
        setEmailError(emailError)
        setPasswordError(passwordError)
        return false;
      }
      return true;
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={localStorage.getItem('email')|| email} 
            onChange={(e)=> {setEmail( e.target.value); }}
          />
          {emailError ? <div style={{fontSize: 12, color: 'red'}}>{emailError}</div> : ''}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={localStorage.getItem('password')|| password} 
            onChange={(e)=> {setPassword( e.target.value)}}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={() => {setShowPassword(!showPassword)}}>
                    {showPassword ? <VisibilitySharpIcon/> : <VisibilityOffSharpIcon/> }
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {passwordError ? <div style={{fontSize: 12, color: 'red'}}>{passwordError}</div> : ''}
          {backendError ? <div style={{fontSize: 12, color: 'red'}}>{backendError}</div> : ''}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" checked={ rememberMe}/>}
            label="Remember me"
            onChange={() => {  setRememberMe(!rememberMe)}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {onLogin(e)}}
          >
           { isLoading ? 'Loading...' : 'Sign In'} 
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

