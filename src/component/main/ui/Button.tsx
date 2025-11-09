import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'style-2';
  arrow?: boolean;
};

const Button = ({ href, children, variant, arrow = true }: ButtonProps) => {
  const className = `theme-btn ${variant ? variant : ''}`;

  return (
    <Link href={href} className={className}>
      {children}
      {arrow && <Image src="/img/icon/white-arrow.svg" alt="img" width={12} height={12} />}
    </Link>
  );
};

export default Button;