import { fetchBlogPosts } from '@/api/wordpress/blog-fetcher'

export async function GET() {
  try {
    const posts = await fetchBlogPosts(4)

    return Response.json({
      success: true,
      postsCount: posts.length,
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
        handle: post.handle,
        date: post.date,
        featuredImage: {
          src: post.featuredImage?.src || 'NO IMAGE',
          alt: post.featuredImage?.alt || 'NO ALT',
          hasImage: !!post.featuredImage?.src,
        },
      })),
    })
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
