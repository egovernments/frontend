import React, { Component } from "react";
import Label from "egov-ui-kit/utils/translationNode";
import Card from "egov-ui-kit/components/Card";
// import { Card, Button } from "components";
import Screen from "egov-ui-kit/common/common/Screen";
import BreadCrumbs from "egov-ui-kit/components/BreadCrumbs";
import Divider from "egov-ui-kit/components/Divider";
import { connect } from "react-redux";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import "./index.css";
class PropertTaxNotification extends Component {
  componentDidMount() {
    const { addBreadCrumbs, title } = this.props;
    title && addBreadCrumbs({ title: title, path: window.location.pathname });
  }
  render() {
    const { urls, history } = this.props;
    return (
      <div >
      <div className="col-sm-12 blockBox">
        <BreadCrumbs url={urls} history={history} />
       
      </div>
      <div className="row rowmarginleft">
      <div className="col-sm-12">
    <h4>DESCRIPTION:</h4>
    <p>Property tax provides digital interface , allowing citizen to register their property and pay tax online. Moreover citizen can change property details by himself following that approval will required from MC office , this will happen online only no need to visit MC office</p>
<h5>For towns other than MC Fazilka, Please use the bellow links to avail the services</h5>
</div>
    </div>
    <div className="row rowmarginbtn">
      <div className="col-sm-3">
      <a className="buttonlink" href="http://lgpunjab.gov.in/cms/apply-new-connection.php" target="_blank">Apply New Connection</a>
      </div>
      <div className="col-sm-3">
      <a className="buttonlink" href="http://lgpunjab.gov.in/cms/apply-new-connection.php" target="_blank">Pay PROPERT TAX</a>
      </div>
      <div className="col-sm-3">
      <a className="buttonlink" href="http://lgpunjab.gov.in/upload/uploadfiles/files/document_3.PDF" target="_blank">NOTIFICATIONS</a>
      </div>
      <div className="col-sm-3">
      <a className="buttonlink" href="http://lgpunjab.gov.in/upload/uploadfiles/files/document_3.PDF" target="_blank">NOTIFICATIONS</a>
      </div>
      </div>
      <div class="row rowmarginbtn">
        <div class="col-sm-12">
          <h5>FACILITIES AVAILABLE:</h5>
          <ol>
            <li>Online tracking of the status of the application</li>
            <li>Status update through SMS and Email</li>
            <li>Download & Print the submitted Application copy, Receipts & Sanction Order.</li>
            <li>Payment of Water / Sewerage Bill though online/offline mode</li></ol></div></div>
    </div>
    );
  }
}

const mapStateToProps = state => {
  const { app } = state;
  const { urls } = app;
  return { urls };
};

const mapDispatchToProps = dispatch => {
  return {
    addBreadCrumbs: url => dispatch(addBreadCrumbs(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertTaxNotification);
