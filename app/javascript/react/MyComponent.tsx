import React from 'react'

type MyComponentProps = {
  name: string
}

const MyComponent = ({ name }: MyComponentProps) => <h1>{name}</h1>

export default MyComponent
