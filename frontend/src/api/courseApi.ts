import axiosInstance from './axiosInstance';

export const getCourseList = async () => {
  const res = await axiosInstance.get('api/courses/modules-resources');
  return res.data;
};

export const getCourseSearch = async (search: string) => {
  const res = await axiosInstance.get(`api/courses?search=${search}`);
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
  const res = await axiosInstance.get('api/courses/with-user');
  return res.data;
};

// export const newCourse = async (data: Course) => {
//   const formData = new FormData();

//   // Append the main course data
//   formData.append('learning_path_id', data?.learning_path_id || '');
//   formData.append('user_id', data.user_id || '');
//   formData.append('title', data.title);
//   formData.append('level', data.level);

//   // Kiểm tra xem thumbnail có tệp không, nếu có thì append vào formData
//   if (data.thumbnail) {
//     formData.append('thumbnail', data.thumbnail);
//   }

//   formData.append('description', data.description);
//   formData.append('original_price', data.original_price.toString());
//   formData.append('sale_price', data.sale_price.toString());

//   // Append learning outcomes
//   data.learning_outcomes.forEach((outcome, index) => {
//     formData.append(`learning_outcomes[${index}]`, outcome);
//   });

//   // Append modules and their resources
//   data.modules.forEach((module, moduleIndex) => {
//     formData.append(`modules[${moduleIndex}][title]`, module.title);

//     module.resources.forEach((resource: any, resourceIndex) => {
//       formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][resource_type]`, resource.resource_type);
//       formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][title]`, resource.title);
//       formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][fileName]`, resource.fileName);
//       if (resource.file) {
//         formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][file]`, resource.file);
//       }
//       formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][description]`, resource.description);
//       formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][duration]`, resource.duration.toString());
//     });
//   });

//   // Make the POST request
//   const res = await axiosInstance.post('api/courses/add-course', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });

//   return res.data;
// };

