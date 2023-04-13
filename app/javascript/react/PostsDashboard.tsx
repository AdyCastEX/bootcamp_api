import React, { useState, useEffect, ChangeEvent } from 'react'

import {
  Post,
  PostBody,
  PostAPIResponse,
  PostListAPIResponse
} from '../types/postTypes'

import {
  fetchPosts as defaultFetchPosts,
  createPost as defaultCreatePost
} from '../api/post'

export type PostsDashboardProps = {
  fetchPosts?: () => Promise<PostListAPIResponse>
  createPost?: (body: PostBody) => Promise<PostAPIResponse>
}

const PostsDashboard = ({
  fetchPosts = defaultFetchPosts,
  createPost = defaultCreatePost
}: PostsDashboardProps) => {
  const [posts, setPosts] = useState([] as Post[])
  const [currentTitle, setCurrentTitle] = useState('')
  const [currentDescription, setCurrentDescription] = useState('')

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(event.target.value)
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentDescription(event.target.value)
  }

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async() => {
    try {
      const response = await fetchPosts()
      const responsePosts = response.data.map((post: PostAPIResponse) => {
        return post.attributes
      })
      setPosts(responsePosts)

    } catch {
      console.log('There was a network error')
    }
  }

  const handleCreatePost = async () => {
    const body: PostBody = {
      post: {
        title: currentTitle,
        description: currentDescription
      }
    }

    try {
      const response = await createPost(body)
      getPosts()
      setCurrentTitle('')
      setCurrentDescription('')
    } catch {
      console.log('There was a network error')
    }
  }

  return(
    <>
      <h1>Posts</h1>
      <div className='posts-list'>
        { posts.map((post: Post, index: number) => (
          <div className='post-item'>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
      <input type='text' onChange={handleTitleChange} value={currentTitle}/>
      <textarea onChange={handleDescriptionChange} value={currentDescription}/>
      <button type='button' onClick={handleCreatePost}>Submit</button>
    </>
  )
}

export default PostsDashboard
