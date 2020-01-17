import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import variables from '../../../styles/variables';
import CloudDownloadSharp from '@material-ui/icons/CloudDownloadSharp';

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
import share from '../../../images/share.svg';
import SVG from 'react-inlinesvg';
import { APIStatus } from '../../../actions/apiStatus'
import InfoIcon from '@material-ui/icons/Info';
import { Tooltip } from '@material-ui/core';
import FileUploadAPI from '../../../actions/fileUpload/fileUpload'
import APITransport from '../../../actions/apitransport/apitransport'
import S3ImageAPI from '../../../actions/s3Image/s3Image';
import constants from '../../../actions/constants'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider';
import download from '../../../images/download.svg';
import Variables from '../../../styles/variables'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button';
import DraftsIcon from '@material-ui/icons/Drafts';
import WhatsappIcon from '@material-ui/icons/WhatsApp';

const cardStyle = {
  backgroundColor: variables.widget_background,
  height: 'auto',
  margin: '12px 12px 12px 12px !important',
  width: '100%'
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    PaperProps={{
      style: {
        left: '100%',
      }
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: '#fff',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#5b5b5b',
      },
    },
  },
}))(MenuItem);

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    }
    this.instance = this;
  }
  render() {
    let { strings } = this.props;
    const { classes, needInfo, id, title, fullW, noUnit } = this.props;
    let newClass = fullW ? classes.full : classes.redused;

    return (
      <Card id={'card' + id} style={this.props.cardStyle || cardStyle} classes={{ root: newClass }}>
        <CardContent classes={{ root: classes.cardContent }}>
          <Typography component="div">
            {this.props.children}
          </Typography>
        </CardContent>
      </Card>
    )

  }
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    GFilterData: state.GFilterData,
    strings: state.lang,
    s3FileCard: state.s3FileCard,
    s3ImageCard: state.s3ImageCard,

  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    APITrans: APIStatus,
    APITransport: APITransport,
    S3Trans: APITransport

  }, dispatch)
}

export default withRouter(withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Cards)));