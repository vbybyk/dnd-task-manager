import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeaderApp, Favorite, List } from "../index";
import { Provider } from "react-redux";
import store from "../store";

const APP: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderApp />
        <Routes>
          <Route path="/list" element={<List />} />
          <Route path="/favorite" element={<Favorite />} />
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
