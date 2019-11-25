import variables from "../../../styles/variables";

const styles = theme => ({
    mainFilter: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: variables.white,
        textAlign: 'left !important'
    },
    filterS: {
        // margin: 0 10px 0 10px; */
        display: 'flex',
        /* flex: 0; */
        margin: '0 0 0 2.1%',
        // width: '190px',
        flexDirection: 'column'
    },
    filterHead: {
        width: "55px",
        height: "13px",
        fontFamily: 'Roboto',
        fontSize: '12px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: '#96989a',
    },
    fullWidth: {
        flex: 1
    },
    clearbtn: {
        backgroundColor: variables.white,
        marginTop: 10,
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