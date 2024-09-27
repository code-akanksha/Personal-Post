'use client'

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AuthPosts } from "../types/AuthPosts"
import EditPost from "./EditPost"

const fetchAuthPosts =  async () => {
    const response = await axios.get("/api/posts/authPosts")
    return response.data
}

export default function MyPosts(){
    const {data, isLoading } = useQuery<AuthPosts>({
        queryFn: fetchAuthPosts,
        queryKey: ["auth-posts"],
    })
    if(isLoading) return <h1>Posts are loading....</h1>
    console.log(data)
    return(
        <div>
            {data?.post?.map((Post) => (
                <EditPost
                id={Post.id}
                key={Post.id}
                avatar={data.image}
                name={data.name}
                title={Post.title}
                comments={Post.Comment}
                />
            ))}
            
        </div>
    )
}