import React from 'react'
import axios from "axios";
import cookie from 'react-cookies'
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  fixedHeight: {
    height: 240,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  addIcon:{
    margin: '20% auto',
  },
  settingIcon: {
    fontSize: '20px',
   marginLeft: '87%',
    marginTop: '18%',
    cursor: 'pointer',
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    borderRadius: '10px',
  },
  fixedHeight: {
    height: 240,
  },
  grid: {
    
  },
  gridDiv: {
   padding: theme.spacing(2)
  }
}))

const Card = () => {

  const [users,setUsers] = React.useState([])

  React.useEffect(() => {
    onMount()
  },[])
  
const onMount = async () => {
  const apiUrl = 'http://192.168.1.119:5000/api/logger/projects';
 await axios(apiUrl,{
    method: "GET",
    headers: {  
      Authorization: `Bearer ${cookie.load("token")}`,
    }
  }).then(response =>{
    console.log(response)
    console.log(response.data.data[0]._id)
    setUsers(response.data.data)
  }).catch(error => {
    console.log(error)
  })
  
}

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
console.log("users",users)
// return(
//   <div>
//   { 
//     users.map((user) => {
//       <div><p>user.mame</p></div>
//       console.log("user",user.name)
//     })
// }
// </div>
// )

{
if(users && users.length > 0){
  return (
    <>
    
    {
    users.map((user) => {
     return (
      <Grid className= { classes.grid} item xs={12} md={4} lg={4}> 
      <Paper className={fixedHeightPaper}>
      
      <Box component="div" className= { classes.gridDiv} display="inline">
      <Box component="h1" display="block"> {user.name}</Box>
     
     <Box component="p" display="block"> {user.description}</Box>
     <SettingsIcon className={classes.settingIcon}/>
     {/*<Box component="h4"  display="block">{user.device ? user.device_types.length : 'No Device'}</Box>*/}
     </Box>
     </Paper>
     </Grid>    
      )
     
    })     
  }
  
    </>     
  )
}
else{
  return( <h2>Loading...</h2>)
}
}
}

export default Card
