import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles/CardHeaderStyle";
import Config from '../../../config/configs'

const useStyles = makeStyles(styles);

export default function CardHeader(props) {
  const classes = useStyles();
  const { className, children, color, plain, stats, icon, page, ...rest } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + "CardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className]: className !== undefined
  });
  let url = Config.DEMO_API_URL + Config.APP_NAME + page
  return (
    <div className={cardHeaderClasses} {...rest}>
      <a href={url} style={{ textDecoration: 'none',cursor: 'pointer',cursor: 'hand' }}>
        {children}
      </a>
    </div>
  );
}

CardHeader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "red"
  ]),
  plain: PropTypes.bool,
  stats: PropTypes.bool,
  icon: PropTypes.bool,
  children: PropTypes.node
};