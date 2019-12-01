import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';
import PdfIcon from '@material-ui/icons/PictureAsPdf';
import jsPDF from 'jspdf'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIStatus } from '../../actions/apiStatus'
import MenuIcon from '@material-ui/icons/MoreVert';
import FilterIcon from '@material-ui/icons/FilterList';
import Divider from '@material-ui/core/Divider';
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import SVG from 'react-inlinesvg';
import download from '../../images/download.svg';
import share from '../../images/share.svg';
import { renderToString, } from 'react-dom/server'
import FilterTable from '../Dashboard/download/filterTable';
import { downloadAsImage, printDocument } from '../../utils/block';
import DraftsIcon from '@material-ui/icons/Drafts';
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import { handlePdfShareEmail, handleImageShareEmail, handleWhatsAppImageShare, handleWhatsAppPdfShare } from '../../utils/Share'
import domtoimage from 'dom-to-image';

const pdf = new jsPDF("p", "mm", "a1");
pdf.scaleFactor = 3;

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
            horizontal: 'center',
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

export function CustomizedMenus(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false)
    const [shareOpen, setShareOpen] = React.useState(false)

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClick1 = event => {
        setOpen(!open)
    };

    const handleClick2 = event => {
        setShareOpen(!shareOpen)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const downloadImage = () => {
        props.APITrans(true)
        downloadAsImage('dashboard').then(function (success) {
            props.APITrans(false)
            setAnchorEl(null);
        }.bind(this)).catch(function (err) {
            console.log(err);
            setAnchorEl(null);
        }.bind(this))

    }

    const renderTable = () => {
        return renderToString(<FilterTable data={props.GFilterData} name={props.fileHeader || "Dashboard"} />)
    }

    const downloadPDF = () => {
        props.APITrans(true)
        printDocument(pdf, renderTable()).then(function (pdfO) {
            let element = document.getElementById("printFtable")
            element.parentNode.removeChild(element);
            setAnchorEl(null);
            pdfO.save();

            try {
                pdf.deletePage(3)
                pdf.deletePage(2)
                pdf.deletePage(1)
                pdf.addPage();
                props.APITrans(false)
            } catch{ }
            // props.APITrans(false);
        }).catch(function (error) {
            console.log(error);
            setAnchorEl(null);
        })
    }

    const shareWhatsAppPDF = () => {
        props.APITrans(true);
        const pdf1 = new jsPDF("p", "mm", "a1");
        pdf1.scaleFactor = 3;

        printDocument(pdf1, renderTable()).then(function (pdfO) {
            let element = document.getElementById("printFtable")
            element.parentNode.removeChild(element);
            setAnchorEl(null);
            // pdfO.save();

            try {
                props.APITrans(false);
                handleWhatsAppPdfShare(pdfO)
            } catch{ }
        }).catch(function (error) {
            console.log(error);
            setAnchorEl(null);
        })
    }

    const shareEmailPDF = () => {
        props.APITrans(true);
        const pdf1 = new jsPDF("p", "mm", "a1");
        pdf1.scaleFactor = 3;

        printDocument(pdf1, renderTable()).then(function (pdfO) {
            let element = document.getElementById("printFtable")
            element.parentNode.removeChild(element);
            setAnchorEl(null);
            // pdfO.save();

            try {
                props.APITrans(false);
                handlePdfShareEmail(pdfO)
            } catch{ }
        }).catch(function (error) {
            console.log(error);
            setAnchorEl(null);
        })
    }
    const shareEmailImage = () => {
        props.APITrans(true);

        var ts = Math.round((new Date()).getTime() / 1000);

        let div = document.getElementById('divToPrint');
        domtoimage.toJpeg(div, { quality: 0.95, bgcolor: 'white' })
            .then(function (dataUrl) {
                var blobData = dataURItoBlob(dataUrl);
                blobData.name = "dss" + ts + ".jpeg"

                try {
                    props.APITrans(false);
                    handleImageShareEmail(blobData)
                } catch{ }
            }.bind(this))
    }

    const shareWhatsAppImage = () => {
        props.APITrans(true);

        var ts = Math.round((new Date()).getTime() / 1000);

        let div = document.getElementById('divToPrint');
        domtoimage.toJpeg(div, { quality: 0.95, bgcolor: 'white' })
            .then(function (dataUrl) {
                var blobData = dataURItoBlob(dataUrl);
                blobData.name = "dss" + ts + ".jpeg"

                try {
                    props.APITrans(false);
                    handleWhatsAppImageShare(blobData)
                } catch{ }
            }.bind(this))
    }


    const dataURItoBlob = (dataURI) => {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
    }

    return (
        <div style={{ paddingLeft: '10px' }}>
            <Button style={{ borderRadius: '2px', backgroundColor: props.bgColor, color: props.color }}
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                // color="primary"
                onClick={handleClick}
            >
                {props.type === 'filter' &&
                    <FilterIcon></FilterIcon>
                }

                {props.type === 'download' &&
                    <MenuIcon></MenuIcon>
                }

            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >

                <StyledMenuItem button onClick={handleClick1}>
                    <ListItemIcon style={{ width: '10px' }}>
                        <SVG src={download} style={{ marginRight: '10px' }}>
                        </SVG>
                    </ListItemIcon>
                    <ListItemText primary="Download" />
                    {open ? <IconExpandLess /> : <IconExpandMore />}
                </StyledMenuItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Divider />
                    <List component="div" disablePadding>
                        <StyledMenuItem button onClick={downloadImage}>
                            <ListItemIcon>
                                <ImageIcon />
                            </ListItemIcon>
                            <ListItemText primary="Image" />
                        </StyledMenuItem>
                        <StyledMenuItem button onClick={downloadPDF}>
                            <ListItemIcon>
                                <PdfIcon />
                            </ListItemIcon>
                            <ListItemText primary="PDF" />
                        </StyledMenuItem>
                    </List>
                </Collapse>

                <StyledMenuItem button onClick={handleClick2}>
                    <ListItemIcon style={{ margin: '0px', padding: '0px' }}>
                        <SVG src={share} style={{ marginRight: '10px' }}>

                        </SVG>
                    </ListItemIcon>
                    <ListItemText primary="Share" />
                    {shareOpen ? <IconExpandLess /> : <IconExpandMore />}
                </StyledMenuItem>
                <Collapse in={shareOpen} timeout="auto" unmountOnExit>
                    <Divider />
                    <List component="div" disablePadding>
                        <StyledMenuItem button onClick={shareEmailPDF}>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="PDF" />
                        </StyledMenuItem>
                        <StyledMenuItem button onClick={shareEmailImage}>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Image" />
                        </StyledMenuItem>
                        <StyledMenuItem button onClick={shareWhatsAppPDF}>
                            <ListItemIcon>
                                <WhatsappIcon />
                            </ListItemIcon>
                            <ListItemText primary="PDF" />
                        </StyledMenuItem>
                        <StyledMenuItem button onClick={shareWhatsAppImage}>
                            <ListItemIcon>
                                <WhatsappIcon />
                            </ListItemIcon>
                            <ListItemText primary="Image" />
                        </StyledMenuItem>

                    </List>
                </Collapse>
            </StyledMenu>

        </div >
    );
}

const mapStateToProps = state => ({
    GFilterData: state.GFilterData,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        APITrans: APIStatus,
    }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomizedMenus);