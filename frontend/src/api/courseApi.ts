import axiosInstance from './axiosInstance';
import { Course } from '@/views/pages/admin/Courses/CourseForm';

export const getCourseList = async () => {
  const res = await axiosInstance.get('api/courses/modules-resources');
  return res.data;
};

export const getCourse = async (id: string) => {
  const res = await axiosInstance.get(`api/courses/${id}/modules-resources`);
  return res.data;
};

export const getCourseFull = async (id: string) => {
  const res = await axiosInstance.get(`api/courses/${id}/modules-resources-user`);
  return res.data;
};

export const getCourseFullList = async () => {
  const res = await axiosInstance.get('api/courses/modules-resources-user');
  return res.data;
};




export const newCourse = async (data: Course) => {
  const formData = new FormData();

  // Append the main course data
  formData.append('learning_path_id', data?.learning_path_id || '');
  formData.append('user_id', data.user_id || '');
  formData.append('title', data.title);
  formData.append('level', data.level);
  
  // Kiểm tra xem thumbnail có tệp không, nếu có thì append vào formData
  if (data.thumbnail) {
    formData.append('thumbnail', data.thumbnail);
  }

  formData.append('description', data.description);
  formData.append('original_price', data.original_price.toString());
  formData.append('sale_price', data.sale_price.toString());

  // Append learning outcomes
  data.learning_outcomes.forEach((outcome, index) => {
    formData.append(`learning_outcomes[${index}]`, outcome);
  });

  // Append modules and their resources
  data.modules.forEach((module, moduleIndex) => {
    formData.append(`modules[${moduleIndex}][title]`, module.title);
    
    module.resources.forEach((resource: any, resourceIndex) => {
      console.log(resource);
      
      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][resource_type]`, resource.resource_type);
      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][title]`, resource.title);
      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][fileName]`, resource.fileName);
      if (resource.file) {
        formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][file]`, resource.file);
      }
      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][description]`, resource.description);
      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][duration]`, resource.duration.toString());
    });
  });

  // Make the POST request
  const res = await axiosInstance.post('api/courses/add-course', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

export const updateCourse = async (id: string, datas: Course) => {
  const res = await axiosInstance.patch(`api/courses/update-course/${id}`, datas);
  return res.data;
};
