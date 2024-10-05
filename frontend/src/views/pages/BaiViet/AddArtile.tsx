import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const AddArtile = () => {
  const [value, setValue] = useState('');
  return (
   <>
   <div className="p-4 bg-gray-100 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Tiêu đề</h2>
  <ReactQuill 
    theme="snow" 
    value={value} 
    placeholder="Nội dung viết ở đây"
    onChange={setValue} 
    className="bg-white rounded-lg shadow-sm min-h-[500px] h-auto"
  />
</div>

    </>
  )
}

export default AddArtile