import { Navigate } from "react-router-dom";
import useAuth from "../contexts/Auth";
import Container from "components/Layouts/Container";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? (
    <Container>{children}</Container>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
