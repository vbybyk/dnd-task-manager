function success(message: string) {
  return { type: "SUCCESS", message };
}

function error(message: string) {
  return { type: "ERROR", message };
}

function clear() {
  return { type: "CLEAR" };
}

export const alertActions = {
  success,
  error,
  clear,
};
