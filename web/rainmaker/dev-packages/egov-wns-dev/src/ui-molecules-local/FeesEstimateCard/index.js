import React from "react";
import {
    withStyles
} from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardText
} from "material-ui/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {
    Tooltip
} from "egov-ui-framework/ui-molecules";
import {
    LabelContainer
} from "egov-ui-framework/ui-containers";
import Label from "egov-ui-kit/utils/translationNode";

const styles = {
    card: {
        backgroundColor: "rgb(242, 242, 242)",
        boxShadow: "none",
        borderRadius: 0
    },
    whiteCard: {
        padding: 18,
        marginTop: 24,
        // boxShadow: "none",
        borderRadius: 0,
        backgroundColor: "#ffffff"
    },
    whiteCardText: {
        padding: 8,
        color: "rgba(0, 0, 0, 0.6000000238418579)",
        fontFamily: "Roboto",
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: 0.65
    },
    toolTipIcon: {
        color: "rgba(0, 0, 0, 0.3799999952316284)",
        paddingLeft: 5,
        paddingTop: 1
    },
    bigheader: {
        color: "rgba(0, 0, 0, 0.8700000047683716)",
        fontFamily: "Roboto",
        fontSize: "34px",
        fontWeight: 500,
        letterSpacing: "1.42px",
        lineHeight: "41px"
    },
    taxStyles: {
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: 16,
        fontWeight: 400,
        lineHeight: "19px",
        letterSpacing: 0.67,
        fontFamily: "Roboto",
        marginBottom: 16
    }
};

function totalAmount(arr) {
    return arr
        .map(item => (item.value ? item.value : 0))
        .reduce((prev, next) => prev + next, 0);
}

