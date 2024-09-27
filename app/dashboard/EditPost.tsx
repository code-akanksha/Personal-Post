"use client"

import Image from "next/image"
import { useState } from "react"
import Toggle from "./Toggle"
import { useMutation, useQueryClient} from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"


type EditProps = {
    id: string
    avatar: string
    name: string
    title: string
    comments?: {
        id: string
        postId: string
        userId: string
    }[]
}

export default function EditPost({avatar, name, title,comments, id}: EditProps){
    //Toggle
    const [toggle, setToggle] = useState(false)
    let deleteToastID: string
    const queryClient = useQueryClient()
    //Delete Post
    const { mutate } = useMutation(
        {mutationFn: (postid: string) => {
            return axios.delete("/api/posts/deletePosts",{ data: postid })
        },
            onError: (error) => {
                console.log(error)
                toast.dismiss();
                toast.error("Error deleting that post",{id: deleteToastID})
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Post has been deleted.",{ id: deleteToastID})
                queryClient.invalidateQueries({queryKey: ["auth-posts"]})
            },
        
        }
    )
    const deletePost = () => {
        deleteToastID = toast.loading("Deleting your post.",{id: deleteToastID})
        mutate(id)
    }

    return(
        <>
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                    <Image width={32} height={32} src={avatar} alt="avatar" />
                    <h3 className="font-bold text-gra-700">{title}</h3>
            </div>
            <div className="my-8">
                <p className="break-all">{title}</p>
            </div>
            <div className="flex items-center gap-4">
                <p className="test-sm font-bold text-gray-700">
                    {comments?.length} Comments
                </p>
                <button onClick={(e) => {
                    setToggle(true)
                } } 
                className="test-sm font-bold text-red-500">Delete</button>
            </div>
       </div>
       {toggle && <Toggle deletePost={deletePost} setToggle={setToggle}/>}
       </>
    )
}