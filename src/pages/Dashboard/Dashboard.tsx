import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard'; 
import TableOne from '../../components/Tables/TableOne';
import { Expense, Income, Members, Payments } from '../../../constants/icons';
import RevenueChart from '../../components/RevenueChart/RevenueChart';
import UserChart from '../../components/UserChart/UserChart'; 
import { fetchDashboardTotalMembers } from '../../services/dashboard.services';
import LoaderComp from '../../components/Loader/Loader';

const ECommerce: React.FC = () => {
  const [totalMembers,setTotalMembers] = React.useState<number>(0)
  const [totalExpense,setTotalExpense] = React.useState<number>(0)
  const [totalRevenue,setTotalRevenue] = React.useState<number>(0)
  const [loading,setLoading] = React.useState<boolean>(false)
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data:{totalIncomeExpenseResponseData: {
       
            total_revenue: number;
            total_expenses: number; 
    },totalMemberResponseData:number,error?:string} = await fetchDashboardTotalMembers();
      setLoading(false)
      if (!data.error) {
        console.log(data)
        setTotalExpense(data.totalIncomeExpenseResponseData.total_expenses)
        setTotalRevenue(data.totalIncomeExpenseResponseData.total_revenue)
        setTotalMembers(data.totalMemberResponseData)
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <h1 className='col-span-1 md:col-span-2  xl:col-span-4'>Members</h1>
        {loading?<LoaderComp/>:<>
          <CardDataStats title="Members" total={String(totalMembers)} rate="0.43%" levelUp>
        <Members/>
        </CardDataStats></>}
      
        
       
        
{loading?<LoaderComp/>:
<>
<CardDataStats title="Memberships" total="4" rate="2.59%" levelUp>
        <Members/>

        </CardDataStats></>} 
        {loading?<LoaderComp />
        
        :<>
       <CardDataStats title="Total Revenue" total={`${String(totalRevenue)}`} rate="0.95%" levelUp>
          <Income/>
        </CardDataStats>
        </>}
        {loading?<LoaderComp />
          
          :<>
          <CardDataStats title="Total Expense" total={`${String(totalExpense)}`} rate="0.95%" levelUp>
          <Expense/>
        </CardDataStats>
          </>}
        
       
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne /> */}
        <RevenueChart/>
        {/* <ChartTwo /> */}
        <UserChart /> 
        {/* <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>  */}
      </div>
    </>
  );
};

export default ECommerce;
