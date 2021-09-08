import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './listItems';
import { pink } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
      avatar: {
        backgroundColor: 'pink',
        color: 'white',
        fontSize: '100px',
        margin: '20% auto',
        height: '15%',
        width: '60%'
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
     <Avatar className={classes.avatar}>{localStorage.getItem('name')[0].toUpperCase()}</Avatar>
     <Divider />
     <List>{mainListItems}</List>
     <Divider />
       </>
    )
}

export default Sidebar
