export interface DirectusFile {
  id: string
  filename_disk?: string
  filename_download?: string
  title?: string
  type?: string
  filesize?: number
  width?: number
  height?: number
}

export function getDirectusAssetURL(
  fileOrString: string | DirectusFile | null | undefined,
): string {
  if (!fileOrString) return ''

  const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL ||
                    process.env.NEXT_PUBLIC_DIRECTUS_URL ||
                    'https://assets.expatike.com'

  if (typeof fileOrString === 'string') {
    // If it's already a URL, return as is
    if (fileOrString.startsWith('http')) {
      return fileOrString
    }
    return `${assetsUrl}/assets/${fileOrString}`
  }

  return `${assetsUrl}/assets/${fileOrString.id}`
}