function FeesEstimateCard(props) {
    const {
        classes,
        estimate,
        optionSelected = "Partial_Amount"
    } = props;
    // const { taxHeadEstimates, totalAmount } = estimationDetails[0] || {};
    // const { intrest, penalty, rebate } = importantDates;

    const total = totalAmount(estimate.fees);
    const totalHeadClassName = "tl-total-amount-value " + classes.bigheader;
    console.log(1, estimate);
    console.log(2, estimate.extra);
    return ( <
        Grid container >
        <
        Grid xs = {
            12
        }
        sm = {
            12
        } >
        <
        Typography variant = "body2"
        align = "right"
        className = "tl-total-amount-text" >
        <
        LabelContainer labelName = "Total Amount"
        labelKey = "WS_COMMON_TOTAL_AMT" /
        >
        <
        /Typography> <
        Typography className = {
            totalHeadClassName
        }
        align = "right" >
        Rs {
            5500
        } <
        /Typography> < /
        Grid > <
        Grid xs = {
            12
        }
        sm = {
            7
        } > {
            /* <Typography variant="subheading">{estimate.header}</Typography> */
        } <
        div style = {
            {
                marginTop: 48,
                maxWidth: 600
            }
        } >
        <
        Grid container > {
            estimate.fees.map((fee, key) => {
                let tooltip = fee.info ? ( <
                    Tooltip val = {
                        fee.info
                    }
                    icon = {
                        "info_circle"
                    }
                    />
                ) : (
                    ""
                );
                let textLeft = fee.name ? ( <
                    Grid container xs = {
                        8
                    } >
                    <
                    LabelContainer labelName = {
                        fee.name.labelName
                    }
                    labelKey = {
                        fee.name.labelKey
                    }
                    style = {
                        styles.taxStyles
                    }
                    /> { tooltip } < /
                    Grid >
                ) : ( <
                    Grid xs = {
                        8
                    }
                    />
                );
                let textRight = fee.value ? ( <
                    Grid xs = {
                        4
                    }
                    align = "right" >
                    <
                    LabelContainer labelName = {
                        fee.value
                    }
                    labelKey = {
                        fee.value
                    }
                    style = {
                        styles.taxStyles
                    }
                    /> < /
                    Grid >
                ) : ( <
                    Grid xs = {
                        4
                    }
                    align = "right" >
                    <
                    LabelContainer labelName = {
                        0
                    }
                    labelKey = {
                        0
                    }
                    style = {
                        styles.taxStyles
                    }
                    /> < /
                    Grid >
                );
                return ( <
                    Grid key = {
                        key
                    }
                    container > {
                        textLeft
                    } {
                        textRight
                    } <
                    /Grid>
                );
            })
        } <
        /Grid> <
        Divider style = {
            {
                marginBottom: 16
            }
        }
        /> <
        Grid container >
        <
        Grid item xs = {
            6
        } >
        <
        Typography variant = "body2" >
        <
        LabelContainer labelKey = "WS_COMMON_TOTAL_AMT" /
        >
        <
        /Typography> < /
        Grid > <
        Grid item xs = {
            6
        }
        align = "right"
        style = {
            {
                paddingRight: 0
            }
        }
        className = "tl-application-table-total-value" >
        <
        Typography variant = "body2" > {
            total
        } < /Typography> < /
        Grid > <
        /Grid> < /
        div > <
        /Grid> <
        Grid xs = {
            12
        }
        sm = {
            1
        } > < /Grid> <
        Grid xs = {
            12
        }
        sm = {
            4
        } > {
            /* <Typography
                      variant="body2"
                      align="right"
                      className="tl-total-amount-text"
                    >
                      <LabelContainer
                        labelName="Total Amount"
                        labelKey="WS_COMMON_TOTAL_AMT"
                      />
                    </Typography>
                    <Typography className={totalHeadClassName} align="right">
                      Rs {5500}
                    </Typography> */
        } {
            /* {estimate.extra && estimate.extra.length !== 0 ? ( */
        } {
            /* <Card className={classes.whiteCard}> */
        } {
            /* {estimate.extra.map((item, key) => {
                        let textLeft, textRight;
                        let colLeft = item.textRight ? 6 : 12;
                        let colRight = item.textLeft ? 6 : 12;
                        if (!item.textLeft) { */
        } {
            /* // textLeft = (
                        //   <Grid xs={colLeft}>
                        //     <Typography>Due Date</Typography>
                        //   </Grid>
                        // );
                        // } else { */
        } {
            /* //   textLeft = <Grid xs={colLeft} />;
                        // }
                        // if (item.textRight) { */
        } {
            /* // textRight = (
                        //   <Grid xs={colRight}>
                        //     <Typography>01/01/2019</Typography>
                        //   </Grid>
                        // );
                        // } else { */
        } {
            /* //   textRight = <Grid xs={colRight} />;
                        // }
                      //   return (
                      //     <Grid container>
                      //       <Grid xs={6}>
                      //         <Typography>Due Date</Typography>
                      //       </Grid>
                      //       <Grid xs={6}>
                      //         <Typography>01/01/2019</Typography>
                      //       </Grid>
                      //     </Grid>
                      //   );
                      // })} */
        }

        <
        Card className = {
            classes.whiteCard
        }
        style = {
            {
                backgroundColor: '#fff',
                boxShadow: "none"
            }
        } >
        <
        Grid container >
        <
        Grid xs = {
            12
        }
        style = {
            {
                marginBottom: 16,
                fontSize: '16px',
                fontWeight: 500
            }
        } >
        <
        LabelContainer labelKey = "WS_VIEW_BILL_IMP_DATE_HEADER" /
        >
        <
        /Grid> <
        Grid xs = {
            6
        } >
        <
        Typography > < LabelContainer labelKey = "WS_VIEW_BILL_DUE_DATE_LABEL" > < /LabelContainer></Typography >
        <
        /Grid> <
        Grid xs = {
            6
        }
        align = "right" >
        <
        Typography > 01 / 01 / 2019 < /Typography> < /
        Grid > <
        /Grid> < /
        Card > {
            /* // ) : null} */
        } <
        /Grid>

        <
        /Grid >
    );
}

// FeesEstimateCard.propTypes = {
//   header: PropTypes.string.isRequired,
//   fees: PropTypes.array.isRequired,
//   extra: PropTypes.array.isRequired
// };

export default withStyles(styles)(FeesEstimateCard);