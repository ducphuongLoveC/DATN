import { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  IconButton,
  Typography,
  Button,
  TextField,
} from '@mui/material';

import Tippy from '@tippyjs/react';

// Icons
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';

import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from 'moment';
import CardCourse from './CardCourse';
import TextEditor from '@/components/TextEditor';

// my pj
import Dialog from '@/components/Dialog';
import documentChoose from './ChooseDocument/DocumentChoose';
import OptionOther from './OptionOther';

const Description = forwardRef((_, ref) => {
  const [description, setDescription] = useState('');
  const handleSetDes = (content: string) => {
    setDescription(content);
  };

  const getData = () => {
    console.log('check');

    return { description };
  };
  useImperativeHandle(ref, () => ({
    getData,
  }));
  return <TextEditor initialValue="" exportContent={handleSetDes} />;
});

const NewCourse: React.FC = () => {
  const [modules, setModules] = useState([
    {
      id: 1,
      title: 'Giới thiệu khóa học',
      resource: [
        {
          title: 'Giới thiệu về khóa học',
          type: 'video',
          duration: 856,
          description: 'Tổng quan về khóa học và cách thức học tập.',
          resource_type: 'video',
          url: 'https://example.com/video1',
        },
        {
          title: 'Hướng dẫn sử dụng nền tảng học trực tuyến',
          type: 'document',
          duration: 600, // 10 phút
          description:
            'Hướng dẫn chi tiết cách sử dụng nền tảng học trực tuyến.',
          resource_type: 'document',
          url: 'https://example.com/document1',
        },
      ],
    },
    {
      id: 2,
      title: 'Cơ bản về JavaScript',
      resource: [
        {
          title: 'Giới thiệu về JavaScript và cú pháp cơ bản',
          type: 'video',
          duration: 1200, // 20 phút
          description: 'Khái quát về JavaScript và những cú pháp cơ bản.',
          resource_type: 'video',
          url: 'https://example.com/video2',
        },
        {
          title: 'Biến, hằng và các kiểu dữ liệu trong JavaScript',
          type: 'video',
          duration: 1800, // 30 phút
          description:
            'Tìm hiểu về biến, hằng và các kiểu dữ liệu khác nhau trong JavaScript.',
          resource_type: 'video',
          url: 'https://example.com/video3',
        },
        {
          title: 'Quiz: Biến và kiểu dữ liệu',
          type: 'quiz',
          duration: 900, // 15 phút
          description: 'Kiểm tra kiến thức về biến và các kiểu dữ liệu đã học.',
          resource_type: 'quiz',
          questions: [
            {
              question_id: 1,
              question: 'JavaScript là gì?',
              content:
                'Định nghĩa JavaScript và các mục đích sử dụng trong phát triển web.',
              options: [
                {
                  option_id: 1,
                  option: 'Một ngôn ngữ kịch bản',
                  answer: true,
                },
                {
                  option_id: 2,
                  option: 'Một ngôn ngữ định dạng tài liệu',
                  answer: false,
                },
              ],
            },
            {
              question_id: 2,
              question: 'Kiểu dữ liệu nào không tồn tại trong JavaScript?',
              content: 'Chọn kiểu dữ liệu không có trong JavaScript.',
              options: [
                { option_id: 1, option: 'String', answer: false },
                { option_id: 2, option: 'Character', answer: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'Lập trình nâng cao với React',
      resource: [
        {
          title: 'State và Props trong React',
          type: 'video',
          duration: 1500, // 25 phút
          description:
            'Giải thích cách sử dụng state và props trong các component của React.',
          resource_type: 'video',
          url: 'https://example.com/video4',
        },
        {
          title: 'Sử dụng Redux để quản lý state',
          type: 'document',
          duration: 900, // 15 phút
          description:
            'Hướng dẫn chi tiết cách sử dụng Redux để quản lý state trong ứng dụng React.',
          resource_type: 'document',
          url: 'https://example.com/document2',
        },
        {
          title: 'Thực hành: Xây dựng ứng dụng React với Redux',
          type: 'code practice',
          duration: 2100, // 35 phút
          description:
            'Thực hành xây dựng ứng dụng quản lý công việc với Redux và React.',
          resource_type: 'code',
          url: 'https://example.com/code-practice1',
        },
      ],
    },
    {
      id: 4,
      title: 'Làm việc với API trong React',
      resource: [
        {
          title: 'Tích hợp API vào React',
          type: 'video',
          duration: 1800, // 30 phút
          description: 'Cách sử dụng Axios để tích hợp API vào ứng dụng React.',
          resource_type: 'video',
          url: 'https://example.com/video5',
        },
        {
          title: 'Thực hành: Xây dựng ứng dụng gọi API',
          type: 'code practice',
          duration: 2400, // 40 phút
          description:
            'Thực hành xây dựng ứng dụng gọi API và hiển thị dữ liệu trong React.',
          resource_type: 'code',
          url: 'https://example.com/code-practice2',
        },
      ],
    },
  ]);

  const Row = ({ row, currentModuleIndex }: any) => {
    const [open, setOpen] = useState(false);
    const [isOpenModalDocument, setIsOpenModalDocument] = useState(false);

    const toggleModalAddDocuments = () => {
      setIsOpenModalDocument(!isOpenModalDocument);
    };

    const hanldeAddResouce = (data: any) => {
      let cloneModule = [...modules];

      cloneModule[currentModuleIndex].resource.push(data);
      setModules(cloneModule);
    };
    return (
      <>
        <TableRow sx={{ boxShadow: 'var(--main-box-shadow)' }}>
          <TableCell>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.title}</TableCell>
          <TableCell align="right">{row.resource.length}</TableCell>
          <TableCell align="right">
            {moment
              .utc(
                row.resource.reduce(
                  (acc: number, c: any) => acc + c.duration,
                  0
                ) * 1000
              )
              .format('HH:mm:ss')}
          </TableCell>
          <TableCell align="right">
            <Tippy arrow content="Sửa">
              <EditIcon />
            </Tippy>
          </TableCell>
          <TableCell align="right">
            <DeleteOutlineIcon sx={{ color: 'red' }} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Các bài học con
                </Typography>
                <Table size="small" aria-label="resource ">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên nội dung</TableCell>
                      <TableCell>Loại</TableCell>
                      <TableCell>Mô tả</TableCell>
                      <TableCell align="right">Thời gian</TableCell>
                      <TableCell align="right" colSpan={2}>
                        Hành động
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.resource.map((lesson: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{lesson.title}</TableCell>
                        <TableCell>{lesson.resource_type}</TableCell>
                        <TableCell>{lesson.description}</TableCell>
                        <TableCell align="right">
                          {' '}
                          {moment.utc(lesson.duration * 1000).format('mm:ss')}
                        </TableCell>

                        <TableCell align="right">
                          <Tippy arrow content="Sửa">
                            <EditIcon />
                          </Tippy>
                        </TableCell>
                        <TableCell align="right">
                          <DeleteOutlineIcon sx={{ color: 'red' }} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button onClick={toggleModalAddDocuments}>Thêm tài liệu</Button>
              </Box>
            </Collapse>
          </TableCell>
          <Dialog
            title={`Thêm tài liệu thứ ${row.resource.length + 1} cho chương '${row.title}'`}
            open={isOpenModalDocument}
            onClose={toggleModalAddDocuments}
          >
            <CardCourse
              onSubmit={hanldeAddResouce}
              widthIconImage="50px"
              labels={['Tài liệu', 'Mô tả']}
              contents={[documentChoose, Description]}
            />
          </Dialog>
        </TableRow>
      </>
    );
  };

  const TableModule = forwardRef((_, ref) => {
    const [openModalTitle, setOpenModalTitle] = useState(false);
    const [newModuleTitle, setNewModuleTitle] = useState('');

    const getData = () => {
      return { modules };
    };

    useImperativeHandle(ref, () => ({
      getData,
    }));

    const handleAddModule = (title: string) => {
      setModules((prevModules) => [
        ...prevModules,
        {
          id: prevModules.length + 1,
          title: title,
          resource: [],
          totalDuration: 0,
        },
      ]);
      setNewModuleTitle('');
      setOpenModalTitle(false);
    };

    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>#</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell align="right">
                Số lượng bài học con <DescriptionIcon />
              </TableCell>
              <TableCell align="right">
                Tổng thời lượng <AccessTimeIcon />
              </TableCell>
              <TableCell align="right" colSpan={2}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modules.map((module: any, index: number) => (
              <Row key={module.id} row={module} currentModuleIndex={index} />
            ))}
          </TableBody>
        </Table>
        <Button onClick={() => setOpenModalTitle(true)} sx={{ mt: 2 }}>
          Thêm chương
        </Button>
        <Dialog
          open={openModalTitle}
          onClose={() => setOpenModalTitle(false)}
          title="Thêm chương"
        >
          <Box sx={{ p: 3 }}>
            <TextField
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              placeholder="Nhập tiêu đề chương"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              onClick={() => handleAddModule(newModuleTitle)}
              disabled={!newModuleTitle}
              variant="outlined"
              fullWidth
            >
              Thêm
            </Button>
          </Box>
        </Dialog>
      </TableContainer>
    );
  });

  const handleChange = (data: {}) => {
    console.log(data);
  };

  return (
    <Box>
      <CardCourse
        onSubmit={handleChange}
        labels={['Chương học', 'Mô tả', 'Tùy chỉnh']}
        contents={[TableModule, Description, OptionOther]}
      />
    </Box>
  );
};

export default NewCourse;
