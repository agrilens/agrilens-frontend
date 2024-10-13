import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const HeatMap = ({ data, title }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);
      svg.selectAll("*").remove();

      const margin = { top: 50, right: 30, bottom: 50, left: 50 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.x))
        .padding(0.01);

      const y = d3
        .scaleBand()
        .range([height, 0])
        .domain(data.map((d) => d.y))
        .padding(0.01);

      const colorScale = d3
        .scaleSequential()
        .interpolator(d3.interpolateInferno)
        .domain([0, d3.max(data, (d) => d.value)]);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      g.selectAll()
        .data(data, (d) => `${d.x}:${d.y}`)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.x))
        .attr("y", (d) => y(d.y))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", (d) => colorScale(d.value));

      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      g.append("g").call(d3.axisLeft(y));

      svg
        .append("text")
        .attr("x", width / 2 + margin.left)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(title);

      const legend = svg
        .append("g")
        .attr("class", "legend")
        .attr(
          "transform",
          `translate(${width + margin.left + 10}, ${margin.top})`
        );

      const legendScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
        .range([height, 0]);

      const legendAxis = d3.axisRight(legendScale).ticks(5);

      legend.append("g").call(legendAxis);

      const legendGradient = legend
        .append("defs")
        .append("linearGradient")
        .attr("id", "legend-gradient")
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "0%")
        .attr("y2", "0%");

      legendGradient
        .selectAll("stop")
        .data(
          colorScale.ticks().map((t, i, n) => ({
            offset: `${(100 * i) / n.length}%`,
            color: colorScale(t),
          }))
        )
        .enter()
        .append("stop")
        .attr("offset", (d) => d.offset)
        .attr("stop-color", (d) => d.color);

      legend
        .append("rect")
        .attr("width", 20)
        .attr("height", height)
        .style("fill", "url(#legend-gradient)");
    }
  }, [data, title]);

  return (
    <div className="heatmap-container">
      <svg
        className="d3-component"
        width={600}
        height={400}
        ref={d3Container}
      />
    </div>
  );
};

export default HeatMap;
