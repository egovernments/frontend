const styles = theme => ({
    root: {},
    elemClass: {
        display: 'flex',
        flex: 1
    },
    heading: {
        width: '129px',
        height: '26px',
        fontfamily: 'Roboto',
        fontSize: '20px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: '#000000'
    },
    posit:{
        display:'flex',
        flex: 1,
        flexDirection:'row-reverse'
    },
    '@media (max-width: 2560px)': {
        mobile: {
            display: 'none',
        },desktop: {
            display: 'flex',
            // flexDirection: 'row',
        }
    },
    '@media (min-width: 768px)': {
       

        desktop: {
            display: 'none',
        },mobile: {
            display: 'flex',
            flexDirection: 'row',
        }
    },
});

export default styles;