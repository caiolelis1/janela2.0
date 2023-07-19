import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export const Chart = (props) => {
  const { data, filename } = props;
  const svgRef = useRef();

  console.log(data);

  var colors = ["blue", "red", "green"];

  useEffect(() => {
    //setting up svg

    const w = 1600;
    const h = 300;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("margin-top", "50")
      .style("margin-left", "50")
      .style("overflow", "visible");

    //setting the scaling
    const xScale = d3.scaleLinear().domain([0, 100000]).range([0, w]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (series) => d3.max(series, (d) => d.y))])
      .range([h, 0]);

    //setting the axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis);

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));
    //setting up the data for the svg

    svg
      .selectAll(".line")
      .data(data)
      .enter()
      .append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", (d, i) => colors[i])
      .attr("stroke-width", 2)
      .attr("d", line);
  }, [data]);

  return (
    <div className="mt-5">
      <div className="flex gap-x-5 items-center justify-center">
        {filename.map((file, i) => (
          <div key={i} className="flex items-center justify-center">
            <div className="w-8 h-4" style={{ backgroundColor: colors[i] }} />
            <h1 className="ml-3">{file}</h1>
          </div>
        ))}
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
};
