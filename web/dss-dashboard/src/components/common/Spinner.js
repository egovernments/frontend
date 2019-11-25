import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

const styles = theme => ({
    progress: {
        position: 'relative',
        textAlign: 'center',
        top: '40%'
    },
    progressDiv: {
        position: 'fixed',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        opacity: 0.7
    }
});

class CircularIndeterminate extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        // const { classes } = props;
        console.log(this.props.apistatus.progress)
        return (
            <div>
                {this.props.apistatus.progress && <div style={{
                    position: 'fixed',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    opacity: 0.7
                }}>
                    <CircularProgress size={80} style={{
                        position: 'relative',
                        textAlign: 'center',
                        top: '40%',
                        color:"black"
                    }} />
                </div>
                }
            </div>

        );
    }

}

CircularIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(CircularIndeterminate);

const mapStateToProps = (state) => ({
    apistatus: state.apistatus

});

//   const mapDispatchToProps = (dispatch) => ({
//     changeTheName: () => dispatch(changeTheName()),
//     // loadDashboardConfigData: () => dispatch(loadDashboardConfigData())
//   });

export default connect(mapStateToProps)(CircularIndeterminate);
