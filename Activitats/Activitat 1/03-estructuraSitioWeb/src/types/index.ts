export interface Author {
  id: string
  name: string
  avatar: string
  bio: string
}

export interface Category {
  id: string
  name: string
  slug: string
  color: string
}

export interface Article {
  id: string
  title: string
  slug: string
  author: Author
  category: Category
  image: string
  excerpt: string
  content: string
  publishedAt: Date
  updatedAt: Date
  views: number
  featured: boolean
}

export interface Comment {
  id: string
  author: Author
  content: string
  createdAt: Date
  replies: Comment[]
}
