import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import { HeaderApp } from "../Components/Header";
import { Dashboard } from "../Pages/Dashboard/Dashboard";
import { Project } from "../Pages/Project/Project";
import { AppLayout } from "./AppLayout/AppLayout";
import Toaster from "../Components/Common/Toaster/Toaster";
import store from "../Store";
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
        <AppLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects/:projId" element={<Project />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AppLayout>
        <Toaster />
      </div>
    </BrowserRouter>
  );
};
export const App: React.FC = (props: any) => {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          hashed: false,
          token: {
            fontFamily: "Rubik, sans-serif",
          },
        }}
      >
        <APP {...props} />
      </ConfigProvider>
    </Provider>
  );
};
