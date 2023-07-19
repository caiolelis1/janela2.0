import React, { createContext, useState } from "react";

export const FileContext = createContext();

const { Provider } = FileContext;

export const FileProvider = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  return (
    <Provider value={[selectedFiles, setSelectedFiles]}>
      {props.children}
    </Provider>
  );
};
