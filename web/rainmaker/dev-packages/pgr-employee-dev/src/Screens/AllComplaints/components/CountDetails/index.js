import React from "react";
import "./index.css";

const styles={
  box:{

  },
  
}

const CountDetails = ({ count, total,status }) => {
  return (
    <div className="box">
      {count<=total &&
        <div className="count-details">
          Showing {count} of {total} {status} complaints
        </div>
      }
      {count>total &&
        <div className="count-details">
          Showing {count} complaints
        </div>
      }
    </div>
  );
};

export default CountDetails;
