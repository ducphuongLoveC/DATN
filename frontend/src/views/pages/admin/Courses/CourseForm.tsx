import { useState, forwardRef, useImperativeHandle, memo, useEffect } from 'react';
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
import ListAltIcon from '@mui/icons-material/ListAlt';
import TuneIcon from '@mui/icons-material/Tune';

import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from 'moment';
import CardCourse from './CardCourse';
import TextEditor from '@/components/TextEditor';

// my pj

import Dialog from '@/components/Dialog';
import documentChoose from './Resource/DocumentChoose';
import OptionOther from './OptionOther';
import CreateCodePractice from './Resource/CreateCodePractice';

export interface Resource {
  _id?: string;
  title: string;
  type: string;
  url: string;
  duration: number;
  description: string;
  resource_type: string;
}
export interface Module {
  _id?: string;
  title: string;
  resources: Resource[];
}
export interface Course {
  _id: string;
  title: string;
  user_id?: string;
  learning_path_id?: string;
  description: string;
  learning_outcomes: string[];
  level: 'easy' | 'medium' | 'high';
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

  console.log(modules);

  const DescriptionResource = memo(
    forwardRef((_, ref) => {
      const [description, setDescription] = useState('');
      const handleSetDes = (content: string) => {
        setDescription(content);
      };

      const getData = () => {
        return { description };
      };
      useImperativeHandle(ref, () => ({
        getData,
      }));
      return <TextEditor initialValue={datas?.description || ''} onChange={handleSetDes} />;
    })
  );

  const Description = memo(
    forwardRef(({ defaultValue }: any, ref) => {
      const [description, setDescription] = useState(datas ? datas.description : defaultValue?.description || '');

      useEffect(() => {
        if (defaultValue?.description) {
          setDescription(defaultValue.description);
        }
      }, [defaultValue]);

      const handleSetDes = (content: string) => {
        setDescription(content);
      };

      const getData = () => {
        return { description };
      };

      useImperativeHandle(ref, () => ({
        getData,
      }));

      return (
        <TextEditor
          value={description} // Sử dụng value thay vì chỉ initialValue
          onChange={handleSetDes}
        />
      );
    })
  );

