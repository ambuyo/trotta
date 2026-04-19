import { directusInstance, readItems, readItem } from './directus'

// Service Provider Fetchers

export async function fetchServiceProviders({
  limit = 6,
  page = 1,
  hubId,
  categoryId,
}: {
  limit?: number
  page?: number
  hubId?: string | number
  categoryId?: string | number
} = {}): Promise<any[]> {
  try {
    const offset = (page - 1) * limit

    const filters: any = {
      status: { _eq: 'published' },
    }

    if (hubId) {
      filters.categories = {
        service_categories_id: { hub_id: { _eq: hubId } },
      }
    }

    if (categoryId) {
      filters.categories = {
        service_categories_id: { _eq: categoryId },
      }
    }

    const providers = await directusInstance.request(
      readItems('service_providers', {
        fields: [
          'id',
          'name',
          'slug',
          'description',
          'price_range',
          'rating',
          'amenities',
          'expat_friendly',
          {
            image: ['id', 'filename_disk', 'filename_download', 'title'],
          },
          {
            city: [{ cities_id: ['name'] }],
          },
          {
            categories: [{ service_categories_id: ['id', 'name', 'slug'] }],
          },
          {
            gallery: [{
              directus_files_id: ['id', 'filename_disk', 'filename_download', 'title'],
            }],
          },
        ],
        filter: filters,
        limit,
        offset,
        sort: ['-date_created'],
      }),
    )

    if (!Array.isArray(providers)) {
      console.error('Directus API returned non-array response:', providers)
      return []
    }
    return providers
  } catch (error) {
    console.error('Error fetching service providers:', error)
    return []
  }
}

export async function fetchServiceProviderBySlug(
  slug: string,
): Promise<any | null> {
  try {
    const providers = await directusInstance.request(
      readItems('service_providers', {
        fields: [
          'id',
          'name',
          'slug',
          'description',
          'about',
          'location',
          'price_range',
          'rating',
          'verified',
          'business_hours',
          'amenities',
          'specialties',
          'cuisine_types',
          'languages_spoken',
          'faq',
          {
            city: [{ cities_id: ['id', 'name', 'slug'] }],
          },
          {
            image: ['id', 'filename_disk', 'filename_download', 'title'],
          },
          {
            gallery: [{
              directus_files_id: ['id', 'filename_disk', 'filename_download', 'title'],
            }],
          },
          {
            categories: [{ service_categories_id: ['id', 'name', 'slug', 'icon'] }],
          },
        ],
        filter: {
          slug: { _eq: slug },
          status: { _eq: 'published' },
        },
        limit: 1,
      }),
    )

    return providers?.[0] || null
  } catch (error) {
    console.error(`Error fetching service provider with slug ${slug}:`, error)
    return null
  }
}

export async function fetchFeaturedServiceProviders(): Promise<any[]> {
  try {
    const providers = await directusInstance.request(
      readItems('service_providers', {
        fields: [
          'id',
          'name',
          'slug',
          'description',
          'price_range',
          'rating',
          'amenities',
          {
            image: ['id', 'filename_disk', 'filename_download', 'title'],
          },
          {
            city: [{ cities_id: ['name'] }],
          },
          {
            categories: [{ service_categories_id: ['id', 'name'] }],
          },
          {
            gallery: [{
              directus_files_id: ['id', 'filename_disk', 'filename_download', 'title'],
            }],
          },
        ],
        filter: {
          status: { _eq: 'published' },
          featured: { _eq: 'true' },
        },
        limit: 6,
        sort: ['-date_created'],
      }),
    )

    if (!Array.isArray(providers)) {
      console.error('Directus API returned non-array response:', providers)
      return []
    }
    return providers
  } catch (error) {
    console.error('Error fetching featured service providers:', error)
    return []
  }
}

export async function fetchTotalServiceProviderCount({
  hubId,
  categoryId,
}: {
  hubId?: string | number
  categoryId?: string | number
} = {}): Promise<number> {
  try {
    const filters: any = {
      status: { _eq: 'published' },
    }

    if (hubId) {
      filters.categories = {
        service_categories_id: { hub_id: { _eq: hubId } },
      }
    }

    if (categoryId) {
      filters.categories = {
        service_categories_id: { _eq: categoryId },
      }
    }

    const response = await directusInstance.request(
      readItems('service_providers', {
        fields: ['id'],
        filter: filters,
        limit: 1,
        meta: ['filter_count'],
      }),
    )

    return (response as any)?.meta?.filter_count || 0
  } catch (error) {
    console.error('Error fetching service provider count:', error)
    return 0
  }
}

// Blog Post Fetchers

