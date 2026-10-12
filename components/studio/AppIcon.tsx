/** An app icon with the iOS squircle-ish corner radius (22.37% of its size). */
export default function AppIcon({
  src,
  size,
  alt = '',
  shadow,
  className = '',
}: {
  src: string
  size: number
  alt?: string
  shadow?: boolean
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
        // Hairline ring keeps light icons (e.g. Sweetheart's) defined on light backgrounds.
        boxShadow: `0 0 0 1px var(--border)${shadow ? ', 0 12px 28px -14px rgba(0, 0, 0, 0.45)' : ''}`,
      }}
    />
  )
}
