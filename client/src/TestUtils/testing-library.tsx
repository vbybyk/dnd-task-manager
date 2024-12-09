import { ReactElement, PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { APP } from "../App";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import AppContext from "../Context/AppContext";
import { configureStore } from "../Store";

const renderWithContext = (
  ui: ReactElement,
  {
    initialState,
    store = configureStore(initialState),
    ...renderOptions
  }: {
    initialState?: any;
    store?: any;
  } & Omit<RenderOptions, "queries"> = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
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
            <APP>{children}</APP>
          </ConfigProvider>
        </Provider>
      </AppContext>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export * from "@testing-library/react";
export { renderWithContext as render };
