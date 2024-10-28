import React, { useState } from 'react';
import {
  Button,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = () => {
    // Handle form submission logic
    alert('Post submitted!');
  };

  const handleCancel = () => {
    // Handle cancel logic
    setTitle('');
    setContent('');
    setCategory('');
    setAuthor('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Thêm bài viết
      </h1>

      <form className="space-y-6">
        {/* Title Input */}
        <div>
          <TextField
            fullWidth
            label="Tiêu đề bài viết"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Thêm tiêu đề..."
          />
        </div>

        {/* Content TextArea */}
        <div>
          <TextField
            fullWidth
            label="Nội dung bài viết"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={10}
            placeholder="Viết nội dung ở đây"
          />
        </div>

        {/* Dropdowns for Category and Author */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Select
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="" disabled>
                Chọn danh mục
              </MenuItem>
              <MenuItem value="Tech">Tech</MenuItem>
              <MenuItem value="Life">Life</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
            </Select>
          </div>

          <div>
            <Select
              fullWidth
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="" disabled>
                Chọn tác giả
              </MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
            </Select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            variant="outlined"
            color="default"
            onClick={handleCancel}
            className="bg-gray-300"
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            Thêm bài viết
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
F