
import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import Chart from '../chart';
import { useEffect, useState } from 'react';
import IncomeModal from './IncomeModal';
function getMonthAbbreviation(yearMonthKey) {
  const monthAbbreviation = yearMonthKey.split('-')[1];
  switch (monthAbbreviation) {
    case '01':
      return 'Jan';
    case '02':
      return 'Feb';
    case '03':
      return 'Mar';
    case '04':
      return 'Apr';
    case '05':
      return 'May';
    case '06':
      return 'Jun';
    case '07':
      return 'Jul';
    case '08':
      return 'Aug';
    case '09':
      return 'Sep';
    case '10':
      return 'Oct';
    case '11':
      return 'Nov';
    case '12':
      return 'Dec';
    default:
      return '';
  }
}
export const OverviewSales = (props) => {
  const { sx } = props;
  const [monthlyIncomeData, setMonthlyIncomeData] = useState([]);
  const [monthlyExpenseData, setMonthlyExpenseData] = useState([]);
  const [incomeMonth, setIncomeMonth] = useState ([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const handleColumnClick = (month) => {
    setSelectedMonth(month); // Hangi ayın tıklandığını sakla
    setIsModalOpen(true); // Modal'ı aç
   // console.log("tıkalndı");
  };
  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const token = localStorage.getItem('token');
        const incomeResponse = await fetch('http://localhost:8085/api/auth/income/monthlySummary', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`
          }
        });

        const expenseResponse = await fetch('http://localhost:8085/api/auth/expense/monthlySummary', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`
          }
        });

        if (incomeResponse.ok && expenseResponse.ok) {
          const incomeData = await incomeResponse.json();
          const expenseData = await expenseResponse.json();
          setMonthlyIncomeData(incomeData);
          setMonthlyExpenseData(expenseData);
        } else {
          console.error('Veri çekme başarısız oldu');
        }
      } catch (error) {
        console.error('Veri çekme sırasında bir hata oluştu', error);
      }
    };

    fetchMonthlyData();
  }, []);

  // Verileri işleme ve grafik oluşturma
  const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Gelir ve gider verilerini işleme
  const incomeDataObject = {};
  monthlyIncomeData.forEach((item) => {
    incomeDataObject[getMonthAbbreviation(item.yearMonthKey)] = item.totalIncome;
   // console.log(item.yearMonthKey); 
  });

  const expenseDataObject = {};
  monthlyExpenseData.forEach((item) => {
    expenseDataObject[getMonthAbbreviation(item.yearMonthKey)] = item.totalExpense;
  });

  // Eksik ayları 0 ile doldurma
  allMonths.forEach((month) => {
    if (!incomeDataObject[month]) {
      incomeDataObject[month] = 0;
    }
    if (!expenseDataObject[month]) {
      expenseDataObject[month] = 0;
    }
  });


  const xaxisLabels = allMonths;
  const chartOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: ['#9400FF', 'rgba(142, 36, 170, 0.25)'],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: 'rgba(0, 0, 0, 0.12)',
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        colors: {
          ranges: [
            {
              from: 0,
              to: 0,
              color: '#9400FF'
            },
            {
              from: 1,
              to: 1,
              color: 'rgba(142, 36, 170, 0.25)'
            }
          ]
        }
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    xaxis: {
      axisBorder: {
        color: 'rgba(0, 0, 0, 0.12)',
        show: true
      },
      axisTicks: {
        color: 'rgba(0, 0, 0, 0.12)',
        show: true
      },
      categories: xaxisLabels, // x-axis etiketlerini güncelledik
      labels: {
        offsetY: 5,
        style: {
          colors: 'rgba(0, 0, 0, 0.54)'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}tl` : `${value}`),
        offsetX: -10,
        style: {
          colors: 'rgba(0, 0, 0, 0.54)'
        }
      }
    }
  };


  const incomeSeries = [
    {
      name: 'Gelir',
      data: xaxisLabels.map((month) => incomeDataObject[month])
    },
    {
      name: 'Gider',
      data: xaxisLabels.map((month) => expenseDataObject[month])
    }
  ];
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);

  // Tıklanan veri noktasını işlemek için bir işlev tanımlayın
  const handleDataPointClick = (dataPointIndex) => {
    setSelectedDataPoint(dataPointIndex);
  };

  return (
<div>
<Card sx={sx}>
  <CardHeader
    title="Yıllık Gelir Gider"
  />
  <CardContent>

     
  <Chart
    height={350}
    options={chartOptions}
    series={incomeSeries}
    type="bar"
    width="100%"
    xaxisLabels={xaxisLabels}
   
  />

  </CardContent>
 
  <Divider />
  <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="primary"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          onClick={() =>setIsModalOpen (true)} // Detayı Görüntüle butonu
        >
          Detayı Görüntüle
        </Button>
      </CardActions>
</Card>
<IncomeModal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      
    />

</div>
  );
};

OverviewSales.propTypes = {
  sx: PropTypes.object
};

