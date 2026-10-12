/** An app icon with the iOS squircle-ish corner radius (22.37% of its size). */
export default function AppIcon({
  src,
  size,
  alt = '',
  glow,
  className = '',
}: {
  src: string
  size: number
  alt?: string
  glow?: string
  className?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`block shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.2237,
        boxShadow: glow ? `0 20px 50px -16px ${glow}` : undefined,
      }}
    />
  )
}
