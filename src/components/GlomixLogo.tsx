import Image from 'next/image';

interface GlomixLogoProps {
  width?: number;
  showTagline?: boolean;
  className?: string;
}

export default function GlomixLogo({ width = 120, showTagline = false, className = '' }: GlomixLogoProps) {
  const imgHeight = Math.round(width * 0.8);

  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center' }}>
      <Image
        src="/logo.png"
        alt="Glomix - Global In Minutes"
        width={width}
        height={imgHeight}
        priority
        style={{
          objectFit: 'contain',
          width: 'auto',
          height: 'auto',
          maxWidth: width,
          maxHeight: showTagline ? imgHeight : 72,
        }}
      />
    </div>
  );
}
