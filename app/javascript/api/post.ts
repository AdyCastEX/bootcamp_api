import fetch from 'isomorphic-fetch'

import { PostListAPIResponse, PostBody, PostAPIResponse } from '../types/postTypes'

export const fetchPosts = async (): Promise<PostListAPIResponse> => {
  const endpoint = '/api/posts'
  const headers = {
    Accept: 'application/json'
  }

  const response = await fetch(endpoint, { headers, method: 'GET' })
  return response.json()
}

export const createPost = async (body: PostBody): Promise<PostAPIResponse> => {
  const endpoint = '/api/posts'
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  const serializedBody = JSON.stringify(body)
  const response = await fetch(endpoint, {
    headers,
    method: 'POST',
    body: serializedBody
  })

  return response.json()
}
