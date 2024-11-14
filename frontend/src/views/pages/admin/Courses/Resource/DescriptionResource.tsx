import { useState, memo, forwardRef, useImperativeHandle } from 'react';

import TextEditor from '@/components/TextEditor';
const DescriptionResource = memo(
  forwardRef(({ defaultValue }: any, ref) => {
    console.log(defaultValue);
    const [description, setDescription] = useState(defaultValue?.description);

    const handleSetDes = (content: string) => {
      setDescription(content);
    };
    const getData = () => {
      return { description };
    };
    useImperativeHandle(ref, () => ({
      getData,
    }));
    return <TextEditor initialValue={description || ''} onChange={handleSetDes} />;
  })
);

export default DescriptionResource;
