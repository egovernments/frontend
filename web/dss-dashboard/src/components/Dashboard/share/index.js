import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SVG from 'react-inlinesvg';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import share from '../../../images/share.svg';
import DraftsIcon from '@material-ui/icons/Drafts';
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import { handlePdfShareEmail, handleImageShareEmail, handleWhatsAppImageShare, handleWhatsAppPdfShare} from '../../../utils/Share';

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
    //     // display: 'flex'
    // }
}))(MenuItem);

export default function CustomizedShare(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl_email, setAnchorEl_email] = React.useState(null);
    const [anchorEl_pdf, setAnchorEl_pdf] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    // const handleClick_pdf = event => {
    //     setAnchorEl_pdf(event.currentTarget);
    // };
    // const handleClose_pdf = () => {
    //     setAnchorEl_pdf(null);
    // };

    const renderSharePDFMenue = (menue) => {
        return (
            <div >
                <Button style={{ borderRadius: '2px', border: 'solid 1px #5b5b5b', backgroundColor: "rgba(255, 255, 255, 0)" }}
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    // color="primary"
                    onClick={handleClick}
                >
                    <SVG style={{ marginRight: '10px' }}>
                    {/* className={StyledMenuItem.CloseButton} */}
                    </SVG>
                    Share
                </Button>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <StyledMenuItem onClick={handlePdfShareEmail}>
                        <ListItemIcon>
                            <DraftsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="PDF" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={handleImageShareEmail}>
                        <ListItemIcon>
                            <DraftsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Image" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={handleWhatsAppPdfShare}>
                        <ListItemIcon>
                            <WhatsappIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="PDF" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={handleWhatsAppImageShare}>
                        <ListItemIcon>
                            <WhatsappIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Image" />
                    </StyledMenuItem>
                </StyledMenu>
            </div>
        )
    }

    return (
        <div>
            <Button
                style={{ marginLeft: '20px', borderRadius: '2px', border: 'solid 1px #5b5b5b', backgroundColor: "rgba(255, 255, 255, 0)", height: '32px' }}
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                // color="primary"
                onClick={handleClick}
            >
                <SVG src={share} style={{ marginRight: '10px' }} >
                {/* className={StyledMenuItem.CloseButton} */}
                </SVG>
                <div style={{ fontFamily: 'Roboto', fontSize: '12px', fontWeight: '500', fontStretch: 'normal', fontStyle: 'normal', linHeight: 'normal', letterSpacing: 'normal', color: '#5b5b5b' }}>Share</div>
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>

                    {renderSharePDFMenue()}

                </StyledMenuItem>

            </StyledMenu>
        </div >
    );
}