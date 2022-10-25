import { useSelector } from "react-redux";
import NotFoundError from "../errors/notFoundError";
import { errorCodeSelector } from "../../store/reducers/httpErrorSlice";
import Layout from "./index";

export default function DetailLayout({ children, breadCrumb = null }) {
  const httpErrorCode = useSelector(errorCodeSelector);

  const globalErrors = new Map([[404, <NotFoundError />]]);

  const displayGlobalError = globalErrors.get(httpErrorCode);

  return (
    <Layout>
      {breadCrumb}
      {displayGlobalError ?? children}
    </Layout>
  );
}
