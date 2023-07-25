import React, { useContext, useEffect, useState } from "react";
import { FileContext } from "../context/fileContext";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [files, setFiles] = useState([]);
  const [selectVal] = useState("");
  const [selectedFiles, setSelectedFiles] = useContext(FileContext);
  const navigate = useNavigate();
  const listFiles = () => {
    axios.get("http://localhost:3004/files").then((res) => {
      const files = res.data;
      const updateFiles = files.map((file) => {
        return { ...file, value: file, label: file };
      });
      setFiles(updateFiles);
    });
  };

  const handleSelectedFiles = (fileName) => {
    if (!selectedFiles.includes(fileName)) {
      setSelectedFiles([...selectedFiles, fileName]);
    } else {
      const newArray = selectedFiles.filter((item) => item !== fileName);
      setSelectedFiles(newArray);
    }
  };

  const removeFile = (filename) => {
    const newArray = selectedFiles.filter((item) => item !== filename);
    setSelectedFiles(newArray);
  };

  const handleClick = () => {
    navigate("graficos");
  };

  useEffect(() => {
    listFiles();
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 m-auto">
        <div className="text-center text-white">
          <h1 className="text-6xl font-semibold p-3">Análise de Dados</h1>
          <h3 className="text-3xl p-1">Fórmula Tesla UFMG</h3>
        </div>
        <div className="w-2/3 m-auto flex">
          <select
            name="file"
            value={selectVal}
            onChange={(e) => handleSelectedFiles(e.target.value)}
          >
            <option value="">Selecionar arquivos</option>
            {files?.map((file, i) => (
              <option key={i} value={file.value}>
                {file.label}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-white">
          {selectedFiles.map((file) => (
            <div className="flex">
              <h1 key={file}>{file}</h1>
              <p
                className="ml-2 text-red-700 font-bold cursor-pointer"
                onClick={() => removeFile(file)}
              >
                x
              </p>
            </div>
          ))}
        </div>
        <div className="w-1/5 m-auto">
          <button
            className="bg-teslagreen text-white px-4 py-2 rounded hover:bg-teslagreen/90"
            onClick={() => handleClick()}
          >
            Gerar gráficos
          </button>
        </div>
      </div>
    </div>
  );
};
