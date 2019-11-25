import variables from "../../../styles/variables";

const styles = theme => ({

    "#customCalander": {
        // '& div': {
        backgroundColor: 'red'
        // }
    },

    root: {
        flexGrow: 1,
        maxWidth: '100%',
        // background: 'red',
        top: '17%',
        left: '18%',
        position: 'absolute'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    title: {
        '& h2': {
            width: '94px',
            height: '19px',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 'normal',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: 'normal',
            color: '#000000',
        }
    },
    cardheader: {

    },
    divider: {
        width: "741px",
        height: "1px",
        // border: "solid 1px #d9d9d9"
        background: "#d9d9d9",
    },
    changeyear: {
        // width: 46px;
        // height: 10px;
        fontFamily: 'Roboto',
        fontSize: '8px',
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: variables.blueyGrey
    },
    fils: {
        display: 'flex',
        // margin: '0 0 0 23px'
    },
    filterS: {
        display: 'flex',
        /* min-width: 200px; */
        flexDirection: 'column',
        // margin: '0 10px 0 10px',
        // border: '1px solid black',
        // borderRadius: '6px',
        margin: '0 0 0 34px',
        // margin: -7px 0 0 34px,
        '& div:nth-child(2n)': {
            // border: '1px solid black',
        }
    },

    datedisplay: {
        display: 'flex',
        marginTop: 10
    },
    back: {
        margin: '0 15px 0 0px',
        '& svg': {
            width: '8px',
            height: '5px',
            // transform: 'rotate(-270deg)',
            // backgroundColor: variables.paleGrey,
            // backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }
    },
    next: {
        margin: '0 0 0 15px',
        '& svg': {
            width: '8px',
            height: '5px',
            objectFit: 'contain',
            transform: 'rotate(180deg)',
            // backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }
    },
    rectangle: {
        width: '305px',
        height: '30px',
        borderRadius: '2px',
        border: 'solid 1px #d9d9d9',
        backgroundColor: variables.white,
        textAlign: 'center',
        fontFamily: 'roboto',
        '& span': {
            width: '92px',
            height: '16px',
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontWeight: 500,
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: 'normal',
            textAlign: 'center',
            color: '#000000',
        }
    },
    to: {
        margin: '0 10px 0 10px',
        textAlign: 'center',
        '& span': {
            width: '11px',
            height: '16px',
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontWeight: 500,
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: 'normal',
            color: '#000000',
        }
    },
    calanderDisplay: {
        display: 'flex',
        // margin: '10px 0 0 22px'
    },
    calanderclass: {
        // width: 305,
        // height: 283,
        // borderRadius: 2,
        // border: 'solid 1px #d9d9d9',
        backgroundColor: '#fcfcfc',
    },
    space: {
        width: 29
    },
    actions: {
        display: 'flex',
        justifyContent: 'center'
    },
    cancelbtn: {
        // width: 82,
        // height: 32,
        borderRadius: 2,
        backgroundColor: variables.white,

        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: '#656565',
    },
    okbtn: {
        // width: 78,
        // height: 32,
        borderRadius: 2,
        border: 'solid 1px #5b5b5b',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: '#5b5b5b',
    },
    trans: {
        // '& div > div': {
        background: 'transparent'
        // }
    },
    '@media (max-width: 1115px)': {
        calanderDisplay: {
            display: 'flex',
            flexDirection: 'column'
        },
        fils: {
            display: 'flex',
            flexDirection: 'column'
        },

    }, '@media (max-width: 1000px)': {
        root: {
            top: '28%',
            left: '0px',
            width:'96%'
        }, calanderDisplay: {
            display: 'flex',
            flexDirection: 'column'
        },
        fils: {
            display: 'flex',
            flexDirection: 'column'
        },actions: {
            display: 'flex',
            justifyContent: 'center',
            margin: '10px 0 107px 0'
        }
    }
})

export default styles;