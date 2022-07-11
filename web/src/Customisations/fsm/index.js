import Response from "./pages/Response";
import FstpInbox from "./pages/employee/FstpInbox";
import { FsmBreadCrumb } from "./pages/employee";
import SelectStreet from "./pageComponents/SelectStreet";
import ApplicationDetails from "./pages/citizen/ApplicationDetails";

export const fsmComponents = {
  FSMResponse: Response,
  FSMFstpInbox: FstpInbox,
  FsmBreadCrumb: FsmBreadCrumb,
  SelectStreet,
  FSMCitizenApplicationDetails: ApplicationDetails,
};
  