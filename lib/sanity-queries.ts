export const postsQuery = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[$start...$end] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  estimatedReadingTime,
  featured,
  author->{
    name,
    slug,
    image,
    role
  },
  categories[]->{
    _id,
    title,
    slug,
    color
  }
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  body,
  publishedAt,
  estimatedReadingTime,
  featured,
  author->{
    name,
    slug,
    image,
    bio,
    role,
    socialLinks
  },
  categories[]->{
    _id,
    title,
    slug,
    color,
    description
  },
  seo
}`;

export const postSlugsQuery = `*[_type == "post" && defined(publishedAt)].slug.current`;

export const postsByCategoryQuery = `*[_type == "post" && defined(publishedAt) && references($categoryId)] | order(publishedAt desc)[$start...$end] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  estimatedReadingTime,
  featured,
  author->{
    name,
    slug,
    image,
    role
  },
  categories[]->{
    _id,
    title,
    slug,
    color
  }
}`;

export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  color
}`;

export const categoryBySlugQuery = `*[_type == "category" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  color
}`;

export const relatedPostsQuery = `*[_type == "post" && _id != $postId && defined(publishedAt) && count((categories[]->_id)[@ in $categoryIds]) > 0] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  estimatedReadingTime,
  author->{
    name,
    slug,
    image,
    role
  },
  categories[]->{
    _id,
    title,
    slug,
    color
  }
}`;

export const featuredPostsQuery = `*[_type == "post" && featured == true && defined(publishedAt)] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  estimatedReadingTime,
  author->{
    name,
    slug,
    image,
    role
  },
  categories[]->{
    _id,
    title,
    slug,
    color
  }
}`;

export const authorBySlugQuery = `*[_type == "author" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  image,
  bio,
  role,
  socialLinks
}`;
