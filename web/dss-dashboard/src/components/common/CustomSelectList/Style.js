import variables from '../../../styles/variables';
const styles = theme => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: variables.white,
        overflowY: 'auto'
    },
    listItem: {
        // color: variables.black,
        borderBottom: `1px solid ${variables.CustomSelectListDividerColor}`,
        flexDirection: 'column'


    },
    alternativeColor: {
        '& > div:nth-of-type(odd)': {
            backgroundColor: variables.CustomSelectListAlternativeColor,
            // display: 'flex'
        },

    },
    listItemTest: {
        // color: variables.CustomSelectListColor,
        display: 'flex',
        '& span': {
            color: variables.CustomSelectListColor,
            fontFamily: variables.SecondaryFont,
            fontSize: variables.f_500,
            display: 'flex',
            margin: '16px 0 0 0'
        }
    },
    checkboxClass: {
        color: variables.CustomSelectListColor,
        display: 'flex'
    },
    inputContainer: {
        display: 'flex'
    },
    box: {
        display: 'flex'
    }

});

export default styles;