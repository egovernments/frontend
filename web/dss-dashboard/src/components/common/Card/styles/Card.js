import {
    blackColor,
    whiteColor,
    hexToRgb
  } from "../../../../assets/Home";
  
  const cardStyle = {
    card: {
      border: "0",
      marginBottom: "30px",
      marginTop: "30px",
      borderRadius: "6px",
      color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
      background: whiteColor,
      // width: "90%",
      boxShadow: "0 1px 4px 0 rgba(" + hexToRgb(blackColor) + ", 0.14)",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      // minWidth: "0",
      wordWrap: "break-word",
      fontSize: ".875rem"
    },
    cardPlain: {
      background: "transparent",
      boxShadow: "none"
    },
    cardProfile: {
      marginTop: "30px",
      textAlign: "center"
    },
    cardChart: {
      "& p": {
        marginTop: "0px",
        paddingTop: "0px"
      }
    },
    '@media (max-width: 3000px)': {
      card: {
          minHeight: '187px',
      }
  },
  '@media (max-width:823px)': {
      card: {
        minHeight: '187px',
      }
  },
  };
  
  export default cardStyle;