export const newCourse = async (data: any) => {
  const formData = new FormData();

  // Append the main course data
  // formData.append('learning_path_id', data?.learning_path_id || '');
  if (Array.isArray(data.learning_path_ids)) {
    console.log('check');
    data.learning_path_ids.forEach((id: string) => formData.append('learning_path_ids[]', id));
  }
  formData.append('user_id', data.user_id || '');
  formData.append('title', data.title);
  formData.append('level', data.level);

  // Append thumbnail if exists
  if (data.thumbnail) {
    formData.append('thumbnail', data.thumbnail);
  }

  formData.append('description', data.description);
  formData.append('original_price', data.original_price.toString());
  formData.append('sale_price', data.sale_price.toString());
  formData.append('isFree', data.isFree);
  formData.append('isActive', data.isActive);

  // Append learning outcomes
  data.learning_outcomes.forEach((outcome: any, index: number) => {
    formData.append(`learning_outcomes[${index}]`, outcome);
  });

  // Append modules and their resources
  data.modules.forEach((module: any, moduleIndex: number) => {
    formData.append(`modules[${moduleIndex}][title]`, module.title);
    formData.append(`modules[${moduleIndex}][isActive]`, module.isActive);

    module.resources.forEach((resource: any, resourceIndex: number) => {
      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][resource_type]`, resource.resource_type);
      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][title]`, resource.title);
      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][description]`, resource.description);
      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][duration]`, resource.duration.toString());
      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][isActive]`, resource.isActive);

      // Use switch to handle resource type
      switch (resource.resource_type) {
        case 'Video':
          formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][fileName]`, resource.fileName);
          if (resource.file) {
            formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][file]`, resource.file);
          }
          break;

        case 'Question':
          resource.questions.forEach((question: any, questionIndex: number) => {
            // Append question text
            formData.append(
              `modules[${moduleIndex}][resources][${resourceIndex}][questions][${questionIndex}][question]`,
              question.question
            );

            // Append options
            Object.keys(question.options).forEach((optionKey) => {
              formData.append(
                `modules[${moduleIndex}][resources][${resourceIndex}][questions][${questionIndex}][options][${optionKey}]`,
                question.options[optionKey]
              );
            });

            // Append the correct answer
            formData.append(
              `modules[${moduleIndex}][resources][${resourceIndex}][questions][${questionIndex}][correctAnswer]`,
              question.correctAnswer // You need to ensure that this field is correctly mapped in your schema
            );
            formData.append(
              `modules[${moduleIndex}][resources][${resourceIndex}][questions][${questionIndex}][hint]`,
              question.hint
            );
          });
          break;

        // Add other resource types here if needed
        default:
          break;
      }
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
export const updateCourse = async (id: string, data: any) => {
  const formData = new FormData();

  // Append the main course data
  // formData.append('learning_path_id', data?.learning_path_id || '');

  if (Array.isArray(data.learning_path_ids)) {
    console.log('check');
    data.learning_path_ids.forEach((id: string) => formData.append('learning_path_ids[]', id));
  }

  formData.append('user_id', data.user_id || '');
  formData.append('title', data.title);
  formData.append('level', data.level);

  // Append thumbnail if exists
  if (data.thumbnail) {
    formData.append('thumbnail', data.thumbnail);
  }

  formData.append('description', data.description);
  formData.append('original_price', data.original_price.toString());
  formData.append('sale_price', data.sale_price.toString());
  formData.append('isFree', data.isFree ? 'true' : 'false');
  formData.append('isActive', data.isActive);

  // Append learning outcomes
  data.learning_outcomes.forEach((outcome: any, index: number) => {
    formData.append(`learning_outcomes[${index}]`, outcome);
  });

  // Append modules and their resources with specific _id naming convention
  data.modules.forEach((module: any, moduleIndex: number) => {
    // formData.append(`modules_${moduleIndex}_id`, module?._id || '');
    formData.append(`modules[${moduleIndex}][_id]`, module?._id || '');
    formData.append(`modules[${moduleIndex}][title]`, module.title);
    formData.append(`modules[${moduleIndex}][isActive]`, module.isActive);

    module.resources.forEach((resource: any, resourceIndex: number) => {
      // formData.append(`modules_${moduleIndex}_resources_${resourceIndex}_id`, resource?._id || '');
      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][_id]`, resource._id || '');

      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][resource_type]`, resource.resource_type);
      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][title]`, resource.title);
      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][description]`, resource.description);
      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][duration]`, resource.duration.toString());
      formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][isActive]`, resource.isActive);

      // Handle resource type-specific fields
      switch (resource.resource_type) {
        case 'Video':
          formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][fileName]`, resource.fileName);
          formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][url]`, resource.url);
          if (resource.file) {
            formData.append(`modules[${moduleIndex}][resources][${resourceIndex}][file]`, resource.file);
          }
          break;

        case 'Question':
          resource.questions.forEach((question: any, questionIndex: number) => {
            formData.append(
              `modules[${moduleIndex}][resources][${resourceIndex}][questions][${questionIndex}][_id]`,
              question._id || ''
            );
            // Append question text
            formData.append(
              `modules[${moduleIndex}][resources][${resourceIndex}][questions][${questionIndex}][question]`,
              question.question
            );

            // Append options
            Object.keys(question.options).forEach((optionKey) => {
              formData.append(
                `modules[${moduleIndex}][resources][${resourceIndex}][questions][${questionIndex}][options][${optionKey}]`,
                question.options[optionKey]
              );
            });

            // Append the correct answer
            formData.append(
              `modules[${moduleIndex}][resources][${resourceIndex}][questions][${questionIndex}][correctAnswer]`,
              question.correctAnswer // You need to ensure that this field is correctly mapped in your schema
            );
            formData.append(
              `modules[${moduleIndex}][resources][${resourceIndex}][questions][${questionIndex}][hint]`,
              question.hint
            );
          });

          break;

        // Add other resource types here if needed
        default:
          break;
      }
    });
  });

  // Make the PATCH request
  const res = await axiosInstance.patch(`api/courses/update-course/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};
