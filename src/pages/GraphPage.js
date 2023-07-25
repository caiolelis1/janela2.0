import React, { useContext, useEffect, useState } from "react";
import { tsv } from "d3";
import { csv } from "d3";
import { Chart } from "../components/Chart";
import { FileContext } from "../context/fileContext";
import { useNavigate } from "react-router-dom";

export function getExtension(filename) {
  return filename.split(".").pop();
}

export const GraphPage = () => {
  const [selectedFiles] = useContext(FileContext);
  const navigate = useNavigate();

  const [auxData, setAuxData] = useState([]);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState();
  const [selectedCollum, setSelectedCollum] = useState();
  const [columns, setCollums] = useState([]);

  useEffect(() => {
    if (selectedFiles.length === 0) navigate("/");
    for (let i = 0; i < selectedFiles.length; i++) {
      let extension = getExtension(selectedFiles[i]);
      if(extension === "txt"){
        tsv("`../../../files/" + selectedFiles[i])
        .then((d) => { //mapeia pra pegar as colunas
          setAuxData((auxData) => [...auxData, d]);
          const options = d.columns.map((column) => {
            return { value: column, label: column };
          });
          setCollums(options);
        })
        .catch((err) => console.log(err));
      }
      else{
        csv("`../../../files/" + selectedFiles[i])
        .then((d) => { //mapeia pra pegar as colunas
          setAuxData((auxData) => [...auxData, d]);
          const options = d.columns.map((column) => {
            return { value: column, label: column };
          });
          setCollums(options);
        })
        .catch((err) => console.log(err));
      }
    }
  }, []);

  useEffect(() => {
    if (auxData.length === selectedFiles.length) {
      const aux = auxData;
      if (aux) {
        aux.map((d) => {
          d["TIMER"] = d["TIMER"] / 1000;
          d["ACCEL_X"] = d["ACCEL_X"] / 1000;
          d["ACCEL_Y"] = d["ACCEL_Y"] / 1000;
          d["ACCEL_Z"] = d["ACCEL_Z"] / 1000;
          d["Intensidade_Frenagem"] = d["Intensidade_Frenagem"] / 10;
          d["Speed_LR"] = d["Speed_LR"] / 10;
          d["Speed_RR"] = d["Speed_RR"] / 10;
          d["Pedal"] = d["Pedal"] / 10;
          d["VOL"] = (d["VOL"] - 1030) / 10;
          return 0;
        });
      }
      setData([...data, [aux]]);
    }
  }, [auxData]);

  useEffect(() => {
    let aux = [];
    data.map((preFile) => {
      preFile.map((files) =>
        files.map((file, i) => {
          aux.push([]);
          file.map((fileData) => {
            if(getExtension(selectedFiles[i]) === "csv"){
              aux[i].push({
                filename: selectedFiles[i],
                x: fileData["time"],
                y: fileData[selectedCollum],
              });
            }
            else{
                aux[i].push({
                  filename: selectedFiles[i],
                  x: fileData["TIMER"],
                  y: fileData[selectedCollum],
                });
            }
          });
        })
      );
    });
    setChartData(aux);
  }, [selectedCollum]);

  return (
    <div className="w-full h-screen">
      <div className="w-11/12 m-auto bg-white  rounded-lg mt-8">
        <div className="p-3 border-b-2">
          <h1 className="text-3xl">Gráficos</h1>
        </div>
        <div className="p-12">
          <div className="block">
            <label className="block">Eixo Y</label>
            <select onChange={(e) => setSelectedCollum(e.target.value)}>
              {columns.map((collum, i) => (
                <option key={i} value={collum.value}>
                  {collum.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            {chartData?.length > 0 && (
              <Chart data={chartData} filename={selectedFiles} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
