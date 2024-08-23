import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import AppContext from "../Context/AppContext";
import HeaderApp from "../Components/Header/Header";
import { Dashboard } from "../Pages/Dashboard/Dashboard";
import { Project } from "../Pages/Project/Project";
import { ProfilePage } from "../Pages/ProfilePage/ProfilePage";
import { AppLayout } from "./AppLayout/AppLayout";
import { Toaster } from "../Components/Common/Toaster/Toaster";
import { Popup } from "../Components/Common/Popup/Popup";
import store from "../Store";
import useTasks from "../Hooks/useTasks";
import "./App.scss";

const APP: React.FC = () => {
  const { getProjects, getUser } = useTasks();

  useEffect(() => {
    getProjects();
    getUser(1);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <HeaderApp />
        <AppLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects/:projId" element={<Project />} />
            <Route path="/users/:userId" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AppLayout>
        <Toaster />
        <Popup />
      </div>
    </BrowserRouter>
  );
};
export const App: React.FC = (props: any) => {
  return (
    <AppContext>
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
    </AppContext>
  );
};
