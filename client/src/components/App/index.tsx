import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeaderApp, Dashboard, Project } from "../index";
import { Provider } from "react-redux";
import store from "../store";
import useTasks from "../Hooks/useTasks";
import "./App.scss";

const APP: React.FC = () => {
  const { getProjects } = useTasks();
  useEffect(() => {
    getProjects();
  }, []);
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
