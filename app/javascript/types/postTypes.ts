export type PostAPIResponse = {
  id: string
  type: string
  attributes: Post
}

export type PostListAPIResponse = {
  data: PostAPIResponse[]
}

export type Post = {
  id: number
  title: string
  description: string
  formattedCreatedAt: string
}

export type PostBody = {
  post: {
    title: string
    description: string
  }
}
