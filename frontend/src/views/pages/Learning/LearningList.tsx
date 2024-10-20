import React from 'react';
import { useState } from 'react';
import Module from '@/components/Module';
import { Typography, Box, useTheme } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

// Dữ liệu khóa học
const LearningLists = [
  {
    title: '1: Giới thiệu về JavaScript',
    children: [
      { title: 'JavaScript là gì?', path: '1', time: 600 },
      { title: 'Lịch sử của JavaScript', path: '2', time: 600 },
    ],
  },
  {
    title: '2: Biến và kiểu dữ liệu',
    children: [
      { title: 'Khai báo biến', path: '3', time: 900 },
      { title: 'Các kiểu dữ liệu cơ bản', path: '4', time: 600 },
      { title: 'Toán tử trong JavaScript', path: '5', time: 600 },
    ],
  },
  {
    title: '3: Cấu trúc điều khiển',
    children: [
      { title: 'Câu lệnh điều kiện', path: '6', time: 600 },
      { title: 'Vòng lặp', path: '', time: 600 },
    ],
  },
  {
    title: '4: Hàm trong JavaScript',
    children: [
      { title: 'Khai báo và sử dụng hàm', path: '7', time: 600 },
      { title: 'Tham số và giá trị trả về', path: '8', time: 600 },
      { title: 'Hàm mũi tên', path: '', time: 600 },
    ],
  },
  {
    title: '5: Mảng và đối tượng',
    children: [
      { title: 'Làm việc với mảng', path: '9' },
      { title: 'Làm việc với đối tượng', path: '10' },
    ],
  },
  {
    title: '6: Lập trình hướng đối tượng',
    children: [
      { title: 'Class và object', path: '', time: 600 },
      { title: 'Kế thừa', path: '', time: 600 },
    ],
  },
  {
    title: '7: Xử lý bất đồng bộ',
    children: [
      { title: 'Callback', path: '', time: 600 },
      { title: 'Promises', path: '', time: 600 },
      { title: 'Async/Await', path: '', time: 600 },
    ],
  },
  {
    title: '8: Làm việc với DOM',
    children: [
      { title: 'Chọn và thao tác với các phần tử DOM', path: '', time: 600 },
      { title: 'Sự kiện DOM', path: '', time: 600 },
    ],
  },
  {
    title: '9: AJAX và Fetch API',
    children: [
      { title: 'Giới thiệu về AJAX', path: '', time: 600 },
      { title: 'Sử dụng Fetch API', path: '', time: 600 },
    ],
  },
  {
    title: '10: Công cụ và thư viện',
    children: [
      { title: 'Sử dụng npm', path: '', time: 600 },
      { title: 'Các thư viện phổ biến', path: '', time: 600 },
    ],
  },
];
interface LearningListProps {
  onClose: () => void;
}
const LearningList: React.FC<LearningListProps> = ({ onClose }) => {
  const [expandedIndexs, setExpandedIndexs] = useState<number[]>([0]);

  const handleToggleExpanded = (index: number) => {
    setExpandedIndexs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const theme = useTheme();
  return (
    <Box
      sx={{
        overflow: 'auto',
        height: {
          sm: '93vh',
          md: '87vh',
        },
        backgroundColor: theme.palette.background.paper2,
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.background.paper2}`,
        }}
      >
        <Typography fontSize="15px" p={2} variant="body1" fontWeight="500">
          Nội dung khóa học của bạn
        </Typography>
        <Box
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
          }}
        >
          <CloseIcon />
        </Box>
      </Box>
      <Box>
        {LearningLists.map((list, index) => (
          <Module
            onClick={() => handleToggleExpanded(index)}
            expanded={expandedIndexs.includes(index)}
            key={index}
            title={list.title}
            items={list.children}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LearningList;
