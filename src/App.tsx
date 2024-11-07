import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import AllMembers from './pages/Members/AllMembers';
import AddMember from './pages/Members/AddMember';
import Memberships from './components/Tables/Memeberships';
import AllMemberships from './pages/Memberships/AllMemberships';
import AddMembership from './pages/Memberships/AddMembership';
import AllPayments from './pages/Payments/AllPayments';
import AddPayment from './pages/Payments/AddPayment';
import AllExpense from './pages/Expenses/AllExpenses';
import AddExpense from './pages/Expenses/AddExpense';
import Report from './pages/Report/Report';
import CalendarComponent from './pages/Calendar/Calendar';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {/* Routes outside DefaultLayout */}
        <Route
          index
          element={
            <>
              <PageTitle title="Signin | FFG - More than a Gym" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | FFG - More than a Gym" />
              <SignUp />
            </>
          }
        />
 
        <Route  >
          <Route
            path="/dashboard/view"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Dashboard | FFG - More than a Gym" />
                <Dashboard />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Dashboard | FFG - More than a Gym" />
                <Dashboard />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/member/view"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Member | All Members" />
                <AllMembers />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/member/add"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Member | Add a new Member" />
                <AddMember />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/membership/view"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Membership | All Memberships" />
                <AllMemberships />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/membership/add"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Membership | Add a new Membership" />
                <AddMembership />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/payment/view"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Payment | All Payments" />
                <AllPayments />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/payment/add"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Payment | Add a new Payment" />
                <AddPayment />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/expense/view"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Expense | All Expenses" />
                <AllExpense />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/expense/add"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Expense | Add a new Expense" />
                <AddExpense />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/report/view"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Report | FFG - More than a Gym" />
                <Report />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/attendance"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Calendar | FFG - More than a Gym" />
                <CalendarComponent />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Profile | FFG - More than a Gym" />
                <Profile />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Form Elements | FFG - More than a Gym" />
                <FormElements />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Form Layout | FFG - More than a Gym" />
                <FormLayout />
                </DefaultLayout>
              
              </>
            }
          />
          <Route
            path="/tables"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Tables | FFG - More than a Gym" />
                <Tables />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Settings | FFG - More than a Gym" />
                <Settings />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/chart"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Basic Chart | FFG - More than a Gym" />
                <Chart />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
              <DefaultLayout>

                <PageTitle title="Alerts | FFG - More than a Gym" />
                <Alerts />
              </DefaultLayout>

              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
              <DefaultLayout>
                <PageTitle title="Buttons | FFG - More than a Gym" />
                <Buttons />
                </DefaultLayout>
              </>
            }
            />
        </Route>
      </Routes>
    </>
  );
}

export default App;
