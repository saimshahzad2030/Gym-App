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

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <h1 className='col-span-1 md:col-span-2  xl:col-span-4'>Members</h1>
        <CardDataStats title="Members" total="1800" rate="0.43%" levelUp>
        <Members/>
        </CardDataStats>
        <CardDataStats title="Active" total="1200" rate="4.35%" levelUp>
        <Members/>

        </CardDataStats>
        <CardDataStats title="Left" total="600" rate="2.59%" levelUp>
        <Members/>

        </CardDataStats>
        <h1 className='col-span-1 md:col-span-2  xl:col-span-4'>Report</h1>

        <CardDataStats title="Total Revenue" total="3.456" rate="0.95%" levelUp>
          <Income/>
        </CardDataStats>
        <CardDataStats title="Total Expense" total="3.456" rate="0.95%" levelUp>
          <Expense/>
        </CardDataStats>
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
