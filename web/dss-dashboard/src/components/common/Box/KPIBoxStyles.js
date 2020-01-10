import variables from '../../../styles/variables';

const styles = theme => ({
    KpiBox: {
        display: "flex",
        flexDirection: "row",
        height: 80,
        alignItems: 'center',
        cursor: 'pointer'
    },
    KPIItemSmall: {
        //paddingLeft:20,
        flex: 1,
        fontFamily: 'montserrat',
        //paddingTop:10
        textAlign: 'right'
    },
    KPIItem: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        // marginLeft:"10%",        
        flex: 2
    },
    heading: {
        //marginBottom:5,
    },
    fontLightGray: {
        color: variables.lighterGray
    },
    fontLarge: {
        fontSize: 37
    },
    fontMedium: {
        fontSize: 22
    },
    fontSmall: {
        fontSize: 14,
        paddingTop: 5
    },
    item: {
        display: 'table-cell'
    }
});

export default styles;