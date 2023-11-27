'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/')}
      src="/images/logo.svg"
      alt="airbnb"
      className="hidden xl:block cursor-pointer"
      width="120"
      height="120"
    />
  );
};

export default Logo;
