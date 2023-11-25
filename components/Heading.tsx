'use client';

interface headingProps {
  title: string;
  subtitle: string;
  center: boolean;
}

const Heading: React.FC<headingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-[20px] font-bold">{title}</div>
      <div className="font-light text-neutral-500 text-[14px] mt-2">
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
