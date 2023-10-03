import React, { useRef, useEffect } from 'react';
import ReactApexChart from "react-apexcharts";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
    this.chartRef = React.createRef();
  }



  componentDidMount() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
    });
  }


  updateData(timeline) {
    this.setState({
      selection: timeline
    })
    switch (timeline) {
      case 'ytd':
        console.log(this.chartRef.current.chart);
        // this.chartRef.current.chart.exec(
        //   'area-datetime',
        //   'zoomX',
        //   new Date('01 Jan 2013').getTime(),
        //   new Date('27 Feb 2013').getTime()
        // )
        this.chartRef.current.chart.zoomX(
          new Date('01 Jan 2013').getTime(),
          new Date('27 Feb 2013').getTime()
        )
        break
      default:
    }
  }

  render() {
    return (
      <>
        <button id="ytd"

          onClick={() => this.updateData('ytd')} className={(this.state.selection === 'ytd' ? 'active' : '')}>
          YTD
        </button>
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type='area'
          width='100%'
          height='100%'
          ref={this.chartRef}
        />
      </>
    );
  }
}

export default LineChart;
