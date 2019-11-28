//import variables from '../../../../styles/variables';
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
        display: 'flex',
        maxWidth: '250px'
    },
    list: {
        // display: 'flex',
        '& div': {
            flex: 1
        }
    },
    formControl: {
        minWidth: 'auto'
    },
    CloseButton: {
        marginTop: '4px',
        marginRight: '5px'
    },
});

export default styles;