export async function fetchPosts({
  limit = 10,
  page = 1,
} = {}): Promise<any[]> {
  try {
    const offset = (page - 1) * limit

    const posts = await directusInstance.request(
      readItems('posts', {
        fields: [
          'id',
          'title',
          'description',
          'slug',
          'image',
          'published_at',
          {
            categories: [{
              posts_categories_id: ['id', 'title', 'slug'],
            }],
          },
        ],
        filter: {
          status: { _eq: 'published' },
        },
        limit,
        offset,
        sort: ['-published_at'],
      }),
    )

    return posts || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function fetchPostBySlug(
  slug: string,
  options?: { draft?: boolean; token?: string },
): Promise<{ post: any | null; relatedPosts: any[] }> {
  try {
    const filter: any = { slug: { _eq: slug } }

    if (!options?.draft) {
      filter.status = { _eq: 'published' }
    }

    const posts = await directusInstance.request(
      readItems('posts', {
        fields: [
          'id',
          'title',
          'content',
          'status',
          'published_at',
          'slug',
          'description',
          'seo',
          {
            image: ['id', 'filename_disk'],
          },
          {
            categories: [{ posts_categories_id: ['title', 'slug'] }],
          },
          {
            author: ['id', 'first_name', 'last_name', { avatar: ['id', 'filename_disk'] }],
          },
        ],
        filter,
        limit: 1,
      }),
    )

    const post = posts?.[0] || null

    // Fetch related posts
    let relatedPosts: any[] = []
    if (post) {
      relatedPosts = await directusInstance.request(
        readItems('posts', {
          fields: [
            'id',
            'title',
            'slug',
            'description',
            'image',
            'published_at',
            {
              categories: [{ posts_categories_id: ['title', 'slug'] }],
            },
          ],
          filter: {
            slug: { _neq: slug },
            status: { _eq: 'published' },
          },
          limit: 2,
          sort: ['-published_at'],
        }),
      )
    }

    return { post, relatedPosts: relatedPosts || [] }
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error)
    return { post: null, relatedPosts: [] }
  }
}

export async function fetchPostsByCategorySlug({
  limit = 10,
  page = 1,
  categorySlug,
}: {
  limit?: number
  page?: number
  categorySlug: string | string[]
}): Promise<any[]> {
  try {
    const offset = (page - 1) * limit

    const posts = await directusInstance.request(
      readItems('posts', {
        fields: [
          'id',
          'title',
          'description',
          'slug',
          'image',
          'published_at',
          {
            categories: [{ posts_categories_id: ['id', 'title', 'slug'] }],
          },
        ],
        filter: {
          categories: {
            posts_categories_id: {
              slug: { _eq: categorySlug },
            },
          },
          status: { _eq: 'published' },
        },
        limit,
        offset,
        sort: ['-published_at'],
      }),
    )

    return posts || []
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error)
    return []
  }
}

export async function fetchTotalPostCount(): Promise<number> {
  try {
    const response = await directusInstance.request(
      readItems('posts', {
        fields: ['id'],
        filter: { status: { _eq: 'published' } },
        limit: 1,
        meta: ['filter_count'],
      }),
    )

    return (response as any)?.meta?.filter_count || 0
  } catch (error) {
    console.error('Error fetching total post count:', error)
    return 0
  }
}

export async function fetchTotalPostCountByCategory(
  categorySlug?: string | string[],
): Promise<number> {
  try {
    const filter: any = { status: { _eq: 'published' } }

    if (categorySlug) {
      filter.categories = {
        posts_categories_id: {
          slug: { _eq: categorySlug },
        },
      }
    }

    const response = await directusInstance.request(
      readItems('posts', {
        fields: ['id'],
        filter,
        limit: 1,
        meta: ['filter_count'],
      }),
    )

    return (response as any)?.meta?.filter_count || 0
  } catch (error) {
    console.error('Error fetching post count by category:', error)
    return 0
  }
}

export async function fetchPostCategories(): Promise<any[]> {
  try {
    const categories = await directusInstance.request(
      readItems('posts_categories', {
        fields: ['id', 'title', 'slug'],
        filter: { status: { _eq: 'published' } },
        sort: ['title'],
      }),
    )

    return categories || []
  } catch (error) {
    console.error('Error fetching post categories:', error)
    return []
  }
}

// Service Hub & Category Fetchers

export async function fetchServiceHubs({
  limit = 10,
  page = 1,
} = {}): Promise<any[]> {
  try {
    const offset = (page - 1) * limit

    const hubs = await directusInstance.request(
      readItems('service_hubs', {
        fields: [
          'id',
          'name',
          'slug',
          'description',
          {
            image: ['id', 'filename_disk'],
          },
          {
            icon: ['id', 'filename_disk'],
          },
          {
            categories: [
              'id',
              'name',
              'slug',
              'description',
              { icon: ['id', 'filename_disk'] },
            ],
          },
        ],
        filter: { status: { _eq: 'published' } },
        limit,
        offset,
        sort: ['name'],
      }),
    )

    return hubs || []
  } catch (error) {
    console.error('Error fetching service hubs:', error)
    return []
  }
}

export async function fetchServiceCategories(
  hubId: number,
): Promise<any[]> {
  try {
    const categories = await directusInstance.request(
      readItems('service_categories', {
        fields: [
          'id',
          'name',
          'slug',
          'hub_id',
          { icon: ['id', 'filename_disk'] },
        ],
        filter: {
          status: { _eq: 'published' },
          hub_id: { _eq: hubId },
        },
      }),
    )

    return categories || []
  } catch (error) {
    console.error(`Error fetching service categories for hub ${hubId}:`, error)
    return []
  }
}

