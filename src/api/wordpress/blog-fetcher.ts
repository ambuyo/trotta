const BLOG_URL = process.env.WORDPRESS_BLOG_URL
const WP_USERNAME = process.env.WORDPRESS_APP_USERNAME
const WP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD

function processContent(content: string): string {
  return content
    .replace(/https?:\/\/blog\.trotta\.co\//g, 'https://trotta.co/blog/')
    .replace(/\/\/blog\.trotta\.co\//g, 'https://trotta.co/blog/')
    .replace(/blog\.trotta\.co\//g, 'trotta.co/blog/')
}

interface WordPressPost {
  id: number
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  slug: string
  featured_media: number
  date: string
  author: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text?: string
    }>
    'wp:term'?: Array<
      Array<{
        id: number
        name: string
        slug: string
      }>
    >
    'wp:author'?: Array<{
      id: number
      name: string
      avatar_urls?: {
        [key: string]: string
      }
    }>
  }
}

export interface TBlogPost {
  id: string
  title: string
  handle: string
  excerpt: string
  featuredImage: {
    src: string
    alt: string
    width: number
    height: number
  }
  date: string
  datetime: string
  category: { title: string; href: string }
  timeToRead: string
  author: {
    name: string
    avatar: {
      src: string
      alt: string
    }
  }
  content: string
  tags: string[]
}

let cachedPosts: TBlogPost[] | null = null
let lastFetchTime: number | null = null

function isMorningFetch(): boolean {
  if (!lastFetchTime) return true

  const now = new Date()
  const lastFetch = new Date(lastFetchTime)

  // Reset cache at 6 AM every day
  const resetHour = 6
  const lastResetTime = new Date(lastFetch)
  lastResetTime.setHours(resetHour, 0, 0, 0)

  const currentResetTime = new Date(now)
  currentResetTime.setHours(resetHour, 0, 0, 0)

  return currentResetTime.getTime() > lastResetTime.getTime()
}

export async function fetchBlogPosts(limit: number = 4): Promise<TBlogPost[]> {
  // Return cached posts if fresh
  if (cachedPosts && !isMorningFetch()) {
    return cachedPosts.slice(0, limit)
  }

  try {
    if (!BLOG_URL || !WP_USERNAME || !WP_PASSWORD) {
      console.warn('WordPress blog credentials not configured')
      return []
    }

    const auth = Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString('base64')

    const response = await fetch(
      `${BLOG_URL}/wp-json/wp/v2/posts?per_page=${limit}&_embed=true`,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      console.error('Failed to fetch WordPress posts:', response.statusText)
      return []
    }

    const posts: WordPressPost[] = await response.json()

    // Transform WordPress posts to TBlogPost format
    cachedPosts = posts.map((post) => {
      const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]
      const featuredImageUrl = featuredMedia?.source_url || ''
      const categories = post._embedded?.['wp:term']?.[0] || []
      const tags = post._embedded?.['wp:term']?.[1] || []
      const authorData = post._embedded?.['wp:author']?.[0]

      const cleanExcerpt = post.excerpt.rendered
        .replace(/<[^>]*>/g, '')
        .replace(/&[a-z]+;/g, '')
        .substring(0, 160)

      // Get author avatar - WordPress provides multiple sizes, we'll use the largest available
      const authorAvatarUrls = authorData?.avatar_urls
      const authorAvatar = authorAvatarUrls
        ? Object.values(authorAvatarUrls).pop() || 'https://api.trotta.co/assets/default-avatar.png'
        : 'https://api.trotta.co/assets/default-avatar.png'

      return {
        id: String(post.id),
        title: post.title.rendered,
        handle: post.slug,
        excerpt: cleanExcerpt,
        featuredImage: {
          src: featuredImageUrl,
          alt: featuredMedia?.alt_text || 'Blog post image',
          width: 800,
          height: 600,
        },
        date: new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        datetime: post.date,
        category: { title: categories[0]?.name || 'Blog', href: `/blog?category=${categories[0]?.slug || ''}` },
        timeToRead: '5 min read',
        author: {
          name: authorData?.name || 'Trotta Team',
          avatar: {
            src: authorAvatar,
            alt: authorData?.name || 'Author',
          },
        },
        content: processContent(post.content.rendered),
        tags: tags.map((tag) => tag.name),
      } as any
    })

    lastFetchTime = Date.now()
    return cachedPosts.slice(0, limit)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function fetchBlogPostByHandle(slug: string): Promise<TBlogPost | null> {
  try {
    if (!BLOG_URL || !WP_USERNAME || !WP_PASSWORD) {
      console.warn('WordPress blog credentials not configured')
      return null
    }

    const auth = Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString('base64')

    const response = await fetch(
      `${BLOG_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed=true`,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      console.error('Failed to fetch WordPress post:', response.statusText)
      return null
    }

    const posts: WordPressPost[] = await response.json()
    if (posts.length === 0) return null

    const post = posts[0]
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]
    const categories = post._embedded?.['wp:term']?.[0] || []
    const tags = post._embedded?.['wp:term']?.[1] || []
    const authorData = post._embedded?.['wp:author']?.[0]

    const cleanExcerpt = post.excerpt.rendered
      .replace(/<[^>]*>/g, '')
      .replace(/&[a-z]+;/g, '')
      .substring(0, 160)

    const authorAvatarUrls = authorData?.avatar_urls
    const authorAvatar = authorAvatarUrls
      ? Object.values(authorAvatarUrls).pop() || 'https://api.trotta.co/assets/default-avatar.png'
      : 'https://api.trotta.co/assets/default-avatar.png'

    return {
      id: String(post.id),
      title: post.title.rendered,
      handle: post.slug,
      excerpt: cleanExcerpt,
      featuredImage: {
        src: featuredMedia?.source_url || '',
        alt: featuredMedia?.alt_text || 'Blog post image',
        width: 800,
        height: 600,
      },
      date: new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      datetime: post.date,
      category: { title: categories[0]?.name || 'Blog', href: `/blog?category=${categories[0]?.slug || ''}` },
      timeToRead: '5 min read',
      author: {
        name: authorData?.name || 'Trotta Team',
        avatar: {
          src: authorAvatar,
          alt: authorData?.name || 'Author',
        },
      },
      content: processContent(post.content.rendered),
      tags: tags.map((tag) => tag.name),
    } as any
  } catch (error) {
    console.error('Error fetching blog post by handle:', error)
    return null
  }
}
