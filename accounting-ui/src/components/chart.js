
import React from 'react';
import ApexCharts from 'react-apexcharts';

const Chart = ({ options, series, onColumnClick }) => {
  const handleColumnClick = (event, chartContext, config) => {

    
    if (onColumnClick) {
      onColumnClick(config.dataPointIndex); 
    }
     console.log(config.dataPointIndex);
  };

  return (
    <ApexCharts 
      options={options} 
      series={series} 
      type="bar" 
      height={350} 
      events={{
        dataPointSelection: handleColumnClick 
      }}
      
    />
  );
};

export default Chart;
