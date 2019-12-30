import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import ChartRow from './chartrow';
import { withStyles } from '@material-ui/core';
import style from './layOutStyle';
import getFilterObj from '../../actions/getFilterObj';

class PageLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    setViewAll = (visualCode) =>{
        this.props.setViewAll(visualCode);
    }
    render() {
        let { classes, chartRowData, displayName, page } = this.props;
        let filters = getFilterObj(this.props.GFilterData, this.props.globalFilterData, page);
        return (
            <div className={`${classes.root}`} >

                {
                    chartRowData.map((vizData, j) =>
                        <ChartRow key={j} row={j} rowData={vizData} Gfilter={this.props.GFilterData} displayName={displayName[j]} filters={filters} page={page} setViewAll={this.setViewAll.bind(this)}/>)
                }
            </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        globalFilterData: state.globalFilter,
        GFilterData: state.GFilterData
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
    }, dispatch)
}
export default withRouter(withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(PageLayout)));

