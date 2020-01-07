import { isMobile } from 'react-device-detect';

const styles = theme => ({
    root: {
        padding: '12px',
    },
    paper: {
        padding: '18px 12px 30px 12px !important',
    },
    filter: {
        textAlign: 'left',
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '500',
        color: '#fe7a51',
        padding: '0px 12px 12px 12px !important'
    },
    title: {
        textAlign: 'left',
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '500',
        color: 'rgba(0, 0, 0, 0.87)',
        // padding: '12px !important'
    },
    subTitle: {
        textAlign: 'left',
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '400',
        color: 'rgba(0, 0, 0, 0.87)'
    },
    cardTitle: {
        fontFamily: 'Roboto',
        fontSize: '20px',
        fontWeight: '500',
        margin: '10px 18px 0px 18px'
    },
    paperTitle: {
        fontFamily: 'Roboto',
        fontSize: '20px',
        fontWeight: '500',
        padding: isMobile ? '15px 5px 5px 15px' : '0px 5px 5px 5px',
        margin: '0px'
    },
    value: {
        textAlign: 'left',
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '500',
        color: 'rgba(0, 0, 0, 0.87)'
    },
    variant: {
        textAlign: 'left',
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '400',
        color: '#259b24'
    },
    customCard: {
        padding: '5px'
    },
    iconPaper: {
        backgroundColor: '#2196F3',
        color: 'white',
        height: '73px',
        width: '93px',
        verticalAlign: 'middle',
        paddingTop: '20px'
    },
    paperContainer: {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row'  
    },
    paperValues: {
        width: '100%', 
        paddingLeft: isMobile ? '0px' : '10px'
    },
    '@media (max-width: 3000px)': {
        root: {
            padding: '0px 12px 0px 12px !important',
        },
        paper: {
            padding: '18px 12px 30px 12px !important',

        },
        customCard: {
            padding: '5px'
        },
    },
    // '@media (max-width: 1150px)': {
    //     grid: {
    //         paddingLeft: '30px'
    //     },
    // },
    '@media (max-width:823px)': {
        root: {
            padding: '10px 5px 10px 5px !important',
        },
        paper: {
            padding: '10px 5px 10px 5px !important',
        },
        customCard: {
            padding: '15px'
        },

    },
});

export default styles;