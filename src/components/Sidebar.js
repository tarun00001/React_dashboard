import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './listItems';
// import './Sidebar.css'
import { pink } from '@material-ui/core/colors';
// import Avatar from 'react-avatar';

const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
      avatar: {
        // margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
     backgroundColor: 'pink',
        color: 'white',
        fontSize: '600%',
        // margin: '20%',
        marginTop: '15%',
        marginVertical: '15%',
        padding: '20%',
        height: '50%',
        width: '50%',
      },
      avatarDiv: {
        // backgroundColor: 'pink',
        // color: 'white',
        // fontSize: '600%',
        // margin: '20%',
        // padding: '20%',
        // height: '50%',
        // width: '50%',
        // marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      
}))

const Sidebar = (props) => {
    const classes = useStyles()
    return (
       <>
       <div className={classes.toolbarIcon}>
       <IconButton onClick={props.handleDrawerClose}>
         <ChevronLeftIcon />
       </IconButton>
     </div>
     <Divider />
     <div className={classes.avatarDiv}>
     <Avatar className={classes.avatar}>{"T"}</Avatar>
     </div>
     <Divider />
     <List>{mainListItems}</List>
     <Divider />
       </>
    )
}

export default Sidebar;

//  <Avatar name={localStorage.getItem('name')[0].toUpperCase()} round={true} size="238" />