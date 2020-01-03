import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles/Card";
import Config from '../../../config/configs'

const useStyles = makeStyles(styles);

export default function Card(props) {
  const classes = useStyles();
  const { className, children, color, bgColor, plain, profile, chart, page,...rest } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes[color + "Card"]]: color,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [className]: className !== undefined
  });
  let url = Config.DEMO_API_URL + Config.APP_NAME + page
  return (
    <div className={cardClasses} {...rest} style={{backgroundColor:bgColor}}>
      <a href={url} style={{textDecoration: 'none'}}>{children}</a>
    </div>
  );
}


Card.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  chart: PropTypes.bool,
  children: PropTypes.node
};