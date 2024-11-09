import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducer';
import { hasAccess } from '@/api/accessApi';
import { useQuery } from '@tanstack/react-query';

const HasAccess: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { id: course_id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.authReducer.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['access', course_id],
    queryFn: () => hasAccess(user._id || '', course_id || ''),
    enabled: !!user && !!course_id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching access data. Please try again.</div>;

  
  if (!user || data && !data.hasAccess) {
    return <Navigate to={`/courses/${course_id}`} replace />;
  }
  return <div>{children}</div>;
};

export default HasAccess;
