import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import { useTheme } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  day: string;
  value: number;
}

interface Student {
  id: number;
  name: string;
  email: string;
  top: string;
}

interface Revenue {
  thisMonth: number;
  totalRevenue: number;
}

interface Courses {
  id: number;
  title: string;
  image: string;
  sale: number;
}

interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: number;
}

const Dashboard: React.FC = () => {
  const theme = useTheme();

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [revenue, setRevenue] = useState<Revenue>({
    thisMonth: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    axios.get('http://localhost:3000/chartData').then((response) => {
      setChartData(response.data);
    });
    axios.get('http://localhost:3000/transactions').then((response) => {
      setTransactions(response.data);
    });
    axios.get('http://localhost:3000/students').then((response) => {
      setStudents(response.data);
    });
    axios.get('http://localhost:3000/revenue').then((response) => {
      setRevenue(response.data);
    });
    axios.get('http://localhost:3000/courses').then((response) => {
      setCourses(response.data);
    });
  }, []);

  const data = {
    labels: chartData.map((item) => item.day),
    datasets: [
      {
        label: 'Số lượt hiển thị',
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

  const top10Courses = courses.sort((a, b) => b.sale - a.sale).slice(0, 10);
  const top10sSudents = students.sort((a, b) => b.top - a.top).slice(0, 10);

  return (
    <div className="tw-container tw-mx-auto tw-px-4">
      {/* Header */}
      <div className="tw-flex  tw-justify-between tw-items-center tw-mb-4">
        <h1 className="tw-text-xl tw-font-semibold">Bảng điều khiển</h1>
        <button
          style={{ background: theme.palette.background.default }}
          className=" tw-py-2 tw-px-4"
        >
          Bảng điều khiển
        </button>
      </div>

      {/* Main Grid */}
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-3">
        {/* Revenue Bar Chart */}
        <div className="md:tw-col-span-3 ">
          <div
            className="tw-p-5"
            style={{ background: theme.palette.background.default }}
          >
            <h2 className="tw-text-lg tw-font-semibold  ">Số tiền</h2>
            <Bar data={data} options={options} />
          </div>
          <div
            style={{ background: theme.palette.background.default }}
            className="tw-h-20 tw-flex tw-justify-between  tw-mt-4  tw-p-4  tw-shadow-md"
          >
            <div>
              <p className=" tw-text-xs md:tw-text-base tw-mb-1">
                Tải xuống báo các thông kê thu nhập của bạn
              </p>
              <p className="tw-text-[10px] cmd:tw-text-xs">Thống kê tài chính khóa học</p>
            </div>
            <button className=" tw-bg-violet-500 tw-text-white tw-py-2 tw-px-4">
              Tải xuống
            </button>
          </div>
        </div>

        {/* Student Count */}
        <div
          style={{ background: theme.palette.background.default }}
          className="  tw-shadow-md  tw-relative"
        >
          <div className="tw-flex tw-justify-between tw-px-4">
            <h3 className="tw-text-lg tw-font-semibold">Học viên</h3>
            <p className="tw-mt-6 tw-text-xs tw-text-gray-400">Xem thêm</p>
          </div>
          <div className="tw-text-[90px] tw-text-white tw-bg-violet-500 tw-rounded-full tw-h-[200px] tw-w-[200px] tw-flex tw-items-center tw-justify-center tw-mx-auto tw-my-10">
            {students.length}
          </div>
          <div className="tw-bg-black tw-text-white tw-h-[25%] tw-w-[100%]  lg:tw-absolute tw-bottom-0 tw-p-5">
            <p className="tw-text-[#AAC8C6] tw-font-medium tw-text-lg tw-mb-2">
              Doanh thu tháng này{' '}
            </p>
            <p className="tw-font-semibold tw-text-2xl">
              {revenue.thisMonth.toLocaleString()} VND
            </p>
            <p className=" tw-text-[13px] tw-mb-3 tw-text-[#AAC8C6]">
              <span className="tw-text-green-500">10%</span> so với tháng trước
            </p>
          </div>
        </div>

        <div className="tw-mt-3 md:tw-col-span-4 ">
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-5 tw-gap-3">
            <div
              style={{ background: theme.palette.background.default }}
              className="md:tw-col-span-2 tw-px-4 tw-shadow-md"
            >
              <div className="tw-flex tw-justify-between">
                <h3 className="tw-text-lg tw-font-semibold">
                  Lịch sử giao dịch
                </h3>
                <p className="tw-mt-6 tw-text-xs tw-text-gray-400">Xem thêm</p>
              </div>
              <ul>
                {transactions
                  .slice(-6)
                  .reverse()
                  .map((transaction) => (
                    <li
                      key={transaction.id}
                      className="tw-flex tw-justify-between tw-items-center tw-border-b tw-py-2"
                    >
                      <div className="tw-flex tw-items-center">
                        <img
                          src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-success-icon-png-image_4165492.jpg"
                          alt="icon"
                          className="tw-w-8 tw-h-8 tw-mr-3"
                        />
                        <div>
                          <p className="tw-font-medium">{transaction.name}</p>
                          <p className="tw-text-sm tw-text-gray-500">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="tw-text-green-600 tw-font-semibold">
                        + {transaction.amount.toLocaleString()} VND
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="md:tw-col-span-3 tw-min-h-[450px]">
              <div className="tw-mb-3 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3  ">
                <div
                  style={{ background: theme.palette.background.default }}
                  className=" tw-px-4 tw-shadow-md "
                >
                  <h3 className="tw-text-base tw-font-semibold">Doanh thu hôm nay</h3>
                  <p className="tw-text-2xl tw-pb-0 tw-text-center tw-font-bold">
                    {revenue.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div
                  style={{ background: theme.palette.background.default }}
                  className=" tw-px-4 tw-shadow-md  "
                >
                  <h3 className="tw-text-base tw-font-semibold">Khoá học đã bán hôm nay</h3>
                  <p className="tw-text-2xl tw-pb-10 tw-text-center tw-font-bold">
                   10
                  </p>
                </div>
              </div>
              {/* Student Management */}
              <div
                style={{ background: theme.palette.background.default }}
                className="tw-shadow-md tw-overflow-hidden tw-h-[350px]"
              >
                <div className="tw-flex tw-justify-between tw-px-4">
                  <h3 className="tw-text-base tw-font-semibold">
                    Quản trị viên
                  </h3>
                  <p className="tw-mt-6 tw-text-xs tw-text-gray-400">
                    Xem thêm
                  </p>
                </div>
                <div>
                  <table className="tw-w-full ">
                    <thead>
                      <tr
                        style={{ background: theme.palette.background.default }}
                      >
                        <th className="tw-px-4 tw-py-2 tw-text-left">STT</th>
                        <th className="tw-px-4 tw-py-2 tw-text-left">
                          Họ và tên
                        </th>
                        <th className="tw-px-4 tw-py-2 tw-text-left">Email</th>
                        <th className="tw-px-4 tw-py-2 tw-text-left">
                          Cấp quyền
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {students
                        .slice(-6)
                        .reverse()
                        .map((student, index) => (
                          <tr key={student.id} className="">
                            <td className="tw-px-4 tw-py-2">{index + 1}</td>
                            <td className="tw-px-4 tw-py-2">{student.name}</td>
                            <td className="tw-px-4 tw-py-2">{student.email}</td>
                            <td className="tw-px-4 tw-py-2">admin</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Management */}

        <div
          style={{ background: theme.palette.background.default }}
          className="md:tw-col-span-2  tw-shadow-md  tw-overflow-hidden"
        >
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
                <tr key={course.id} className="tw-border-b">
                  <td className="tw-px-4 tw-py-2">{index + 1}</td>
                  <td className="tw-px-4 tw-py-2">
                    <img
                      src={course.image}
                      alt="Course"
                      className="tw-w-10 tw-h-7"
                    />
                  </td>
                  <td className="tw-px-4 tw-py-2">{course.title}</td>
                  <td className="tw-px-4 tw-py-2">{course.sale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Teams */}
        <div
          style={{ background: theme.palette.background.default }}
          className="tw-shadow-md  tw-overflow-hidden md:tw-col-span-2"
        >
          <div className="tw-flex tw-justify-between tw-px-4">
            <h3 className="tw-text-lg tw-font-semibold">Học viên chăm chỉ</h3>
            <p className="tw-mt-6 tw-text-xs tw-text-gray-400">Xem thêm</p>
          </div>
          <table className="tw-w-full">
            <thead>
              <tr className="">
                <th className="tw-px-4 tw-py-2">STT</th>
                <th className="tw-px-4 tw-py-2">Tên học viên</th>
                <th className="tw-px-4 tw-py-2">hoàn thành</th>
              </tr>
            </thead>
            <tbody>
              {top10sSudents.map((student, index) => (
                <tr key={student.id} className="tw-border-b">
                  <td className="tw-px-4 tw-py-2">{index + 1}</td>
                  <td className="tw-px-4 tw-py-2">{student.name}</td>
                  <td className="tw-px-4 tw-py-2">{student.top}</td>
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
