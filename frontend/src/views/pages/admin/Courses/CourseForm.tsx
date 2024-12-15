import { useState, forwardRef, useImperativeHandle, memo, useEffect, useRef } from 'react';
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
  Switch,
} from '@mui/material';

import Tippy from '@tippyjs/react';
import moment from 'moment';

// Icons
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TuneIcon from '@mui/icons-material/Tune';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PublicIcon from '@mui/icons-material/Public';

import CardCourse from './CardCourse';
import TextEditor from '@/components/TextEditor';

// my pj
import Dialog from '@/components/Dialog';
import documentChoose from './Resource/DocumentChoose';
import OptionOther from './OptionOther';

import DescriptionResource from './Resource/DescriptionResource';

import { Course, Module, Resource } from '@/interfaces/course';
interface CourseFormProps {
  datas?: Course;
  onSubmit: (courses: Course) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ datas, onSubmit }) => {
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

  const TableResource = memo(
    forwardRef(({ Resources, resourceOpenIndexes, index }: any, ref) => {
      const [resources, setResources] = useState<Resource[]>(Resources || []);
      const [idResourceEdit, setIdResourceEdit] = useState<number | null>(null);
      const [isOpenModalDocument, setIsOpenModalDocument] = useState(false);
      const [dataEdit, setDataEdit] = useState<any>({});

      // Handle resource actions
      const handleAddResource = (resource: Resource) => {
        console.log(resource);

        setResources((prev) => [...prev, { ...resource, isActive: true }]);
        setIsOpenModalDocument(false);
      };

      const handleEditResource = (resource: Resource) => {
        console.log(resource);

        if (idResourceEdit !== null) {
          const updatedResources = [...resources];
          updatedResources[idResourceEdit] = resource;
          setResources(updatedResources);
          resetEditState();
          setIsOpenModalDocument(false);
        }
      };

      const handleDeleteResource = (index: number) => {
        if (confirm('Xác nhận xóa tài liệu')) {
          const updatedResources = resources.filter((_, idx) => idx !== index);
          setResources(updatedResources);
        }
      };

      const handleToggleActiveResource = (index: number, checked: boolean) => {
        const updatedResources = [...resources];
        updatedResources[index].isActive = checked;
        setResources(updatedResources);
      };

      const toggleModalAddDocuments = () => {
        setIsOpenModalDocument((prev) => !prev);
      };

      const resetEditState = () => {
        setIdResourceEdit(null);
        setDataEdit({});
      };

      // Expose getData to parent via ref
      const getData = () => {
        return resources;
      };

      useImperativeHandle(ref, () => ({ getData }));

      return (
        <>
          <TableRow>
            <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
              <Collapse in={resourceOpenIndexes.includes(index)} timeout={300} unmountOnExit>
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
                        <TableCell align="right">Công khai</TableCell>
                        <TableCell align="right" colSpan={2}>
                          Hành động
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {resources.map((resource, idx) => (
                        <TableRow key={resource.title}>
                          <TableCell>{resource.title}</TableCell>
                          <TableCell>{resource.resource_type}</TableCell>
                          <TableCell>
                            <Typography dangerouslySetInnerHTML={{ __html: resource.description }} />
                          </TableCell>
                          <TableCell align="right">{moment.utc(resource.duration * 1000).format('mm:ss')}</TableCell>
                          <TableCell align="right">
                            <Switch
                              onChange={(e) => handleToggleActiveResource(idx, e.target.checked)}
                              checked={resource.isActive}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Tippy arrow content="Sửa">
                              <Button
                                onClick={() => {
                                  toggleModalAddDocuments();
                                  setDataEdit(resource);
                                  setIdResourceEdit(idx);
                                }}
                              >
                                <EditIcon />
                              </Button>
                            </Tippy>
                            <Button onClick={() => handleDeleteResource(idx)}>
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

          {/* Modal for adding/editing resource */}
          <Dialog
            title={`${Object.keys(dataEdit).length ? 'Sửa' : 'Thêm'} tài liệu`}
            open={isOpenModalDocument}
            onClose={() => {
              toggleModalAddDocuments();
              resetEditState();
            }}
          >
            <CardCourse
              defaultValue={dataEdit || {}}
              onSubmit={(data: any) =>
                dataEdit && Object.keys(dataEdit).length > 0 ? handleEditResource(data) : handleAddResource(data)
              }
              widthIconImage="50px"
              labels={['Tài liệu', 'Mô tả']}
              contents={[documentChoose, DescriptionResource]}
            />
          </Dialog>
        </>
      );
    })
  );

  const TableModule = memo(
    forwardRef(({ defaultValue }: any, ref) => {
      const [resourceOpenIndexes, setResourceOpenIndexes] = useState<number[]>([]);
      const [modules, setModules] = useState<Module[]>(defaultValue?.modules || []);
      const [saveOrUpdateModule, setSaveOrUpdateModule] = useState<any>({});

      // Create a ref array to handle multiple TableResource refs
      const refResources = useRef<any[]>([]); // Initialize as an array

      const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm<{ title: string }>({
        defaultValues: { title: '' },
      });

      const getData = () => {
        const resources = refResources.current.map((r: any) => r?.getData());
        const updatedModules = modules.map((module, index) => ({
          ...module,
          resources: resources[index] || [],
        }));
        console.log(modules);

        return { modules: updatedModules };
      };

      useImperativeHandle(ref, () => ({ getData }));

      // Handle module actions
      const handleAddModule = (title: string) => {
        setModules((prev) => [...prev, { title, resources: [], isActive: true }]);
      };

      const handleEditTitleModule = (index: number, title: string) => {
        const updatedModules = [...modules];
        updatedModules[index].title = title;
        setModules(updatedModules);
      };

      const handleToggleActiveModule = (index: number, checked: boolean) => {
        const updatedModules = [...modules];
        updatedModules[index].isActive = checked;
        setModules(updatedModules);
      };

      const handleDeleteModules = (index: number) => {
        if (confirm('Bạn có muốn xóa chương này không?')) {
          const updatedModules = modules.filter((_, idx) => idx !== index);
          setModules(updatedModules);
        }
      };

      const handleTogglerResouceOpenIndex = (index: number) => {
        const updatedIndexes = resourceOpenIndexes.includes(index)
          ? resourceOpenIndexes.filter((idx) => idx !== index)
          : [...resourceOpenIndexes, index];
        setResourceOpenIndexes(updatedIndexes);
      };

      const handleQuickAddCertificate = () => {
        const resources: any = [
          {
            title: 'Cấp chứng chỉ',
            resource_type: 'Certificate',
            duration: 0,
            description:
              '<header class="wrapper"> <p><strong>Nhận chứng chỉ kh&oacute;a học</strong></p> </header> <div class="_wrapper_fl251_1"> <p><strong>Xin ch&uacute;c mừng 🎉</strong></p> <p>Ch&uacute;c mừng bạn đ&atilde; ho&agrave;n th&agrave;nh kh&oacute;a học! Bạn đ&atilde; l&agrave;m được một điều thật tuyệt vời!</p> </div>',
            isActive: true,
          },
        ];
        setModules((prev) => [...prev, { title: 'Hoàn thành khóa học', resources: resources, isActive: true }]);
      };

      const onSubmit = (data: { title: string }) => {
        if (saveOrUpdateModule.type === 'update') {
          handleEditTitleModule(saveOrUpdateModule.index, data.title);
        }
        if (saveOrUpdateModule.type === 'add') {
          handleAddModule(data.title);
        }
        setSaveOrUpdateModule({});
        reset({ title: '' });
      };

      return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  Tiêu đề <ListAltIcon />
                </TableCell>
                <TableCell align="right">
                  Bài học con <></>
                </TableCell>
                <TableCell align="right">
                  Tổng thời gian <AccessTimeIcon />{' '}
                </TableCell>
                <TableCell align="right">
                  Công khai <PublicIcon />
                </TableCell>
                <TableCell align="right" colSpan={2}>
                  Hành động <TuneIcon />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modules.map((module, index) => (
                <>
                  <TableRow sx={{ boxShadow: 'var(--main-box-shadow)' }}>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleTogglerResouceOpenIndex(index)}>
                        {resourceOpenIndexes.includes(index) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{module.title}</TableCell>
                    <TableCell align="right">{module.resources.length}</TableCell>
                    <TableCell align="right">
                      {moment
                        .utc(module.resources.reduce((acc: number, resource: any) => acc + resource.duration, 0) * 1000)
                        .format('mm:ss')}
                    </TableCell>
                    <TableCell align="right">
                      <Switch
                        checked={module.isActive}
                        onChange={(e) => handleToggleActiveModule(index, e.target.checked)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tippy content="Sửa tiêu đề">
                        <Button
                          onClick={() => {
                            setSaveOrUpdateModule({ index, type: 'update' });
                            reset({ title: module.title });
                          }}
                        >
                          <EditIcon />
                        </Button>
                      </Tippy>
                      <Button onClick={() => handleDeleteModules(index)}>
                        <DeleteOutlineIcon sx={{ color: 'red' }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableResource
                    Resources={module.resources}
                    index={index}
                    resourceOpenIndexes={resourceOpenIndexes}
                    ref={(el: any) => (refResources.current[index] = el)}
                  />
                </>
              ))}
            </TableBody>
          </Table>

          <Dialog
            open={Object.keys(saveOrUpdateModule).length > 0}
            onClose={() => {
              setSaveOrUpdateModule({});
              reset({ title: '' });
            }}
            title={saveOrUpdateModule?.type === 'update' ? 'Sửa chương' : 'Thêm chương'}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Nhập tên chương' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Nhập tên chương"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ''}
                  />
                )}
              />

              <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
                {saveOrUpdateModule?.type === 'update' ? 'Sửa chương' : 'Thêm chương'}
              </Button>
            </form>
          </Dialog>
          <Button onClick={() => setSaveOrUpdateModule({ type: 'add' })}>Thêm chương</Button>
          <Button onClick={handleQuickAddCertificate}>Thêm nhanh chứng chỉ</Button>
        </TableContainer>
      );
    })
  );

  return (
    <Box>
      <CardCourse
        defaultValue={datas ? datas : {}}
        onSubmit={onSubmit}
        labels={['Chương học', 'Mô tả', 'Cài đặt']}
        contents={[TableModule, Description, OptionOther]}
      />
    </Box>
  );
};

export default CourseForm;
