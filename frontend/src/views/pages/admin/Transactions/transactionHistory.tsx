import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import axiosInstance from '@/api/axiosInstance';
import HeaderTitle from '../Title';

interface Order {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    email: string;
  };
  course_id: {
    _id: string;
    title: string;
    thumbnail: string;
  };
  purchaseDate: string;
  status: 'pending' | 'completed' | 'failed';
  payment_method: string;
  amount: number;
}

interface FilterOptions {
  minPrice: string;
  maxPrice: string;
  sortPrice: 'asc' | 'desc' | '';
  searchId: string; // Tìm kiếm theo ID
}

interface Column {
  id: keyof Order | 'actions';
  label: string;
  minWidth: number;
  align?: 'right';
  format?: (value: any) => React.ReactNode;
}

const DEFAULT_IMAGE = '/placeholder-image.jpg';

const columns: Column[] = [
  {
    id: '_id',
    label: 'ID Đơn Hàng',
    minWidth: 150,
  },
  {
    id: 'user_id',
    label: 'Người Mua',
    minWidth: 150,
    format: (value: Order['user_id']) => {
      if (!value || typeof value !== 'object') return 'N/A';
      return (
        <div>
          <div>{value.name || 'Không có tên'}</div>
          <div style={{ fontSize: '0.8em', color: '#666' }}>{value.email || 'Không có email'}</div>
        </div>
      );
    },
  },
  {
    id: 'course_id',
    label: 'Khóa Học Mua',
    minWidth: 200,
    format: (value: Order['course_id']) => {
      if (!value || typeof value !== 'object') return 'N/A';
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={value.thumbnail || DEFAULT_IMAGE}
            alt={value.title || 'Khóa học'}
            style={{ width: '50px', objectFit: 'cover', borderRadius: 4 }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = DEFAULT_IMAGE;
            }}
          />
          <span>{value.title || 'Không có tiêu đề'}</span>
        </div>
      );
    },
  },
  {
    id: 'purchaseDate',
    label: 'Ngày Mua',
    minWidth: 120,
    format: (value: string) => {
      if (!value) return 'N/A';
      try {
        return new Date(value).toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      } catch {
        return 'Ngày không hợp lệ';
      }
    },
  },
  {
    id: 'status',
    label: 'Trạng Thái',
    minWidth: 120,
    format: (value: string) => {
      if (!value) return 'N/A';
      const statusStyles: Record<string, React.CSSProperties> = {
        pending: { color: '#f59e0b', background: '#fef3c7' },
        completed: { color: '#10b981', background: '#d1fae5' },
        failed: { color: '#ef4444', background: '#fee2e2' },
      };
      const statusText: Record<string, string> = {
        pending: 'Chưa thanh toán',
        completed: 'Đã thanh toán',
        failed: 'Thánh toán thất bại',
      };
      const style = statusStyles[value] || { color: '#666', background: '#f3f4f6' };
      const text = statusText[value] || value;

      return (
        <span
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.875rem',
            ...style,
          }}
        >
          {text}
        </span>
      );
    },
  },
  {
    id: 'payment_method',
    label: 'Phương Thức Thanh Toán',
    minWidth: 150,
    format: (value: string) => {
      if (!value) return 'N/A';
      const methodText: Record<string, string> = {
        bank_transfer: 'Chuyển khoản ngân hàng',
        momo: 'Ví MoMo',
        vnpay: 'VNPay',
        cash: 'Tiền mặt',
      };
      return methodText[value] || value;
    },
  },
  {
    id: 'amount', 
    label: 'Tổng Tiền',
    minWidth: 120,
    align: 'right',
    format: (value: number) => {
      if (typeof value !== 'number') return '0 ₫';
      try {
        return value.toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        });
      } catch {
        return `${value.toLocaleString()} ₫`;
      }
    },
  },
];

const TransactionHistory: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    minPrice: '',
    maxPrice: '',
    sortPrice: '',
    searchId: '', 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.sortPrice) params.append('sortPrice', filters.sortPrice);
      if (filters.searchId) params.append('searchId', filters.searchId); 

      const response = await axiosInstance.get(`/api/order/transactionhistory?${params.toString()}`);
      if (response.data && Array.isArray(response.data.data)) {
        setOrders(response.data.data);
      } else {
        setOrders([]);
        setError('Định dạng dữ liệu không hợp lệ');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Có lỗi xảy ra khi tải dữ liệu');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      <HeaderTitle des="Đây là trang lịch sử giao dịch" />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Tìm kiếm ID Đơn Hàng"
            name="searchId"
            value={filters.searchId}
            onChange={handleFilterChange as React.ChangeEventHandler<HTMLInputElement>}
            size="small"
          />
          <TextField
            label="Giá tối thiểu"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange as React.ChangeEventHandler<HTMLInputElement>}
            size="small"
          />
          <TextField
            label="Giá tối đa"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange as React.ChangeEventHandler<HTMLInputElement>}
            size="small"
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="sortPriceLabel">Sắp xếp giá</InputLabel>
            <Select
              labelId="sortPriceLabel"
              label="Sắp xếp giá"
              name="sortPrice"
              value={filters.sortPrice}
              onChange={handleFilterChange}
            >
              <MenuItem value="">Không</MenuItem>
              <MenuItem value="asc">Tăng dần</MenuItem>
              <MenuItem value="desc">Giảm dần</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <div>Đang tải...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order : any) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={order._id}>
                        {columns.map((column) => {
                          const value = order[column.id];
                          return (
                            <TableCell key={column.id}>
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default TransactionHistory;
