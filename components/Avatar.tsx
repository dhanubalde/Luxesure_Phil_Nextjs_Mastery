'use client';

import Image from 'next/image';

interface AvatarProps {
  src?: string | null | undefined;
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full items-center"
      src={src || '/images/placeholder.jpg'}
      alt="user"
      width="25"
      height="25"
    />
  );
};

export default Avatar;
