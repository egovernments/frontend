import Response from "./pages/Response";
import FstpInbox from "./pages/employee/FstpInbox";
import { FsmBreadCrumb } from "./pages/employee";
import SelectStreet from "./pageComponents/SelectStreet";
import ApplicationDetails from "./pages/citizen/ApplicationDetails";
import EmployeeApplicationDetails from "./pages/employee/ApplicationDetails/ApplicationDetails";
import FstpOperations from "./pages/employee/FstpOperations";
import SelectTripData from "./pageComponents/SelectTripData";
import FSMCard from "./components/FsmCard";
import FstpOperatorDetails from "./pages/employee/FstpOperatorDetails";
import SelectChannel from "./pageComponents/SelectChannel";
import Inbox from "./pages/employee/Inbox";
import SelectTankSize from "./pageComponents/SelectTankSize";
import NewApplicationCitizen from "./pages/citizen/NewApplication/index";
import SelectAddress from "./pageComponents/SelectAddress";
import SelectTrips from "./pageComponents/SelectTrips";
import AdvanceCollection from "./pageComponents/AdvanceCollection";
import SelectSlumName from './pageComponents/SelectSlumName'
import CheckSlum from './pageComponents/CheckSlum'

export const fsmComponents = {
  FSMResponse: Response,
  FSMFstpInbox: FstpInbox,
  FSMEmpInbox: Inbox,
  FsmBreadCrumb: FsmBreadCrumb,
  SelectStreet,
  FSMCitizenApplicationDetails: ApplicationDetails,
  FSMEmployeeApplicationDetails: EmployeeApplicationDetails,
  FstpOperations: FstpOperations,
  SelectTripData,
  FSMCard,
  FSMFstpOperatorDetails: FstpOperatorDetails,
  SelectChannel: SelectChannel,
  SelectTankSize,
  FSMNewApplicationCitizen: NewApplicationCitizen,
  SelectAddress,
  SelectTrips,
  AdvanceCollection,
  SelectSlumName,
  CheckSlum
};
