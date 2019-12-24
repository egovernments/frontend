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
import FileUploadAPI from '../../../actions/fileUpload/fileUpload'
import APITransport from '../../../actions/apitransport/apitransport'
import S3ImageAPI from '../../../actions/s3Image/s3Image';
import constants from '../../../actions/constants'

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
    var ts = Math.round((new Date()).getTime() / 1000);
    var APITransport = this.props.APITransport

    domtoimage.toJpeg(div, { quality: 0.95, bgcolor: 'white' })
      .then(function (dataUrl) {
        var blobData = this.dataURItoBlob(dataUrl);
        blobData.name = (strings[title] || 'image') + ts + ".jpeg"

        try {
          let fileUploadAPI = new FileUploadAPI(2000, 'dashboard', constants.FILE_UPLOAD_CARD, blobData);
          APITransport(fileUploadAPI)
        } catch{ }
      }.bind(this))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.s3FileCard != this.props.s3FileCard) {
      const { S3Trans } = this.props
      let s3ImageAPI = new S3ImageAPI(2000, 'dashboard', this.props.s3FileCard.files && Array.isArray(this.props.s3FileCard.files) && this.props.s3FileCard.files.length > 0 && this.props.s3FileCard.files[0] && this.props.s3FileCard.files[0].fileStoreId);
      S3Trans(s3ImageAPI)
    }


    if (prevProps.s3ImageCard != this.props.s3ImageCard) {
      let image = ''
      let file = this.props.s3ImageCard && this.props.s3ImageCard.fileStoreIds && Array.isArray(this.props.s3ImageCard.fileStoreIds) && this.props.s3ImageCard.fileStoreIds.length > 0 && this.props.s3ImageCard.fileStoreIds[0].url
      console.log(file)
      if ((file.match(new RegExp("https", "g")) || []).length > 1) {
        debugger
        var n = file.lastIndexOf("https");
        image = file.substr(n, file.length)
        console.log(image)

      } else {
        debugger
        image = file
        console.log(image)
      }

      var fakeLink = document.createElement('a');
      fakeLink.setAttribute('href', 'https://' + (this.isMobileOrTablet() ? 'api' : 'web') + '.whatsapp.com/send?text=' + encodeURIComponent(this.props.s3File['url']));
      fakeLink.setAttribute('data-action', 'share/whatsapp/share');
      fakeLink.setAttribute('target', '_blank');
      fakeLink.click();
    }

  }

  isMobileOrTablet = () => {
    return (/(android|iphone|ipad|mobile)/i.test(navigator.userAgent));
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
    let { strings } = this.props;
    return (<div className={[classes.actionMenues, classes.fullw].join(' ')}>
      <ActionButtons text={strings["DSS_MORE_ACTIONS"] || "More Actions"} handleClick={this.handleClick} buttonType="info" target="info"></ActionButtons>
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
          <ListItemText primary={strings["DSS_IMAGE"] || "Image"} />
        </MenuItem>
        <MenuItem onClick={this.shareAsImage.bind(this)} className={classes.menuItem}>
          <ListItemIcon className={classes.itemIcon}>
            <SVG src={share} style={{ marginRight: '10px' }} >
            </SVG>
          </ListItemIcon>
          <ListItemText primary={strings["DSS_MOBILE_SHARE"] || "Share"} />
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
                <Tooltip title={strings[title] || title} classes={{ tooltip: classes.lightTooltip }} placement="top">
                  <InfoIcon style={{ color: '#96989a', verticalAlign: '-webkit-baseline-middle', paddingTop: '3px' }} />
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
    strings: state.lang,
    s3File: state.s3File,
    s3Image: state.s3Image,

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


// export default withStyles(style)(Cards)