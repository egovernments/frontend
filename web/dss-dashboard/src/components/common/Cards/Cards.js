import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import variables from '../../../styles/variables';
import ImageIcon from '@material-ui/icons/Image';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { CardStyle as style } from './CardStyles';
import ActionButtons from '../inputs/ActionButtons';
import domtoimage from 'dom-to-image';
import CardHeader from '@material-ui/core/CardHeader'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

const cardStyle = {
  backgroundColor: variables.widget_background,
  height: 'auto',
  margin: '10px 10px 10px 10px !important',
  width: '100%'
}

class Cards extends Component {
  constructor(props) {
    super(props);
    this.clickEvent = this.clickEvent.bind(this);
    this.state = { anchorEl: null }
    this.instance = this;
  }
  clickEvent(event) {
    if (typeof this.props.cardClick === 'function') {
      this.props.cardClick('ALL', event);
    }
  }
  handleClick = (value, target, event) => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  downloadAsImage = () => {
    let div = document.getElementById('card' + this.props.id);
    // this.props.APITransport(true)
    domtoimage.toJpeg(div, { quality: 0.95, bgcolor: 'white' })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = this.props.name || 'image.jpeg';
        link.href = dataUrl;
        link.click();
        this.setState({ anchorEl: null });
        // this.props.APITransport(false)
      }.bind(this))


  }
  renderMenues() {
    const { classes, title } = this.props;
    return (<div className={[classes.actionMenues,classes.fullw].join(' ')}>
      <ActionButtons text={title} handleClick={this.handleClick} buttonType="info" target="info"></ActionButtons>
      {/* <Button 
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={this.handleClick}
      >
        Open Menu
      </Button> */}
      <Menu
        id="customized-menu"
        anchorEl={this.state.anchorEl}
        keepMounted
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleClose}
      >
        <MenuItem onClick={this.downloadAsImage.bind(this)} className={classes.menuItem}>
          <ListItemIcon className={classes.itemIcon}>
            <ImageIcon />
          </ListItemIcon>
          <ListItemText style={{marginTop: '0px',marginBottom: '0px'}} primary="Download image" />
        </MenuItem>

      </Menu>
    </div>)
  }

  render() {
    const { classes, needInfo, id,title  } = this.props;
    return (
      <Card id={'card' + id} style={this.props.cardStyle || cardStyle} classes={{ root: classes.root }} >
        <div className={classes.headRoot}>
       {title && <CardHeader  classes={{ title: classes.title, root: classes.cardheader }} title={title + ' (In '+ this.props.GFilterData['Denomination']+ ')'} onClick={(event) => this.clickEvent(event)}>
        </CardHeader>}
        {/* <div className={classes.fullw}></div> */}
        {needInfo && this.renderMenues()}
        </div>
        <CardContent classes={{ root: classes.cardContent }}>
          <Typography component="div">
            {this.props.children}
          </Typography>
        </CardContent>
        {/* <CardActions className={classes.actions}>
          {needInfo && this.renderMenues()}
        </CardActions> */}
      </Card>
    )

  }
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		GFilterData: state.GFilterData
	}
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators({
	}, dispatch)
}

export default withRouter(withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Cards)));


// export default withStyles(style)(Cards)