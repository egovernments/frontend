import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SVG from 'react-inlinesvg';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import download from '../../../images/download.svg';
import FilterTable from './filterTable';
import ImageIcon from '@material-ui/icons/Image';
import PdfIcon from '@material-ui/icons/PictureAsPdf';
import jsPDF from 'jspdf'
import { renderToString } from 'react-dom/server'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIStatus } from '../../../actions/apiStatus'
import { downloadAsImage, printDocument } from '../../../utils/block';


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
    // CloseButton: {
    //     display: 'flex'
    // }
}))(MenuItem);





export function CustomizedMenus(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const downloadImage = () => {
        downloadAsImage(props.fileName || 'dashboard').then(function (success) {
            setAnchorEl(null);
        }.bind(this)).catch(function (err) {
            console.log(err);
            setAnchorEl(null);
        }.bind(this))

    }
    const renderTable = () => {
        return renderToString(<FilterTable data={props.GFilterData} name="Dashboard" />)
    }

    const downloadPDF = () => {
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
            } catch{ }
            // props.APITrans(false);
        }).catch(function (error) {
            console.log(error);
            setAnchorEl(null);
        })

    }
    console.log(props)
    return (
        <div>
            <Button style={{ borderRadius: '2px', border: 'solid 1px #5b5b5b', backgroundColor: "rgba(255, 255, 255, 0)", height: '32px' }}
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                // color="primary"
                onClick={handleClick}
            >
                <SVG src={download} style={{ marginRight: '10px' }} className={StyledMenuItem.CloseButton}>

                </SVG>
                <div style={{ fontFamily: 'Roboto', fontSize: '12px', fontWeight: '500', fontStretch: 'normal', fontStyle: 'normal', linHeight: 'normal', letterSpacing: 'normal', color: '#5b5b5b' }}>Download</div>


            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={downloadPDF}>
                    <ListItemIcon>
                        <PdfIcon />
                    </ListItemIcon>
                    <ListItemText primary="PDF" />
                </StyledMenuItem>
                <StyledMenuItem onClick={downloadImage}>
                    <ListItemIcon>
                        <ImageIcon />
                    </ListItemIcon>
                    <ListItemText primary="Image" />
                </StyledMenuItem>
            </StyledMenu>
        </div>
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