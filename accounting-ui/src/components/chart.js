// import React from 'react';
// import ApexCharts from 'react-apexcharts';

// const Chart = ({ options, series }) => {
//   return (
//     <ApexCharts options={options} series={series} type="bar" height={350} />
//   );
// };

// export default Chart;
import React from 'react';
import ApexCharts from 'react-apexcharts';

const Chart = ({ options, series, onColumnClick }) => {
  const handleColumnClick = (event, chartContext, config) => {
    // Bu fonksiyon sütuna tıklandığında çağrılacaktır.
    // config verileri tıklanan sütunun bilgilerini içerecektir.
    // İstediğiniz işlemi burada gerçekleştirebilirsiniz.
    
    if (onColumnClick) {
      onColumnClick(config.dataPointIndex); // Tıklanan sütunun veri noktasını iletebilirsiniz
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
        dataPointSelection: handleColumnClick // Tıklama olayını dinlemek için events özelliğini kullanın
      }}
      
    />
  );
};

export default Chart;
