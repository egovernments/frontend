import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = {
  root: {
    // className:'ward',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& span':{
      width: 'auto'
    } 
  },
};

//const classes = useStyles();
class Chips extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        data:null
      }
  }

  render(){
   let { val, handleClick, classes }=this.props;
    return (
      <div >      
        <Chip
        className={classes.root}
          variant="outlined"
          size="small"
          avatar={<Avatar>{val.type}</Avatar>}
          label={val.label}
          // color="ward"
          clickable
          onDelete={handleClick}
        />  
      </div>
    );
   }
}

export default withStyles(useStyles)(Chips);
