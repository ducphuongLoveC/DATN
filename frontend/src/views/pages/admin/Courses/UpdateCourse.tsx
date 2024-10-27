import CourseForm, { Course } from './CourseForm';

const datas: Course = {
    title: 'Khóa học Lập trình Web Toàn diện',
    description:
      '<p>Khóa học này giúp bạn phát triển kỹ năng lập trình web từ cơ bản đến nâng cao, bao gồm cả frontend và backend.</p>',
    learning_outcomes: [
      'Hiểu biết về HTML, CSS, JavaScript',
      'Có thể xây dựng website cơ bản',
      'Phát triển ứng dụng web đa tính năng',
      'Biết cách tích hợp API và xử lý dữ liệu trên web',
    ],
    level: 'medium',
    modules: [
      {
        _id: 1,
        title: 'Module 1: Giới thiệu về HTML',
        resources: [
          {
            title: 'Tài liệu HTML cơ bản',
            type: 'document',
            url: 'html-basics.pdf',
            duration: 5,
            description: 'Tài liệu hướng dẫn về HTML.',
            resource_type: 'pdf',
          },
          {
            title: 'Video hướng dẫn HTML',
            type: 'video',
            url: 'html-introduction.mp4',
            duration: 10,
            description: 'Video hướng dẫn nhập môn về HTML.',
            resource_type: 'video',
          },
        ],
      },
      {
        _id: 2,
        title: 'Module 2: CSS và Thiết kế',
        resources: [
          {
            title: 'Tài liệu CSS cơ bản',
            type: 'document',
            url: 'css-basics.pdf',
            duration: 8,
            description: 'Tài liệu hướng dẫn về CSS.',
            resource_type: 'pdf',
          },
          {
            title: 'Video hướng dẫn CSS',
            type: 'video',
            url: 'css-tutorial.mp4',
            duration: 15,
            description: 'Video hướng dẫn về cách sử dụng CSS để thiết kế website.',
            resource_type: 'video',
          },
          {
            title: 'Bài tập thiết kế với CSS',
            type: 'exercise',
            url: 'css-exercises.pdf',
            duration: 0,
            description: 'Bài tập thực hành về CSS.',
            resource_type: 'document',
          },
        ],
      },
      {
        _id: 3,
        title: 'Module 3: JavaScript Căn bản',
        resources: [
          {
            title: 'Tài liệu JavaScript cơ bản',
            type: 'document',
            url: 'javascript-basics.pdf',
            duration: 12,
            description: 'Tài liệu hướng dẫn về JavaScript.',
            resource_type: 'pdf',
          },
          {
            title: 'Video hướng dẫn JavaScript',
            type: 'video',
            url: 'javascript-introduction.mp4',
            duration: 20,
            description: 'Video hướng dẫn về JavaScript cho người mới bắt đầu.',
            resource_type: 'video',
          },
          {
            title: 'Bài tập JavaScript',
            type: 'exercise',
            url: 'javascript-exercises.pdf',
            duration: 0,
            description: 'Bài tập thực hành về JavaScript.',
            resource_type: 'document',
          },
        ],
      },
      {
        _id: 4,
        title: 'Module 4: Lập trình Backend với Node.js',
        resources: [
          {
            title: 'Tài liệu Node.js căn bản',
            type: 'document',
            url: 'nodejs-basics.pdf',
            duration: 18,
            description: 'Hướng dẫn cơ bản về lập trình Node.js.',
            resource_type: 'pdf',
          },
          {
            title: 'Video hướng dẫn Node.js',
            type: 'video',
            url: 'nodejs-introduction.mp4',
            duration: 25,
            description: 'Video hướng dẫn cách thiết lập và sử dụng Node.js.',
            resource_type: 'video',
          },
          {
            title: 'Bài tập Node.js',
            type: 'exercise',
            url: 'nodejs-exercises.pdf',
            duration: 0,
            description: 'Bài tập thực hành về Node.js.',
            resource_type: 'document',
          },
        ],
      },
      {
        _id: 5,
        title: 'Module 5: Tích hợp API và Xử lý Dữ liệu',
        resources: [
          {
            title: 'Tài liệu về API và JSON',
            type: 'document',
            url: 'api-json-guide.pdf',
            duration: 10,
            description: 'Hướng dẫn cách tích hợp API và xử lý dữ liệu JSON.',
            resource_type: 'pdf',
          },
          {
            title: 'Video hướng dẫn tích hợp API',
            type: 'video',
            url: 'api-integration.mp4',
            duration: 20,
            description: 'Video giới thiệu cách tích hợp API vào ứng dụng.',
            resource_type: 'video',
          },
          {
            title: 'Bài tập tích hợp API',
            type: 'exercise',
            url: 'api-exercises.pdf',
            duration: 0,
            description: 'Bài tập thực hành tích hợp API.',
            resource_type: 'document',
          },
        ],
      },
      {
        _id: 6,
        title: 'Module 6: Xây dựng SPA với React',
        resources: [
          {
            title: 'Tài liệu React cơ bản',
            type: 'document',
            url: 'react-basics.pdf',
            duration: 10,
            description: 'Tài liệu hướng dẫn về React cơ bản.',
            resource_type: 'pdf',
          },
          {
            title: 'Video hướng dẫn xây dựng SPA với React',
            type: 'video',
            url: 'react-spa.mp4',
            duration: 30,
            description: 'Video hướng dẫn xây dựng ứng dụng SPA với React.',
            resource_type: 'video',
          },
        ],
      },
    ],
    original_price: '1000000',
    sale_price: '700000',
    thumbnail: new File([''], 'thumbnail2.webp', { type: 'image/webp' }),
};
  
const handleUpdateCourse =(course: Course)=> {
    console.log(course);;
    
}
const UpdateCourse: React.FC = () => {
  return <CourseForm onSubmit={handleUpdateCourse} datas={datas} />;
};
export default UpdateCourse;
