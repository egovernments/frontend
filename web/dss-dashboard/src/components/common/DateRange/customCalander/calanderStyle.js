import variables from "../../../../styles/variables";


const styles = theme => ({
    mainDiv: {

    },
    root: {
        border: 'solid 1px #d9d9d9',
        // height: 283,
        borderRadius: 2,
        // width: 303,
        // height: 'auto',
        margin: 0,
        padding: 0,
        display: 'block',
        overflow: 'hidden',
        // position: 'absolute',
        borderCollapse: 'collapse',
        fontFamily: "Robo",
        backgroundColor: variables.white,
        // boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3125)',
        // '-webkit-box-shadow': '0 1px 3px rgba(0, 0, 0, 0.3125)',
        // borderRadius: 3,
        // '-webkit-border-radius': 3,
        '& tbody': {
            // width: 305,
            // height: 283,
            // borderRadius: 2,
            // border: 'solid 1px #d9d9d9',
            backgroundColor: '#fcfcfc',
            '& tr': {
                fontFamily: 'Roboto',
                fontSize: 12,
                fontWeight: 500,
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: 'normal',
                letterSpacing: 'normal',
                textAlign: 'center',
                color: '#000000',
                '& td': {
                    '& span': {
                        margin: 13,
                        cursor: 'pointer'
                    }
                }
            }
        }
    },
    tableHead: {
        // width: 305,
        borderRadius: 2,
        borderBottom: 'solid 1px #d9d9d9',
        backgroundColor: '#f6f6f6',
        '& tr': {
            height: 36,
            '& th': {
                fontFamily: 'Roboto',
                fontSize: 12,
                fontWeight: 500,
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: 'normal',
                letterSpacing: 'normal',
                textAlign: 'center',
                color: '#000000',

            }
        }
    },
    calendarDate: {
        margin: 0,
        padding: 0,
        display: 'block',
    },
    calendarMonth: {
        // '& tbody': {
        //     '& tr': {
        //         width: 81.66666666666667,
        //         padding: 5,
        //         lineHeight: 25,
        //     }
        // }
        width: '100%',
        margin: 0,
        padding: 0,
        width: 44,
        height: 49,
        borderSpacing: 0,
        borderCollapse: 'collapse',
        '& span': {
            margin: `24px !important`
        }
    },
    calendarYear: {
        // '& tbody': {
        //     '& tr': {
        //         width: 81.66666666666667,
        //         padding: 5,
        //         lineHeight: 25,
        //     }
        // }
        width: '100%',
        margin: 0,
        padding: 0,
        width: 44,
        height: 49,
        borderSpacing: 0,
        borderCollapse: 'collapse',
        '& span': {
            margin: `36px !important`
        }
    },
    calendarDay: {
        width: '100%',
        margin: 0,
        padding: 0,
        // width: 44,
        height: 39,
        borderSpacing: 0,
        borderCollapse: 'collapse',

    },
    calNevi: {
        width: '100%',
        margin: 0,
        padding: 0,
        display: 'table',
        borderSpacing: 0,
        borderCollapse: 'separate',
        backgroundColor: '#cd283c',
        borderRadius: '3px 3px 0 0',
        '-webkit-border-radius': '3px 3px 0 0',
    },
    rectangle: {
        // width: '305px',
        height: '30px',
        borderRadius: '2px',
        display: 'flex',
        border: 'solid 1px #d9d9d9',
        backgroundColor: variables.white,
        textAlign: 'center',
        fontFamily: 'roboto',
        '& span': {
            margin: 'auto',
            // width: '92px',
            // height: '16px',
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontWeight: 500,
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: 'normal',
            textAlign: 'center',
            color: '#000000',
        },
        '& svg:nth-child(1n)': {
            // transform: 'rotate(180deg)',
            left: 0,
            margin: 'auto'
        },
        '& svg:nth-child(2n)': {
            transform: 'rotate(180deg)',
            margin: 'auto'
        }
    },
    calendarLabel: {
        cursor: 'pointer'
    },
    calButtonprev: {
        // backgroundImage: `url(${shape_icon})`
        left: 0
    },
    calButtonNext: {
        right: 0,
        transform: 'rotate(180deg)',
    },
    divNext: {
        display: 'flex',
        minWidth: 24
    },
    divBack: {
        display: 'flex',
        minWidth: 24
    },
    today: {
        '& span': {
            color: 'red',
            fontWeight: 600
        }
    },
    selectedDay: {
        // width: 30,
        // height: 29,
        backgroundColor: "#fe7a51",
        borderRadius: '50%',
        '& span': {
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontWeight: 500,
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: 'normal',
            textAlign: 'center',
            color: '#ffffff',
        }
    },
    selectedRange: {
        backgroundColor: '#ebebeb',
    },
    '@media (max-width: 1293px)': {
        root: {
            '& tbody': {
                '& tr': {
                    '& td': {
                        '& span': {
                            margin: 26
                        }
                    }
                }
            }
        },
        calendarDay: {
            height: 59
        }
    },
    '@media (max-width: 1024px)': {
        root: {
            '& tbody': {
                '& tr': {
                    '& td': {
                        '& span': {
                            margin: 25
                        }
                    }
                }
            }
        },
        calendarDay: {
            height: 25
        }
    },
    '@media (max-width: 768px)': {
        root: {
            '& tbody': {
                '& tr': {
                    '& td': {
                        '& span': {
                            margin: 19
                        }
                    }
                }
            }
        },
        calendarDay: {
            height: 42
        }
    },

    '@media (max-width: 375px)': {
        root: {
            '& tbody': {
                '& tr': {
                    '& td': {
                        '& span': {
                            margin: 7
                        }
                    }
                }
            }
        },
        calendarDay: {
            height: 22
        }
    },





});
export default styles;