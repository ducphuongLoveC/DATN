import { useState, forwardRef, useImperativeHandle } from 'react';
import { useForm, Controller } from 'react-hook-form';

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

interface Resource {
  title: string;
  type: string;
  url: string;
  duration: number;
  description: string;
  resource_type: string;
}
interface Module {
  _id: number;
  title: string;
  resources: Resource[];
}
export interface Course {
  title: string;
  description: string;
  learning_outcomes: string[];
  level: 'easy' | 'medium' | 'advanced';
  modules: Module[];
  original_price: string;
  sale_price: string;
  thumbnail: File | null;
}

interface CourseFormProps {
  datas?: Course;
  onSubmit: (courses: Course) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ datas, onSubmit }) => {
  const [modules, setModules] = useState<Module[]>(datas?.modules || []);

  // các phần có forwardRef để trả data cho CardCourse
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
    return (
      <TextEditor
        initialValue={datas?.description || ''}
        onChange={handleSetDes}
      />
    );
  });

  const Row = ({ row, currentModuleIndex }: any) => {
    const [open, setOpen] = useState(false);
    const [idEdit, setIdEdit] = useState<string | null>(null);
    const [isOpenModalDocument, setIsOpenModalDocument] = useState(false);

    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<{ title: string }>({
      defaultValues: {
        title: '',
      },
    });

    const toggleModalAddDocuments = () => {
      setIsOpenModalDocument(!isOpenModalDocument);
    };

    const hanldeAddResouce = (resouce: Resource) => {
      let cloneModules: Module[] = [...modules];

      cloneModules[currentModuleIndex].resources.push(resouce);
      setModules(cloneModules);
    };

    const handleDeleteModules = (_id: string | number) => {
      if (confirm('Bạn có muốn xóa chương này không?')) {
        let cloneModules: Module[] = [...modules];
        const removedModule = cloneModules.filter((m) => m._id != _id);
        setModules(removedModule);
      }
    };

    const handleEditTitleModule = (title: string) => {
      let cloneModules: Module[] = [...modules];
      cloneModules[currentModuleIndex].title = title;
      setModules(cloneModules);
    };

    const onSubmit = (data: { title: string }) => {
      console.log(data);
      handleEditTitleModule(data.title);
    };
    return (
      <>
        <TableRow sx={{ boxShadow: 'var(--main-box-shadow)' }}>
          <TableCell>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row._id}</TableCell>
          <TableCell>{row.title}</TableCell>
          <TableCell align="right">{row.resources.length}</TableCell>
          <TableCell align="right">
            {moment
              .utc(
                row.resources.reduce(
                  (acc: number, c: any) => acc + c.duration,
                  0
                ) * 1000
              )
              .format('HH:mm:ss')}
          </TableCell>
          <TableCell align="right">
            <Tippy arrow content="Sửa">
              <Button
                onClick={() => {
                  setIdEdit(row._id);
                  reset({
                    title: row.title,
                  });
                }}
              >
                <EditIcon />
              </Button>
            </Tippy>
          </TableCell>
          <TableCell align="right">
            <Button onClick={() => handleDeleteModules(row._id)}>
              <DeleteOutlineIcon sx={{ color: 'red' }} />
            </Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open} timeout={0} unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Các bài học con
                </Typography>
                <Table size="small" aria-label="resource">
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
                    {row.resources.map((resource: Resource, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{resource.title}</TableCell>
                        <TableCell>{resource.resource_type}</TableCell>
                        <TableCell>{resource.description}</TableCell>
                        <TableCell align="right">
                          {moment.utc(resource.duration * 1000).format('mm:ss')}
                        </TableCell>

                        <TableCell align="right">
                          <Tippy arrow content="Sửa">
                            <Button>
                              <EditIcon />
                            </Button>
                          </Tippy>
                        </TableCell>
                        <TableCell align="right">
                          <Button>
                            <DeleteOutlineIcon sx={{ color: 'red' }} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button onClick={toggleModalAddDocuments}>Thêm tài liệu</Button>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>

        <Dialog
          title={`Thêm tài liệu thứ ${row.resources.length + 1} cho chương '${row.title}'`}
          open={isOpenModalDocument}
          onClose={toggleModalAddDocuments}
        >
          <CardCourse
            onSubmit={(datas: {
              title: string;
              type: string;
              url: string;
              duration: number;
              description: string;
              resource_type: string;
            }) => hanldeAddResouce(datas)}
            widthIconImage="50px"
            labels={['Tài liệu', 'Mô tả']}
            contents={[documentChoose, Description]}
          />
        </Dialog>
        <Dialog
          open={Boolean(idEdit)}
          onClose={() => setIdEdit(null)}
          title={`Edit chương ${row.title}`}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Nhập tên chương mới"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title ? errors.title.message : ''}
                />
              )}
            />

            <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
              Sửa chương
            </Button>
          </form>
        </Dialog>
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
          _id: prevModules.length + 1,
          title: title,
          resources: [],
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
            {modules.map((module: Module, index: number) => (
              <Row key={module._id} row={module} currentModuleIndex={index} />
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

  const Options = forwardRef(({}, ref) => {
    const [optionData, setOptionData] = useState({});

    const getData = () => ({ ...optionData });
    useImperativeHandle(ref, () => ({
      getData,
    }));

    return (
      <OptionOther
        onChange={(datasFromOther) => setOptionData(datasFromOther)}
        defaultValues={{
          original_price: parseInt(datas?.original_price || '0'),
          sale_price: parseInt(datas?.sale_price || '0'),
          learning_outcomes: datas?.learning_outcomes || [],
          level: datas?.level || 'easy',
        }}
      />
    );
  });

  return (
    <Box>
      <CardCourse
        initialTitle={datas?.title}
        initialThumbnail={datas?.thumbnail}
        onSubmit={onSubmit}
        labels={['Chương học', 'Mô tả', 'Tùy chỉnh']}
        contents={[TableModule, Description, Options]}
      />
    </Box>
  );
};

export default CourseForm;