import variables from '../../../styles/variables';
export const CardStyle = {
    root: {
        margin: '5px 5px 5px 5px !important',
        // maxWidth: '97%'
    },
    card: {
        minWidth: 150,
        backgroundColor: variables.widget_background,
    },
    cardheader: {
        paddingBottom: 0,
        paddingLeft: '10px',
        paddingTop: '10px',
        // flex: 6,
        maxWidth: '70% !important',
        wordBreak: 'break-all',
        display: 'flex',
        // padding: 10,

        textAlign: 'left',
        '& div': {
            '& span': {
                fontSize: variables.fs_14,
            }
        }
    },
    fullw: {
        flex: 1,
        flexDirection: 'row-reverse',
        minHeight: '20px'
    },
    full: {
        width: '100%',
        margin: '5px 5px 5px 5px !important',
    },
    redused: {
        maxWidth: '97%',
        margin: '5px 5px 5px 5px !important',
    },
    cardContent: {
        paddingTop: 5,
        paddingBottom: 0,
        height: '100%'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        // marginBottom: 5,s
    },
    pos: {
        marginBottom: 12,
    },
    actionMenues: {
        display: 'flex',
        // flexDirection:'row-reverce'
    },
    actions: {
        padding: 0,
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    headRoot: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row'
    },
    menuItem: {
        padding: '0px 9px 0px 12px',
        fontSize: '10px !important',
        minHeight: '20px',
    },
    itemIcon: {
        minWidth: '30px'
    },

    '@media (max-width: 3000px)': {
        redused: {
            maxWidth: '100%',
        }
    },
    '@media (max-width: 768px)': {
        redused: {
            maxWidth: '97%',
        },
        itemMenu: {
            height: '45px',
            paddingBottom: '50px !important'
        },
        itemIcon: {
            minWidth: '30px'
        },
        menuItem: {
            padding: '0px 9px 0px 12px',
            minHeight: '20px',
            fontSize: '10px !important'

        },
    },

    '@media (max-width: 375px)': {
        itemMenu: {
            height: '45px',
            paddingBottom: '5px !important',
            fontSize: '10px !important'
        },
        itemIcon: {
            minWidth: '30px'
        },
        redused: {
            maxWidth: '97%',
        },
        menuItem: {
            padding: '0px 9px 0px 12px',
            minHeight: '20px',
            fontSize: '10px !important'
        },
    },
}