export async function fetchServiceHubBySlug(
  slug: string,
): Promise<any | null> {
  try {
    const hubs = await directusInstance.request(
      readItems('service_hubs', {
        fields: [
          'id',
          'name',
          'slug',
          'description',
          'seo',
          {
            image: ['id', 'filename_disk'],
          },
          {
            icon: ['id', 'filename_disk'],
          },
          {
            categories: [
              'id',
              'name',
              'slug',
              'description',
              { icon: ['id', 'filename_disk'] },
            ],
          },
        ],
        filter: {
          slug: { _eq: slug },
          status: { _eq: 'published' },
        },
        limit: 1,
      }),
    )

    return hubs?.[0] || null
  } catch (error) {
    console.error(`Error fetching service hub with slug ${slug}:`, error)
    return null
  }
}

export async function fetchServiceCategoryBySlug(
  slug: string,
): Promise<any | null> {
  try {
    const categories = await directusInstance.request(
      readItems('service_categories', {
        fields: [
          'id',
          'name',
          'slug',
          'description',
          'seo',
          { icon: ['id', 'filename_disk'] },
          { hub_id: ['id', 'name', 'slug'] },
        ],
        filter: {
          slug: { _eq: slug },
          status: { _eq: 'published' },
        },
        limit: 1,
      }),
    )

    return categories?.[0] || null
  } catch (error) {
    console.error(`Error fetching service category with slug ${slug}:`, error)
    return null
  }
}

// Cities Fetchers

export async function fetchCities(limit: number = 6): Promise<any[]> {
  try {
    const cities = await directusInstance.request(
      readItems('cities', {
        fields: [
          'id',
          'name',
          'slug',
          'description',
          {
            image: ['id', 'filename_disk', 'width', 'height'],
          },
          {
            country: ['id', 'name', 'slug'],
          },
        ],
        filter: { status: { _eq: 'published' } },
        limit,
        sort: ['name'],
      }),
    )

    return cities || []
  } catch (error) {
    console.error('Error fetching cities:', error)
    return []
  }
}

export async function fetchKenyaCities(limit: number = 20): Promise<any[]> {
  try {
    const cities = await directusInstance.request(
      readItems('cities', {
        fields: [
          'id',
          'name',
          'slug',
          'description',
          {
            image: ['id', 'filename_disk', 'width', 'height'],
          },
          {
            country: ['id', 'name', 'slug'],
          },
        ],
        filter: {
          status: { _eq: 'published' },
          country: { slug: { _eq: 'kenya' } },
        },
        limit,
        sort: ['name'],
      }),
    )

    return cities || []
  } catch (error) {
    console.error('Error fetching Kenya cities:', error)
    return []
  }
}

// Events Fetchers

export async function fetchListingServiceCategoriesWithCount(): Promise<any[]> {
  try {
    const categories = [
      { name: 'Community & Lifestyle', key: 'community-lifestyle', slug: 'community' },
      { name: 'Education & Learning', key: 'education-learning', slug: 'education' },
      { name: 'Finance & Insurance', key: 'finance-insurance', slug: 'finance' },
      { name: 'Food & Dining', key: 'food-dining', slug: 'food' },
      { name: 'Healthcare & Medical', key: 'healthcare-medical', slug: 'healthcare' },
      { name: 'Home Services', key: 'home-services', slug: 'home' },
      { name: 'Housing & Relocation', key: 'housing-relocation', slug: 'housing' },
      { name: 'Immigration & Legal', key: 'immigration-legal', slug: 'immigration' },
      { name: 'Jobs & Career', key: 'jobs-career', slug: 'jobs' },
      { name: 'Transport', key: 'transport', slug: 'transport' },
    ]

    const categoriesWithCounts = categories.map((cat) => ({
      id: `listings-cat://${cat.key}`,
      name: cat.name,
      handle: cat.key,
      href: `/all-listings?category=${cat.key}`,
      count: 0,
      thumbnail: 'https://api.trotta.co/assets/default-category-image.png',
      description: `Browse ${cat.name} services`,
    }))

    return categoriesWithCounts
  } catch (error) {
    console.error('Error fetching listing categories with count:', error)
    return []
  }
}

export async function fetchRecentEvents(limit: number = 6): Promise<any[]> {
  try {
    const events = await directusInstance.request(
      readItems('events', {
        fields: [
          'id',
          'title',
          'slug',
          'description',
          'date_start',
          'date_end',
          'location',
          'price',
          'category',
          'source',
          {
            image: ['id', 'filename_disk'],
          },
          {
            city: ['id', 'name', 'slug'],
          },
        ],
        filter: { status: { _eq: 'published' } },
        limit,
        sort: ['-date_start'],
      }),
    )

    return events || []
  } catch (error) {
    console.error('Error fetching recent events:', error)
    return []
  }
}
