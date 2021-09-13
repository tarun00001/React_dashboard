import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';

import ModalPage from './ModalPage';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  

const useStyles = makeStyles((theme) => ({
  addIcon: {
    // marginTop: theme.spacing(10),
    // marginLeft: theme.spacing(21)
    marginTop: '17%',
    marginLeft: '43%'
  },
  addProject:{
  //  marginTop: theme.spacing(3),
  //  marginLeft: theme.spacing(20)
  marginTop: '8%',
  marginLeft: '40%'
  },
  
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    borderRadius: '10px',
  },
  paper1: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  fixedHeight: {
    height: 240,
  },
}));

const CardPlus = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const body = (
  //   <div style={modalStyle} className={classes.paper1}>
  //     <h2 id="simple-modal-title">Text in a modal</h2>
  //     <p id="simple-modal-description">
  //       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
  //     </p>
      
  //   </div>
  // );

  return (
    <Grid item xs={12} md={4} lg={4}>
      <Paper className={fixedHeightPaper}>
        <Fab color="primary" aria-label="add" onClick={handleOpen} className={classes.addIcon}>
          <AddIcon />
          
        </Fab>
        <Box className={classes.addProject} component="h4" display="block"> Add Project</Box>
        
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ModalPage modalStyle={modalStyle} className={classes.paper1}/>
      </Modal>
    </Grid>
  );
};

export default CardPlus;
