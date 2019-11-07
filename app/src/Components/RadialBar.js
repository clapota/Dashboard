import React from 'react';
import ReactApexChart from 'react-apexcharts';

class RadialChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        options: {
          chart: {
            toolbar: {
              show: true
            }
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 225,
              hollow: {
                margin: 0,
                size: '70%',
                background: '#fff',
                position: 'front',
                dropShadow: {
                  enabled: true,
                  top: 3,
                  left: 0,
                  blur: 4,
                  opacity: 0.24
                }
              },
              track: {
                background: '#fff',
                strokeWidth: '67%',
                margin: 0,
                dropShadow: {
                  enabled: true,
                  top: -3,
                  left: 0,
                  blur: 4,
                  opacity: 0.35
                }
              },

              dataLabels: {
                name: {
                  offsetY: -10,
                  show: true,
                  color: '#888',
                  fontSize: '17px'
                },
                value: {
                  formatter: function (val) {
                    return parseInt(val);
                  },
                  color: '#111',
                  fontSize: '36px',
                  show: true,
                }
              }
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'horizontal',
              shadeIntensity: 0.5,
              gradientToColors: ['#ABE5A1'],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 150]
            }
          },
          stroke: {
            lineCap: 'round'
          },
          labels: ['Degree ' + this.props.unit + ' in ' + this.props.city],
        },
        series: [this.props.degree],
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.degree !== prevProps.degree) {
        this.setState({series: [this.props.degree]});
      }
      if (this.props.unit !== prevProps.unit || this.props.city !== prevProps.city) {
        this.setState({options: {
          ...this.state.options,
          labels: ['Degree ' + this.props.unit + ' in ' + this.props.city]
          }
        });
      }
    }

    render() {
      return (
        <div id="card">
          <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height="350" />
          </div>
        </div>
      );  
    }
}

export default RadialChart;