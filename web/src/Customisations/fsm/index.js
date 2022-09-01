import Response from "./pages/Response";
import FstpInbox from "./pages/employee/FstpInbox";
import { FsmBreadCrumb } from "./pages/employee";
import SelectStreet from "./pageComponents/SelectStreet";
import ApplicationDetails from "./pages/citizen/ApplicationDetails";
import EmployeeApplicationDetails from "./pages/employee/ApplicationDetails/ApplicationDetails";
import FstpOperations from "./pages/employee/FstpOperations";
import SelectTripData from "./pageComponents/SelectTripData";

export const fsmComponents = {
  FSMResponse: Response,
  FSMFstpInbox: FstpInbox,
  FsmBreadCrumb: FsmBreadCrumb,
  SelectStreet,
  FSMCitizenApplicationDetails: ApplicationDetails,
  FSMEmployeeApplicationDetails: EmployeeApplicationDetails,
  FstpOperations: FstpOperations,
  SelectTripData,
};
  