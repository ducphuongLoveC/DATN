import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
//icon
import CloseIcon from '@mui/icons-material/Close';

// Dữ liệu khóa học
const LearningLists = [
  {
    title: '1: Giới thiệu về JavaScript',
    children: [
      { title: 'JavaScript là gì?', path: '1' },
      { title: 'Lịch sử của JavaScript', path: '2' },
    ],
  },
  {
    title: '2: Biến và kiểu dữ liệu',
    children: [
      { title: 'Khai báo biến', path: '3' },
      { title: 'Các kiểu dữ liệu cơ bản', path: '4' },
      { title: 'Toán tử trong JavaScript', path: '5' },
    ],
  },
  {
    title: '3: Cấu trúc điều khiển',
    children: [
      { title: 'Câu lệnh điều kiện', path: '6' },
      { title: 'Vòng lặp', path: '' },
    ],
  },
  {
    title: '4: Hàm trong JavaScript',
    children: [
      { title: 'Khai báo và sử dụng hàm', path: '7' },
      { title: 'Tham số và giá trị trả về', path: '8' },
      { title: 'Hàm mũi tên', path: '' },
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
      { title: 'Class và object', path: '' },
      { title: 'Kế thừa', path: '' },
    ],
  },
  {
    title: '7: Xử lý bất đồng bộ',
    children: [
      { title: 'Callback', path: '' },
      { title: 'Promises', path: '' },
      { title: 'Async/Await', path: '' },
    ],
  },
  {
    title: '8: Làm việc với DOM',
    children: [
      { title: 'Chọn và thao tác với các phần tử DOM', path: '' },
      { title: 'Sự kiện DOM', path: '' },
    ],
  },
  {
    title: '9: AJAX và Fetch API',
    children: [
      { title: 'Giới thiệu về AJAX', path: '' },
      { title: 'Sử dụng Fetch API', path: '' },
    ],
  },
  {
    title: '10: Công cụ và thư viện',
    children: [
      { title: 'Sử dụng npm', path: '' },
      { title: 'Các thư viện phổ biến', path: '' },
    ],
  },
];
interface LearningListProps {
  onClose: () => void;
}
const LearningList: React.FC<LearningListProps> = ({ onClose }) => {
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
          <Accordion key={index} disableGutters>
            <AccordionSummary
              expandIcon={
                <ExpandMore
                  sx={{
                    color: theme.palette.text.primary,
                    borderRadius: 'none',
                  }}
                />
              }
            >
              <Box>
                <Typography fontSize={'16px'}>{list.title}</Typography>
                <Typography variant="caption">0/9 | 01:46:20</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: theme.palette.background.paper2 }}
            >
              {list.children.map((child, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Box display={'flex'}>
                      <Checkbox
                        sx={{
                          '&.MuiCheckbox-root': {
                            padding: 0,
                            '& .MuiSvgIcon-root': {
                              fontSize: '1rem',
                            },
                          },
                          marginRight: '10px',
                        }}
                      />
                      <Typography>{child.title}</Typography>
                    </Box>
                    <Typography variant="caption">15:03</Typography>
                  </Box>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default LearningList;
