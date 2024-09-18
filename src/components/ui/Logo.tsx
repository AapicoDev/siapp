"use client";
import Image from 'next/image';

export default function Logo() {
  return (
  <div>
    <Image src="/ASM_logo_dark.svg" alt="Logo" width={160} height={80} style={{width: 160, height: 'auto'}}/>
  </div>
  );
}
