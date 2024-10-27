import CourseForm, { Course } from './CourseForm';
const NewCourse: React.FC = () => {
  const handleNewCourse = (course: Course) => {
    console.log(course);
  };
  return <CourseForm onSubmit={handleNewCourse} />;
};
export default NewCourse;
