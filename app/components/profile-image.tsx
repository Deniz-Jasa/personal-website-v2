import { SkeletonImage } from './skeleton-image'

export default function ProfileImage() {
  return (
    <SkeletonImage
      wrapperClassName="w-full md:h-full"
      className="w-full md:h-full object-cover pointer-events-none select-none"
      src="/profile.png"
      alt="Deniz Jasarbasic"
      width={600}
      height={750}
      priority
    />
  )
}
