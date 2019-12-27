import variables from "../../../styles/variables";
import { isMobile } from 'react-device-detect';

const styles = theme => ({
    CloseButton: {
        marginTop: '4px',
        marginRight: '5px'
    },
    formControl: {
        margin: '0',
        minWidth: 120,
        // 'flex-grow': 1,
        '& label': {
            color: 'red',
            top: '-15px'
        },
    },
    list: {
        display: 'flex'
    },
    mainFilter: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: variables.white,
        textAlign: 'left !important'
    },
    filterS: {
        // margin: 0 10px 0 10px; */
        display: 'flex',
        flex: 1,
        /* flex: 0; */
        margin: '5px 0 0 0',
        // width: '190px',
        flexDirection: 'column'
    },
    filterHead: {
        fontFamily: 'Roboto',
        fontSize: '12px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: '#96989a',
    },
    actions: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row-reverse'
    },
    fullWidth: {
        flex: 1
    },
    fVisible: {
        display: 'flex',
        flexDirection: 'column',
    },
    fVRow: {
        display: 'flex',
        flexDirection: 'row',
        margin: isMobile ? '7px 0 5px 0' : '0 0 5px 0'
    },
    fTitle: {
        display: 'flex',
        marginRight: '10px',
    },
    mChips: {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row'
    },
    mCustomChip: {
        '& span': {
            margin: '0 5px 0 5px'
        }
    },
    clearbtn: {
        backgroundColor: variables.white,
        marginTop: 12,
        // opacity: 0.2,
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'right',
        color: '#96989a'
    },
    '@media (min-width: 1367px)':{
        list: {
            '& div': {
                width:'200px !important'
            }

        }
    },
    '@media (max-width: 1293px)': {
        mainFilter: {
            display: 'flex',
            flexDirection: 'row',
        }
    },
    '@media (max-width: 1024px)': {
        mainFilter: {
            display: 'flex',
            flexDirection: 'column',
        }
    },
    '@media (max-width: 768px)': {
        mainFilter: {
            display: 'flex',
            flexDirection: 'column',
        }
    },

    '@media (max-width: 375px)': {
        mainFilter: {
            display: 'flex',
            flexDirection: 'column',
        }
    },
})

export default styles;