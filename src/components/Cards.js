import React from 'react'
import Grid from '@material-ui/core/Grid';
import CardPlus from './CardPlus';
import Card from './Card';

const Cards = () => {

    return (
     
    <Grid container spacing={3}>
        <Card/>
        <CardPlus/>
       
      </Grid>
    )
}

export default Cards
