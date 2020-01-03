import React from "react";
import Language from "@material-ui/icons/Language";
import _ from 'lodash';
import PropertyTaxIcon from '../../../images/property-tax.svg'
import DashBoardIcon from '../../../images/dashboards.svg'
import HomeIcon from '../../../images/home.svg'
import ComplaintsIcon from '../../../images/complaints.svg'
import TradeIcon from '../../../images/trade-license.svg'
import Style from './Styles'
import { withStyles } from '@material-ui/core/styles';

import SVG from 'react-inlinesvg';

class Icon extends React.Component {
    constructor(props) {
        super(props);

    }

    renderIcons(type) {
        console.log(type.toLowerCase())
        let { classes } = this.props;

        switch (type.toLowerCase()) {
            case 'overview':
            case 'dss_overview':
                return <SVG src={DashBoardIcon} fill="white" className={classes.icon} style={{ width: '50px', height: '50px', color: 'white' }}></SVG>
            case 'property tax':
            case 'dss_property_tax':
                return <SVG src={PropertyTaxIcon} fill="white" className={classes.icon} style={{ width: '40px', height: '40px' }}></SVG>
            case 'trade license':
            case 'dss_trade_licence':
                return <SVG src={TradeIcon} fill="white" className={classes.icon} style={{ width: '40px', height: '40px' }}></SVG>
            case 'complains':
            case 'dss_complains':
                return <SVG src={ComplaintsIcon} fill="white" className={classes.icon} style={{ width: '40px', height: '40px' }}></SVG>
            default:
                return <div></div>

        }


    }

    render() {
        let { classes, strings } = this.props;
        return (
            <div>{this.renderIcons(this.props.type)}</div>
        )
    }
}

export default withStyles(Style)(Icon);