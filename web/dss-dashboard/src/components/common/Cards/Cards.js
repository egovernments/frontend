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
import { handleWhatsAppImageShare } from '../../../utils/Share';
import InfoIcon from '@material-ui/icons/Info';
import { Tooltip } from '@material-ui/core';

const cardStyle = {
  backgroundColor: variables.widget_background,
  height: 'auto',
  margin: '12px 12px 12px 12px !important',
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
  componentWillReceiveProps(nextProps) {
    // console.log("Card=>>>>>",nextProps.GFilterData,this.props.GFilterData);
  }

  downloadAsImage = () => {
    let { strings, title } = this.props;
    let div = document.getElementById('card' + this.props.id);
    // this.props.APITransport(true)
    domtoimage.toJpeg(div, { quality: 0.95, bgcolor: 'white' })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = (strings[title] || title) || 'image.jpeg';
        link.href = dataUrl;
        link.click();
        this.setState({ anchorEl: null });
        // this.props.APITransport(false)
      }.bind(this))
  }

  shareAsImage = () => {
    let { strings, title } = this.props;
    let div = document.getElementById('card' + this.props.id);
    this.props.APITrans(true)
    var ts = Math.round((new Date()).getTime() / 1000);

    domtoimage.toJpeg(div, { quality: 0.95, bgcolor: 'white' })
      .then(function (dataUrl) {
        var blobData = this.dataURItoBlob(dataUrl);
        blobData.name = (strings[title] || 'image') + ts + ".jpeg"

        try {
          this.props.APITrans(false);
          handleWhatsAppImageShare(blobData)
        } catch{ }
      }.bind(this))
  }

  dataURItoBlob = (dataURI) => {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }

  renderMenues() {
    const { classes, title } = this.props;
    return (<div className={[classes.actionMenues, classes.fullw].join(' ')}>
      <ActionButtons text={"More Actions"} handleClick={this.handleClick} buttonType="info" target="info"></ActionButtons>
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
        // PaperProps={{
        //   style: {
        //     left: '100%',
        //     // transform: 'translateX(-77%) translateY(32%)',
        //   }
        // }}
        MenuListProps={{
          style: {
            padding: 5,
          },
        }}
        keepMounted
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}

      >
        <MenuItem onClick={this.downloadAsImage.bind(this)} className={classes.menuItem}>
          <ListItemIcon className={classes.itemIcon}>
            <CloudDownloadSharp />
          </ListItemIcon>
          <ListItemText primary="Image" />
        </MenuItem>
        <MenuItem onClick={this.shareAsImage.bind(this)} className={classes.menuItem}>
        <ListItemIcon className={classes.itemIcon}>
            <SVG src={share} style={{ marginRight: '10px' }} >
            </SVG>
          </ListItemIcon>
          <ListItemText primary="Share" />
        </MenuItem>
      </Menu>
    </div>)
  }

  render() {
    let { strings } = this.props;
    const { classes, needInfo, id, title, fullW, noUnit } = this.props;
    let newClass = fullW ? classes.full : classes.redused;
    // console.log('noUnit',noUnit, title);

    return (
      // this.props.cardStyle || cardStyle
      <Card id={'card' + id} style={this.props.cardStyle || cardStyle} classes={{ root: newClass }}>
        <div className={classes.headRoot}>
          {title && <CardHeader classes={{ title: classes.title, root: classes.cardheader }} title={(strings[title] || title) + (!noUnit ? '' : (' (In ' + this.props.GFilterData['Denomination'] + ')'))} onClick={(event) => this.clickEvent(event)}
            action={
              <div style={{ paddingLeft: '4px' }}>
                <Tooltip title={strings[title] || title} classes={{ tooltip: classes.lightTooltip }}>
                  <InfoIcon style={{ color: '#96989a',verticalAlign: '-webkit-baseline-middle',paddingTop:'3px' }} />
                </Tooltip>
              </div>
            }
            >

          </CardHeader>
          }
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
    GFilterData: state.GFilterData,
    strings: state.lang
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    APITrans: APIStatus,
  }, dispatch)
}

export default withRouter(withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Cards)));


// export default withStyles(style)(Cards)