import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import axios from 'axios';
import { useTheme } from '@mui/material';
import useUsers from '@/api/useUsers';
import useCourses from './api/useCourses';
import { getOrders } from '@/api/OrderApi'; // Import API function

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartData {
  day: string;
  value: number;
}

// interface Revenue {
//   thisMonth: number;
//   totalRevenue: number;
// }

interface Order {
  _id: object;
  user_id: object;
  course_id: object;
  payment_method: string;
  amount: number;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { rows: users } = useUsers();
  const { courses } = useCourses();
  const [chartData] = useState<ChartData[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [dailyRevenue, setDailyRevenue] = useState<number>(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  // const [revenue, setRevenue] = useState<Revenue>({
  //   thisMonth: 0,
  //   totalRevenue: 0,
  // });

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const [chartResponse] = await Promise.all([
  //         // axios.get('http://localhost:3000/chartData'),
  //         // axios.get('http://localhost:3000/revenue'),
  //       ]);

  //       setChartData(chartResponse.data);
  //       // setRevenue(revenueResponse.data);
  //     } catch (error) {
  //       console.error('Error fetching dashboard data:', error);
  //     }
  //   };
  //   fetchDashboardData();
  // }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error: any) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    calculateRevenues();
  }, [orders, selectedDate, selectedMonth, selectedYear]);

  const calculateRevenues = () => {
    const monthlyOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() === selectedMonth && orderDate.getFullYear() === selectedYear;
    });

    const dailyOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getDate() === selectedDate.getDate() &&
        orderDate.getMonth() === selectedDate.getMonth() &&
        orderDate.getFullYear() === selectedDate.getFullYear()
      );
    });
    const total = orders.reduce((acc, order) => {
      const amount = typeof order.amount === 'number' && !isNaN(order.amount) ? order.amount : 0;
      return acc + amount;
    }, 0);

    const monthly = monthlyOrders.reduce((acc, order) => acc + order.amount, 0);
    const daily = dailyOrders.reduce((acc, order) => acc + order.amount, 0);

    setTotalRevenue(total);
    setMonthlyRevenue(monthly);
    setDailyRevenue(daily);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(event.target.value));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const data = {
    labels: chartData.map((item) => item.day),
    datasets: [
      {
        label: 'Doanh số',
        data: chartData.map((item) => item.value),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const top10Courses = [...courses].sort((a, b) => b.enrollment_count - a.enrollment_count).slice(0, 10);

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="tw-container tw-mx-auto tw-px-4">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <h1 className="tw-text-xl tw-font-semibold">Bảng điều khiển</h1>
        <button style={{ background: theme.palette.background.default }} className="tw-py-2 tw-px-4">
          Bảng điều khiển
        </button>
      </div>

      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-3">
        <div className="md:tw-col-span-3">
          <div className="tw-p-5" style={{ background: theme.palette.background.default }}>
            <div>
              <h2 className="tw-text-lg tw-font-semibold">Số tiền</h2>

              <div className="mb-2">
                <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i}>
                      {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>

                <label htmlFor="year" className="ml-4 mr-2">
                  Năm:
                </label>
                <select id="year" value={selectedYear} onChange={handleYearChange}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <option key={i} value={new Date().getFullYear() - i}>
                      {new Date().getFullYear() - i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Bar data={data} options={options} />
          </div>

          <div
            style={{ background: theme.palette.background.default }}
            className="tw-h-20 tw-flex tw-justify-between tw-mt-4 tw-p-4 tw-shadow-md"
          >
            <div>
              <p className="tw-text-xs md:tw-text-base tw-mb-1">Tải xuống báo cáo thống kê thu nhập của bạn</p>
              <p className="tw-text-[10px] md:tw-text-xs">Thống kê tài chính khóa học</p>
            </div>
            <button className="tw-bg-violet-500 tw-text-white tw-py-2 tw-px-4">Tải xuống</button>
          </div>
        </div>

        {/* Users Section */}
        <div style={{ background: theme.palette.background.default }} className="tw-shadow-md tw-relative">
          <div className="tw-flex tw-justify-between tw-px-4">
            <h3 className="tw-text-lg tw-font-semibold">Học viên</h3>
            <p className="tw-mt-6 tw-text-xs tw-text-gray-400">Xem thêm</p>
          </div>
          <div className="tw-text-[90px] tw-text-white tw-bg-violet-500 tw-rounded-full tw-h-[200px] tw-w-[200px] tw-flex tw-items-center tw-justify-center tw-mx-auto tw-my-10">
            {users.length}
          </div>
          <div className="tw-bg-black tw-text-white tw-h-[25%] tw-w-[100%] lg:tw-absolute tw-bottom-0 tw-p-4">
            <div className="md:tw-mt-3">
              <p className="tw-text-[#AAC8C6] tw-font-medium tw-text-lg tw-mb-2">
                Doanh thu tháng {new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'numeric' })}
              </p>
              <p className="tw-font-semibold tw-text-3xl">{monthlyRevenue.toLocaleString('vi-VN')} VNĐ</p>
              <p className="tw-text-green-600">Tổng doanh thu trong cả một tháng</p>
            </div>
          </div>
        </div>
        <div className=" md:tw-col-span-4 ">
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3">
            <div className="md:tw-col-span-3 ">
              <div className="tw-mb-3 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3  ">
                <div style={{ background: theme.palette.background.default }} className=" tw-px-4 tw-shadow-md ">
                  <div className="tw-flex tw-justify-between">
                    <h3 className="tw-text-base tw-font-semibold">Doanh thu ngày:</h3>
                    <div className="tw-mt-5">
                      <input
                        id="date"
                        type="date"
                        value={selectedDate.toISOString().split('T')[0]}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>
                  <p className="tw-text-4xl tw-pb-10 tw-mt-5 tw-text-center tw-font-bold">
                    {dailyRevenue.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
                <div style={{ background: theme.palette.background.default }} className=" tw-px-4 tw-shadow-md  ">
                  <h3 className="tw-text-base tw-font-semibold">Tổng danh thu:</h3>
                  <p className="tw-text-5xl tw-mt-8 tw-pb-10 tw-text-center tw-font-bold">
                    {totalRevenue.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Courses */}
        <div style={{ background: theme.palette.background.default }} className="md:tw-col-span-2 tw-shadow-md">
          <div className="tw-flex tw-justify-between tw-px-4">
            <h3 className="tw-text-lg tw-font-semibold">Khoá học yêu thích</h3>
            <p className="tw-mt-6 tw-text-xs tw-text-gray-400">Xem thêm</p>
          </div>
          <table className="tw-w-full">
            <thead>
              <tr>
                <th className="tw-px-4 tw-py-2">STT</th>
                <th className="tw-px-4 tw-py-2">Ảnh</th>
                <th className="tw-px-4 tw-py-2">Tên khoá học</th>
                <th className="tw-px-4 tw-py-2">Lượt đăng ký</th>
              </tr>
            </thead>
            <tbody>
              {top10Courses.map((course, index) => (
                <tr key={course._id} className="tw-border-b">
                  <td className="tw-px-4 tw-py-2">{index + 1}</td>
                  <td className="tw-px-4 tw-py-2">
                    <img src={course.thumbnail} alt="Course" className="tw-w-10 tw-h-7" />
                  </td>
                  <td className="tw-px-4 tw-py-2">{course.title}</td>
                  <td className="tw-px-4 tw-py-2">{course.enrollment_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{ background: theme.palette.background.default }}
          className="tw-shadow-md tw-overflow-hidden md:tw-col-span-2"
        >
          <div className="tw-flex tw-justify-between tw-px-4">
            <h3 className="tw-text-lg tw-font-semibold">Chiến thần chi tiêu</h3>
            <p className="tw-mt-6 tw-text-xs tw-text-gray-400">Xem thêm</p>
          </div>
          <table className="tw-w-full">
            <thead>
              <tr>
                <th className="tw-px-4 tw-py-2">STT</th>
                <th className="tw-px-4 tw-py-2">Tên học viên</th>
                <th className="tw-px-4 tw-py-2">Số tiền chi tiêu</th>
              </tr>
            </thead>
            <tbody>
              {users
                .map((user) => {
                  // Lọc các đơn hàng của mỗi học viên
                  const userOrders = orders.filter((order) => String(order.user_id) === String(user._id));

                  // Tính tổng chi tiêu của học viên
                  const totalSpent = userOrders.reduce((sum, order) => {
                    const amount = typeof order.amount === 'number' && !isNaN(order.amount) ? order.amount : 0;
                    return sum + amount;
                  }, 0);

                  // Trả về user cùng với tổng chi tiêu
                  return { ...user, totalSpent };
                })
                .sort((a, b) => b.totalSpent - a.totalSpent) // Sort the users by totalSpent in descending order
                .slice(0, 10) // Limit to top 10 users with highest totalSpent
                .map((user, index) => (
                  <tr key={user._id} className="tw-border-b">
                    {' '}
                    {/* Unique key here */}
                    <td className="tw-px-4 tw-py-2">{index + 1}</td>
                    <td className="tw-px-4 tw-py-2">{user.name}</td>
                    <td className="tw-px-4 tw-py-2">{user.totalSpent.toLocaleString('vi-VN')} VNĐ</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
