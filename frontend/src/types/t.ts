export type FilterOption = {
  name: string; // Tên của bộ lọc (ví dụ: "Danh mục", "Loại khóa học")
  values: string[]; // Danh sách giá trị (ví dụ: ["Miễn phí", "Tính phí"])
};

export type FilterProps = {
  filters: FilterOption[]; // Danh sách bộ lọc
  onFilter: (filters: { search: any; [key: string]: string[] }) => void; // Callback trả về kết quả lọc
};
