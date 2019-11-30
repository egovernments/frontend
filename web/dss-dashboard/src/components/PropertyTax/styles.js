const styles = theme => ({
    dashboard: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 auto'
    },
    elemClass: {
        display: 'flex',
        flex: 1
    },
    btn1: { borderRadius: '2px', height: 'fit-content', backgroundColor: "#fe7a51", color: "white" },
    actions: {
        display: 'flex',
        margin: '0 0 10px 0',
        paddingLeft: '5px',
        paddingRight: '5px',
    },
    posit: {
        display: 'flex',
        flex: 1,
        justifyContent: 'end',
    },
    acbtn: {
        display: 'flex'
    },
    '@media (max-width: 2560px)': {
        actions: {
            flexDirection: 'row'
        },
        posit: {
            // display: 'flex',
            flexDirection: 'row-reverse',
            marginTop: '3px'
        }
    },
    '@media (max-width: 768px)': {
        actions: {
            flexDirection: 'column'
        },
        posit: {
            flexDirection: 'row-reverse',
            marginTop: '3px'
        }
    },
});
export default styles;