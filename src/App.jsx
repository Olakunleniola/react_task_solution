import AuthProvider from "./authContext";
import GlobalProvider from "./globalContext";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./main";

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <Router>
          <Main />
        </Router>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
