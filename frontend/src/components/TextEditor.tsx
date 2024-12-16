// import { Editor } from '@tinymce/tinymce-react';
// import { useEffect, useState } from 'react';

// interface TextEditorProps {
//   onChange: (content: string) => void;
//   initialValue?: string;
//   preview?: boolean;
//   value?: string;
//   initialHeight?: string;
//   mode?: 'basic' | 'advanced';
//   disabled?: boolean;
// }

// const TextEditor: React.FC<TextEditorProps> = ({
//   onChange,
//   initialValue,
//   preview = false,
//   initialHeight,
//   mode = 'basic',
//   disabled = false,
//   value, // Thêm prop value để có thể điều khiển từ bên ngoài
// }) => {
//   const [content, setContent] = useState<string>(initialValue || '');

//   // Cập nhật content khi initialValue hoặc value thay đổi
//   useEffect(() => {
//     if (value !== undefined) {
//       setContent(value);
//     } else if (initialValue) {
//       setContent(initialValue);
//     }
//   }, [initialValue, value]);

//   const handleSave = (value: string) => {
//     const styledContent = value
//       .replace(/<ul>/g, '<ul style="list-style-type: disc !important; margin-left: 20px !important;">')
//       .replace(/<\/ul>/g, '</ul>')
//       .replace(/<ol>/g, '<ol style="list-style-type: decimal !important; margin-left: 20px !important;">')
//       .replace(/<\/ol>/g, '</ol>')
//       .replace(/<a /g, '<a style="color: blue !important; text-decoration: underline !important;" ')
//       .replace(/<\/a>/g, '</a>');

//     setContent(styledContent);
//     onChange(styledContent);
//   };

//   const editorConfig = {
//     height: initialHeight || '200px',
//     branding: false,
//     elementpath: false,
//     menubar: mode === 'advanced',
//     plugins:
//       mode === 'basic'
//         ? [
//             'link',
//             'lists',
//             'autolink',
//             'codesample',
//             'textcolor',
//             'wordcount',
//             'fullscreen',
//             'align', // Thêm align plugin
//           ]
//         : [
//             'anchor',
//             'autolink',
//             'charmap',
//             'codesample',
//             'emoticons',
//             'image',
//             'link',
//             'lists',
//             'media',
//             'searchreplace',
//             'table',
//             'visualblocks',
//           ],
//     toolbar:
//       mode === 'basic'
//         ? 'undo redo | bold italic | bullist numlist | link | codesample | forecolor backcolor | alignleft aligncenter alignright | fullscreen' // Thêm các nút căn trái, giữa, phải
//         : 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
//     tinycomments_mode: 'embedded',
//     tinycomments_author: 'ducphuongdepzai',
//   };

//   return (
//     <div>
//       <Editor
//         value={content} // Sử dụng state content để điều khiển giá trị của editor
//         disabled={disabled}
//         apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
//         init={editorConfig}
//         onEditorChange={(content) => {
//           handleSave(content); // Xử lý khi nội dung thay đổi
//         }}
//       />
//       {preview && (
//         <>
//           <div>
//             <h5>Content Preview:</h5>
//             <div dangerouslySetInnerHTML={{ __html: content }} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TextEditor;

import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';

interface TextEditorProps {
  onChange: (content: string) => void;
  initialValue?: string;
  preview?: boolean;
  value?: string;
  initialHeight?: string;
  mode?: 'basic' | 'advanced';
  disabled?: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({
  onChange,
  initialValue,
  preview = false,
  initialHeight,
  // mode = 'basic',
  disabled = false,
  value,
}) => {
  const [content, setContent] = useState<string>(initialValue || '');

  // Cập nhật content khi initialValue hoặc value thay đổi
  useEffect(() => {
    if (value !== undefined) {
      setContent(value);
    } else if (initialValue) {
      setContent(initialValue);
    }
  }, [initialValue, value]);

  const handleSave = (value: string) => {
    const styledContent = value
      .replace(/<ul>/g, '<ul style="list-style-type: disc !important; margin-left: 20px !important;">')
      .replace(/<\/ul>/g, '</ul>')
      .replace(/<ol>/g, '<ol style="list-style-type: decimal !important; margin-left: 20px !important;">')
      .replace(/<\/ol>/g, '</ol>')
      .replace(/<a /g, '<a style="color: blue !important; text-decoration: underline !important;" ')
      .replace(/<\/a>/g, '</a>');

    setContent(styledContent);
    onChange(styledContent);
  };

  const editorConfig = {
    height: initialHeight || '400px',
    branding: false,
    elementpath: false,
    menubar: false,
    plugins: [
      'advlist',
      'autolink',
      'link',
      'image',
      'lists',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'code',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'help',
      'wordcount',
      'fontsize', // Plugin cho font size
      'fontfamily', // Plugin cho font family
      'codesample'
    ],
    toolbar:
      'undo redo | formatselect fontfamily fontsize | bold italic underline strikethrough | \
      forecolor backcolor | alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | table link image media | preview fullscreen | codesample',
      
    toolbar_mode: 'sliding' as 'sliding', // Đảm bảo định dạng kiểu
    content_style: `
      body {
        font-family: Arial, sans-serif;
        font-size: 14px;
        line-height: 1.6;
      }
    `,
  };
  
  

  return (
    <div>
      <Editor
        value={content}
        disabled={disabled}
        apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
        init={editorConfig}
        onEditorChange={(content) => {
          handleSave(content);
        }}
      />
      {preview && (
        <>
          <div>
            <h5>Content Preview:</h5>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </>
      )}
    </div>
  );
};

export default TextEditor;
