import React, { Component } from "react";
const d3 = require("d3");

const margin = { top: 20, right: 0, bottom: 30, left: 40 };
let height = window.innerHeight / 2.8;
let width = window.innerWidth / 2.33;

class BarChart extends Component {
  state = {
    data: []
  };

  formatData = data => {
    this.y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    this.x = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    this.yAxis = g =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(this.y))
        .call(g => g.select(".domain").remove());

    this.xAxis = g =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(this.x).tickSizeOuter(0));
  };

  componentDidMount() {
    this.setState({ data: this.props.data });
    this.formatData(this.props.data);
    d3.select(this.refs.xAxis)
      .call(this.xAxis)
      .selectAll("text");
      //.attr("transform", "rotate(-45)");
    d3.select(this.refs.yAxis).call(this.yAxis);
  }

  render() {
    const { data } = this.state;
    return (
      <svg
        className="svg-barchart"
        id="svg-barchart"
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <rect width="100%" height="100%" fill="white" />
        {data.map(rect => {
          return (
            <rect
              key={rect.name}
              fill={"#A100FF"}
              x={this.x(rect.name)}
              y={this.y(rect.value)}
              height={this.y(0) - this.y(rect.value)}
              width={this.x.bandwidth()}
            >
              <title>{rect.name}</title>
            </rect>
          );
        })}
        <g>
          <g ref="xAxis" />
          <g ref="yAxis" />
        </g>
      </svg>
    );
  }
}

export default BarChart;
