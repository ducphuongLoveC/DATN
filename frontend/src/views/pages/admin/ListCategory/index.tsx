import { useTheme } from '@mui/material';

const CourseCategory = () => {
  const theme = useTheme();

  const categories = [
    {
      id: 1,
      title: 'Frontend',
      description:
        'Front-end developer là lập trình viên chịu trách nhiệm chính trong việc phát triển Client Side. Hiểu một cách đơn giản front-end developer là những người thực...',
      quantity: 13,
    },
    {
      id: 1,
      title: 'Frontend',
      description:
        'Front-end developer là lập trình viên chịu trách nhiệm chính trong việc phát triển Client Side. Hiểu một cách đơn giản front-end developer là những người thực...',
      quantity: 13,
    },
    {
      id: 1,
      title: 'Frontend',
      description:
        'Front-end developer là lập trình viên chịu trách nhiệm chính trong việc phát triển Client Side. Hiểu một cách đơn giản front-end developer là những người thực...',
      quantity: 13,
    },
    {
      id: 1,
      title: 'Frontend',
      description:
        'Front-end developer là lập trình viên chịu trách nhiệm chính trong việc phát triển Client Side. Hiểu một cách đơn giản front-end developer là những người thực...',
      quantity: 13,
    },
    {
      id: 1,
      title: 'Frontend',
      description:
        'Front-end developer là lập trình viên chịu trách nhiệm chính trong việc phát triển Client Side. Hiểu một cách đơn giản front-end developer là những người thực...',
      quantity: 13,
    },
    {
      id: 1,
      title: 'Frontend',
      description:
        'Front-end developer là lập trình viên chịu trách nhiệm chính trong việc phát triển Client Side. Hiểu một cách đơn giản front-end developer là những người thực...',
      quantity: 13,
    },
    {
      id: 1,
      title: 'Frontend',
      description:
        'Front-end developer là lập trình viên chịu trách nhiệm chính trong việc phát triển Client Side. Hiểu một cách đơn giản front-end developer là những người thực...',
      quantity: 13,
    },
  ];

  return (
    <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-6">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
        <h1 className="tw-text-xl tw-font-semibold">
          Quản lý danh mục khóa học
        </h1>
        <button className="tw-bg-purple-500 tw-text-white tw-py-2 tw-px-4 tw-rounded">
          Bảng điều khiển
        </button>
      </div>

      <div
        style={{ background: theme.palette.background.default }}
        className="tw-bg-gray-100 tw-py-4 tw-px-6  tw-flex tw-justify-between tw-items-center tw-mb-6"
      >
        <p>
          Chức năng "Thêm Danh Mục Khóa Học" cho phép người dùng quản lý hệ
          thống danh mục có thể thêm mới danh mục khóa học mới vào cơ sở dữ
          liệu.
        </p>
        <button className="tw-bg-purple-500 tw-text-white tw-py-2 tw-px-4 tw-rounded">
          Thêm danh mục
        </button>
      </div>

      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 tw-gap-4">
        {categories.map((category) => (
          <div
            style={{ background: theme.palette.background.default }}
            key={category.id}
            className=" tw-shadow-sm  tw-p-6 tw-border "
          >
            <h2 className="tw-text-xl tw-font-semibold tw-mb-2">
              {category.title}
            </h2>
            <p className="tw-text-xs tw-text-gray-500 tw-w-3/4 tw-mb-4">
              {category.description}
            </p>

            <div className="tw-flex tw-justify-between tw-items-center">
              <button className="tw-bg-purple-500 tw-text-white tw-py-2 tw-px-4  tw-text-sm">
                Chi tiết danh mục
              </button>
              <p className="tw-text-sm tw-text-gray-700">
                Số lượng: {category.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCategory;
