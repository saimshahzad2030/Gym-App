 
import React, { useState } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { setLocale } from 'yup';
import { fetchDashboardMonthlyIncomeExpense } from '../../services/dashboard.services';

// const options: ApexOptions = {
//   legend: {
//     show: false,
//     position: 'top',
//     horizontalAlign: 'left',
//   },
//   colors: ['#3C50E0', '#80CAEE'],
//   chart: {
//     fontFamily: 'Satoshi, sans-serif',
//     height: 335,
//     type: 'area',
//     dropShadow: {
//       enabled: true,
//       color: '#623CEA14',
//       top: 10,
//       blur: 4,
//       left: 0,
//       opacity: 0.1,
//     },

//     toolbar: {
//       show: false,
//     },
//   },
//   responsive: [
//     {
//       breakpoint: 1024,
//       options: {
//         chart: {
//           height: 300,
//         },
//       },
//     },
//     {
//       breakpoint: 1366,
//       options: {
//         chart: {
//           height: 350,
//         },
//       },
//     },
//   ],
//   stroke: {
//     width: [2, 2],
//     curve: 'straight',
//   },
//   // labels: {
//   //   show: false,
//   //   position: "top",
//   // },
//   grid: {
//     xaxis: {
//       lines: {
//         show: true,
//       },
//     },
//     yaxis: {
//       lines: {
//         show: true,
//       },
//     },
//   },
//   dataLabels: {
//     enabled: false,
//   },
//   markers: {
//     size: 4,
//     colors: '#fff',
//     strokeColors: ['#3056D3', '#80CAEE'],
//     strokeWidth: 3,
//     strokeOpacity: 0.9,
//     strokeDashArray: 0,
//     fillOpacity: 1,
//     discrete: [],
//     hover: {
//       size: undefined,
//       sizeOffset: 5,
//     },
//   },
//   xaxis: {
//     type: 'category',
//     categories: [
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//     ],
//     axisBorder: {
//       show: false,
//     },
//     axisTicks: {
//       show: false,
//     },
//   },
//   yaxis: {
//     title: {
//       style: {
//         fontSize: '0px',
//       },
//     },
//     min: 0,
//     max: 20000,
//   },
// };
interface Data {

  year: string,
  total_revenue: number | null,
  total_expenses: number | null,
  profit: null

}
interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const RevenueChart: React.FC = () => {

  const [loading,setLoading] = React.useState(false)
  const [categories, setCategories] = useState<string[]>([])
  // const [state, setState] = useState<ChartOneState>({
  //   series: [
  //     {
  //       name: 'Product One',
  //       data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
  //     },

  //     {
  //       name: 'Product Two',
  //       data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
  //     },
  //   ],
  // });
  const [date, setDate] = useState<{start:string,end:string}>({start:'',end:''})
  
    const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Income',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
      },

      {
        name: 'Expense',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
      },
    ],
  });
  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;
 
  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: categories, // Use dynamic categories here
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
      max: 20000,
    },
  };
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data:{data:Data[],error?:string,status:number} = await fetchDashboardMonthlyIncomeExpense();
      setLoading(false)
      if (!data.error) {
        // console.log(data.data)
        let total_revenue = data.data.map((das)=>{
          return  das.total_revenue || 0

          // return [{name:'Income',data:das.total_revenue == null?0:das.total_revenue},{name:'Expense',data:das.total_expenses == null?0:das.total_expenses}]
        })
        let total_expenses = data.data.map((das)=>{
          return  das.total_expenses || 0

          // return [{name:'Income',data:das.total_revenue == null?0:das.total_revenue},{name:'Expense',data:das.total_expenses == null?0:das.total_expenses}]
        })
        const formattedCategories = data.data.map((item) => {
          const date = new Date(item.year); 
          return date.toLocaleString("en-US", { month: "short", year: "numeric" }); // e.g., "Oct 2024"
        });
        
        setState({series:[{name:'Income',data: total_revenue},{name:'Expense',data: total_expenses}]
          
        })
        setDate({
          start: data.data[0].year,
          end: data.data[data.data.length - 1].year,
        });
        setCategories(formattedCategories); // Update categories dynamically

      }
    };
    fetchData();
  }, []);
   
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Revenue</p>
              <p className="text-sm font-medium">{`${date.start} - ${date.end}`}</p>

            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Expenses</p>
              <p className="text-sm font-medium">{`${date.start} - ${date.end}`}</p>
            </div>
          </div>
        </div>
        {/* <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div> */}
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
