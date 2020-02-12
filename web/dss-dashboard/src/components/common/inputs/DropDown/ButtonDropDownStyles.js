//import variables from '../../../../styles/variables';
import { isMobile } from 'react-device-detect';

const styles = theme => ({

    buttonDisplay: {
        display: 'block',

    },
    btnSecondary: {
        border: 'none'
    },
    select: {
        minWidth: '200px',
        '& .btn-secondary': {
            backgroundColor: 'white',
            color: 'black',
            borderRadius: 0
        },
        '& .dropdown-menu': {
            height: '145px',
            overflow: 'auto'
        },
        flex: 1
    },
    dropdownToggle: {
        width: '100%'
    },
    dropdownMenu: {
        width: '100%'
    },
    dropdownToggle: {
        border: 'none'
    },
    ddl: {
        // display: 'flex',
        minWidth: isMobile ? '100%' : '150',
        maxWidth: isMobile ? '100%' : '210',
    },
    list: {
        // width: isMobile ? '100%' : '90% !important',
        // display: 'flex',
        '& div': {
            flex: 1,
            minWidth:120,
            maxWidth: isMobile ? '100%' :'180px',
            marginRight: isMobile ? '100%' :'10px'
            // top: -4
        }
    },
    formControl: {
        minWidth: 'auto'
    },
    CloseButton: {
        marginTop: '4px',
        marginRight: '5px'
    },
    '@media (max-width:1024px)': {
        list: {
        // display: 'flex',
        '& div': {
             minWidth: isMobile ? '100%' : 70,
             maxWidth: isMobile ? '100%' : '80px'
            }
        },
        ddl: {
            maxWidth: '150'
        }
    },
    '@media (min-width: 900px)' :{
        list: {
        // display: 'flex',
        '& div': {
             minWidth:isMobile ? '100%' : 70,
            }
        },
        ddl: {
            maxWidth: isMobile ? '100%' :'150'
        }
    },
    '@media (max-width: 3000px)': {
        list: {
            '& div': {
                 minWidth:isMobile ? '100%' : 70,
                 maxWidth:isMobile ? '100%' :'200px'
                }
            },
            ddl: {
                maxWidth: '150'
            }
    },
   
});

export default styles;