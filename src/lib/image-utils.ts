// Check if image should be optimized by Next.js
export function shouldUnoptimizeImage(src: string | null | undefined): boolean {
  if (!src) return false

  // Disable optimization for external images and popular image formats
  const externalHosts = ['blog.trotta.co', 'api.trotta.co', 'images.pexels.com', 'images.unsplash.com']
  const unoptimizedFormats = ['.webp', '.gif', '.svg']

  const isExternalImage = externalHosts.some((host) => src.includes(host))
  const isUnoptimizedFormat = unoptimizedFormats.some((format) => src.toLowerCase().includes(format))

  return isExternalImage || isUnoptimizedFormat
}
