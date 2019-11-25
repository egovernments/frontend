const styles = theme => ({
    root: {}, 
    elemClass: {
        display: 'flex',
        flex: 1
    },
    '@media (max-width: 2560px)': {
        mobile: {
            display: 'none',
        }, desktop: {
            display: 'flex',
            flexDirection: 'row',
        }
    },
    '@media (min-width: 768px)': {


        desktop: {
            display: 'none',
        }, mobile: {
            display: 'flex',
            flexDirection: 'row',
        }
    },
});
export default styles;