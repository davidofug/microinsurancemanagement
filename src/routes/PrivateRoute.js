import { Navigate } from "react-router-dom";
import useAuth from "../contexts/Auth";
import Container from "components/Layouts/Container";
import { ToastContainer } from "react-toastify";
import Chat from "components/messenger/Chat";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? (
    <Container>
      <ToastContainer />
      {children}
      <Chat />
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