  const Row = memo(({ row, currentModuleIndex }: any) => {
    const [open, setOpen] = useState(false);
    const [idEdit, setIdEdit] = useState<string | null>(null);

    const [idResourceEdit, setIdResourceEdit] = useState<number | null>(null);

    const [isOpenModalDocument, setIsOpenModalDocument] = useState(false);

    const [dataEdit, setDataEdit] = useState<any>({});

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

    const hanldeAddResource = (resouce: Resource) => {
      let cloneModules: Module[] = [...modules];

      cloneModules[currentModuleIndex].resources.push(resouce);
      setModules(cloneModules);
    };

    const handleEditResource = (resource: Resource) => {
      console.log(idResourceEdit);

      if (idResourceEdit !== null) {
        let cloneModules: Module[] = [...modules];

        console.log('check');

        cloneModules[currentModuleIndex].resources[idResourceEdit] = resource;

        setModules(cloneModules);
        setIdResourceEdit(null);
        setDataEdit(null);
      }
    };

    const handleDeleteResource = (indexResource: number) => {
      if (confirm(`Xác nhận xóa tài liệu "${modules[currentModuleIndex].resources[indexResource].title}" ?`)) {
        let cloneModules: Module[] = [...modules];

        cloneModules[currentModuleIndex].resources = cloneModules[currentModuleIndex].resources.filter(
          (_, i: number) => i != indexResource
        );

        setModules(cloneModules);
      }
    };

    const handleDeleteModules = (index: string | number) => {
      if (confirm('Bạn có muốn xóa chương này không?')) {
        let cloneModules: Module[] = [...modules];
        const removedModule = cloneModules.filter((_, indexModule) => indexModule != index);
        setModules(removedModule);
      }
    };

    const handleEditTitleModule = (title: string) => {
      let cloneModules: Module[] = [...modules];
      cloneModules[currentModuleIndex].title = title;
      setModules(cloneModules);
    };

    const onSubmit = (data: { title: string }) => {
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
          <TableCell>{row.title}</TableCell>
          <TableCell align="right">{row.resources.length}</TableCell>
          <TableCell align="right">
            {moment.utc(row.resources.reduce((acc: number, c: any) => acc + c.duration, 0) * 1000).format('HH:mm:ss')}
          </TableCell>
          <TableCell align="right">
            <Tippy arrow content="Sửa">
              <Button
                onClick={() => {
                  setIdEdit(currentModuleIndex);
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
            <Button onClick={() => handleDeleteModules(currentModuleIndex)}>
              <DeleteOutlineIcon sx={{ color: 'red' }} />
            </Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open} timeout={0} unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Các tài liệu con
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
                        <TableCell align="right">{moment.utc(resource.duration * 1000).format('mm:ss')}</TableCell>

                        <TableCell align="right">
                          <Tippy arrow content="Sửa">
                            <Button
                              onClick={() => {
                                toggleModalAddDocuments();
                                setDataEdit(resource);
                                setIdResourceEdit(index);
                              }}
                            >
                              <EditIcon />
                            </Button>
                          </Tippy>
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={() => handleDeleteResource(index)}>
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
          onClose={() => {
            toggleModalAddDocuments();
            setIdResourceEdit(null);
            setDataEdit(null);
          }}
        >
          <CardCourse
            defaultValue={
              dataEdit
                ? {
                    _id: dataEdit._id,
                    title: dataEdit.title,
                    resource_type: dataEdit.resource_type,
                    url: dataEdit.url,
                    duration: dataEdit.duration,
                    description: dataEdit.description,
                  }
                : {}
            }
            onSubmit={(datas: {
              title: string;
              type: string;
              url: string;
              duration: number;
              description: string;
              resource_type: string;
            }) => (dataEdit && Object.keys(dataEdit).length > 0 ? handleEditResource(datas) : hanldeAddResource(datas))}
            widthIconImage="50px"
            labels={['Tài liệu', 'Mô tả', 'Bài thực hành']}
            contents={[documentChoose, DescriptionResource, CreateCodePractice]}
          />
        </Dialog>
        <Dialog open={Boolean(idEdit !== null)} onClose={() => setIdEdit(null)} title={`Edit chương ${row.title}`}>
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
  });

  const TableModule = memo(
    forwardRef((_, ref) => {
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
            title: title,
            resources: [],
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
                <TableCell>
                  Tiêu đề
                  <ListAltIcon />{' '}
                </TableCell>
                <TableCell align="right">
                  bài học con <DescriptionIcon />
                </TableCell>
                <TableCell align="right">
                  Tổng thời lượng <AccessTimeIcon />
                </TableCell>
                <TableCell align="right" colSpan={2}>
                  Hành động
                  <TuneIcon />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modules.map((module: Module, index: number) => (
                <Row key={index} row={module} currentModuleIndex={index} />
              ))}
            </TableBody>
          </Table>
          <Button onClick={() => setOpenModalTitle(true)} sx={{ mt: 2 }}>
            Thêm chương
          </Button>
          <Dialog open={openModalTitle} onClose={() => setOpenModalTitle(false)} title="Thêm chương">
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
    })
  );
  const Options = memo(
    forwardRef(({ defaultValue }: any, ref) => {
      const [optionData, setOptionData] = useState({});

      const getData = () => ({ ...optionData });

      useImperativeHandle(ref, () => ({
        getData,
      }));

      return (
        <OptionOther
          onChange={(datasFromOther) => setOptionData(datasFromOther)}
          defaultValues={{
            learning_path_id: '6521438fd3f1e2a1a1a0b1c1',
            user_id: '6521438fd3f1e2a1a1a0b1d1',
            original_price: parseInt(datas?.original_price || defaultValue?.original_price || '0'),
            sale_price: parseInt(datas?.sale_price || defaultValue?.sale_price || '0'),
            learning_outcomes: datas?.learning_outcomes || defaultValue?.learning_outcomes || [],
            level: datas?.level || defaultValue?.level || 'easy',
          }}
        />
      );
    })
  );

  return (
    <Box>
      <CardCourse
        defaultValue={
          datas
            ? {
                title: datas?.title,
                thumbnail: datas?.thumbnail,
                description: datas?.description,
                modules: datas?.modules,
                level: datas?.level,
                original_price: datas?.original_price,
                sale_price: datas?.sale_price,
                learning_outcomes: datas?.learning_outcomes,
              }
            : {}
        }
        onSubmit={onSubmit}
        labels={['Chương học', 'Mô tả', 'Tùy chỉnh']}
        contents={[TableModule, Description, Options]}
      />
    </Box>
  );
};

export default CourseForm;
