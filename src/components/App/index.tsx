import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeaderApp, Dashboard, Project } from "../index";
import { Provider } from "react-redux";
import store from "../store";

const APP: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderApp />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects/:projId" element={<Project />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export const App: React.FC = (props: any) => {
  return (
    <Provider store={store}>
      <APP {...props} />
    </Provider>
  );
};
