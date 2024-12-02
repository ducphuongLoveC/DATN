import { useSearchParams } from "react-router-dom";

const useProfileId = () => {
  const [searchParams] = useSearchParams();
  const userIdFromURL = searchParams.get("id"); // Lấy ID từ query string

  return { userIdFromURL };
};

export default useProfileId;