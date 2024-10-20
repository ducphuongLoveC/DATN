import { useTheme } from '@mui/material';
import { useState } from 'react';

export interface SectionItem {
  field: string;
  section: string;
}
interface SectionProps {
    data: SectionItem[]
  onChange: (section: SectionItem) => void;
}

const Section: React.FC<SectionProps> = ({ data, onChange }) => {
  const [currentSection, setCurrentSection] = useState<SectionItem>(data[0]);
  const theme = useTheme();

  const handleChange = (s: SectionItem) => {
    setCurrentSection(s);
    onChange(s);
  };
  return (
    <div
      className="tw-w-full md:tw-w-2/4 tw-p-4 md:tw-p-20  tw-border-r-2"
      style={{ background: theme.palette.background.paper }}
    >
      <h2 className="tw-text-2xl  tw-font-bold tw-mb-3">Cài đặt tài khoản</h2>
      <p className="tw-mb-3 tw-text-xs ">
        Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt bảo
        mật, quản lý thông báo, v.v.
      </p>
      <div className="tw-space-y-4">
        {data.map((s: SectionItem) => (
          <button
            className={`tw-w-full tw-py-2 tw-px-4 tw-rounded-md ${currentSection.field === s.field ? 'tw-bg-[#36404D] tw-text-white' : 'tw-bg-transparent tw-hover:bg-gray-100 '}`}
            onClick={() => handleChange(s)}
          >
            <span className="tw-font-semibold">{s.field}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default Section;
