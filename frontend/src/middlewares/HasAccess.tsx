import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducer';
import { hasAccess } from '@/api/accessApi';
import { useEffect, useState } from 'react';

const HasAccess: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { id: course_id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.authReducer.user);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [hasAccessData, setHasAccessData] = useState(false);

  useEffect(() => {

    const fetchAccessData = async () => {
      if (!user || !course_id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setIsError(false);

      try {
        
        const result = await hasAccess(user._id || '', course_id || '');
        setHasAccessData(result?.hasAccess || false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessData();
  }, [user, course_id]);

  if (isLoading) return <div></div>;
  if (isError) return <div>Error fetching access data. Please try again.</div>;

  if (!user || !hasAccessData) {
    return <Navigate to={`/courses/${course_id}`} replace />;
  }
  return <div>{children}</div>;
};

export default HasAccess;
