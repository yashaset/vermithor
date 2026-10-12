/** A screenshot inside a simple iPhone-style frame. */
export default function Phone({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div
      className={`rounded-[46px] bg-[#050505] p-[9px] border border-[#2a2a2a] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={640}
        height={1391}
        loading="lazy"
        className="block w-full h-auto rounded-[38px]"
      />
    </div>
  )
}
