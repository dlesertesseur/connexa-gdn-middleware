/* eslint-disable react/prop-types */
import { EChart } from "@kbox-labs/react-echarts";
import { Group } from "@mantine/core";

const Chart = ({ chartData }) => {
  const calculateSprintsValues = (sprints) => {

    const ret = [];
    let totalProcess = 0;

    sprints.forEach(s => {
      ret.push({ value: s.TotalProcess, name: s.Name })
      totalProcess += s.TotalProcess;
    });

    ret.push({
      // make an record to fill the bottom 50%
      value: totalProcess,
      itemStyle: {
        // stop the chart from rendering this piece
        color: "none",
        decal: {
          symbol: "none",
        },
      },
      label: {
        show: false,
      },
    })

    return(ret);
  };


  return (
    <Group w={"100%"} h={"100%"}>
      <EChart
        style={{
          height: "100%",
          width: "100%",
        }}
        title={[
          {
            text: chartData.Name,
            textAlign: "center",
            subtext: "",
            left: "48%",
            top: "32%",
            textStyle: {
              fontSize: 32,
              color: "#1f618d",
            },
            subtextStyle: {
              fontSize: 56,
              color: "#1f618d",
            },
          },
          {
            text: `${(chartData.TotalAmount / 1000000).toFixed(1)} M`,
            textAlign: "center",
            subtext: "DOLLARS",
            left: "40%",
            top: "60%",
            textStyle: {
              fontSize: 30,
              color: "#3498db",
              textBorderType: [5, 10],
              textBorderDashOffset: 5,
            },
            subtextStyle: {
              fontSize: 16,
              color: "#3498db",
            },
          },
          {
            text: `${(chartData.TotalUnits / 1000).toFixed(1)} K`,
            subtext: "UNITS",
            textAlign: "center",
            left: "56%",
            top: "60%",
            textStyle: {
              fontSize: 30,
              color: "#3498db",
              textBorderType: [5, 10],
              textBorderDashOffset: 5,
            },
            subtextStyle: {
              fontSize: 16,
              color: "#3498db",
            },
          },
        ]}
        series={[
          {
            name: "Access From",
            type: "pie",
            radius: ["70%", "80%"],
            center: ["50%", "50%"],
            // adjust the start angle
            startAngle: 230,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: true,
              formatter(param) {
                // correct the percentage
                return param.name + " (" + param.percent * 2 + "%)";
              },
            },
            data: calculateSprintsValues(chartData.Sprints),
          },
          {
            name: "Access From",
            type: "pie",
            radius: ["64%", "68%"],
            center: ["50%", "50%"],
            // adjust the start angle
            startAngle: 90,
            endAngle: 120,
            itemStyle: {
              borderRadius: 0,
            },
            label: {
              show: true,
              formatter(param) {
                // correct the percentage
                return param.name + " (" + param.percent * 2 + "%)";
              },
            },
            data: [
              {
                value: `${chartData.TotalProcessOnTimePorcen}`,
                name: "On Time",
                itemStyle: { color: "#2ecc71", borderColor: "#16a085", borderWidth: 2 },
              },
              {
                value: `${chartData.TotalProcessLatePorcen}`,
                name: "Late",
                itemStyle: { color: "#e74c3c", borderColor: "#c0392b", borderWidth: 2 },
              },
              {
                // make an record to fill the bottom 50%
                value: 200,
                itemStyle: {
                  // stop the chart from rendering this piece
                  color: "none",
                  decal: {
                    symbol: "none",
                  },
                },
                label: {
                  show: false,
                },
              },
            ],
          },
        ]}
        tooltip={{
          trigger: "item",
        }}
      />
    </Group>
  );
};

export default Chart;
