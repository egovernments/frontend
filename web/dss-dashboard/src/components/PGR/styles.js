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
        justifyContent: 'flex-end'
    },
    acbtn: {
        display: 'flex'
    },
    '@media (max-width: 2560px)': {
        // mobile: {
        //     display: 'none',
        // },
        // desktop: {
        //     display: 'flex',
        //     flexDirection: 'row',
        // }
    },
    '@media (min-width: 768px)': {


        // desktop: {
        //     display: 'none',
        // },
        // mobile: {
        //     display: 'flex',
        //     flexDirection: 'row',
        // }
    },
});
export default styles;