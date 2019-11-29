import variables from "../../styles/variables";

const styles = theme => ({
    root: {
        color: variables.black,
        display: 'flex',
        flex: 1,
        fontFamily: variables.primaryFont,
        '& span': {

            fontSize: variables.fs_24,
            fontWeight: variables.f_500,
            height: 32
        }

    },
    tableChart: {
        maxWidth: '85vw',
        margin: 'auto'
    },
    collection: {
        display: 'flex',
        borderBottom: '1px solid #ccc'
    },
    collectionRow: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: '30px 0',

    },
    CollectionLabel: {
        display: 'flex',
        fontSize: variables.fs_14,
        fontFamily: variables.primaryFont,
        color: variables.black

    },
    collectionChart: {
        display: 'flex',
        flexDirection: 'column',
        '& div:last-child': {
            borderBottom: 'none'
        }
    },
    lineChart: {
        display: 'flex'
    },

});
export default styles;