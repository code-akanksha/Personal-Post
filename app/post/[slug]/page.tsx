'use client'
import AddComment from "@/app/components/AddComment"
import Post from "@/app/components/Post"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type URL = {
    params: {
        slug: string
    }
    searchParams: string
}

const fetchDetails = async (slug: string) => {

    const response = await axios.get(`/api/posts/${slug}`)
    console.log(response.data)
    return response.data
}

export default function PostDetail(url: URL){
    const {data, isLoading } = useQuery({
        queryKey: ["detail-post"],
        queryFn: () => fetchDetails(url.params.slug),
    })
    if(isLoading) {
        return "Loading...."
    }
    console.log("test45",data)
    return(
        <div>
           <Post 
           id={data.id}
           name={data.user.name}
           avatar={data.user.image}
           postTitle = {data.title}
           comments={data.Comment}
           />
            <AddComment id={data?.id} />
        </div>
    )
}