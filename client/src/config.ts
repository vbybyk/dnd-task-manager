let backendProtocol = "http://";

if (process.env.REACT_APP_ENV === "production") {
  backendProtocol = "https://";
}

export const BACKEND_URL = `${backendProtocol}${process.env.REACT_APP_BACKEND_URL}`;
