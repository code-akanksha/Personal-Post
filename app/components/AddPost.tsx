"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"

export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const queryClient = useQueryClient()
  let toastPostID: string

  //Create a post
  const { mutate } = useMutation
  ({mutationFn: (newPostTitle: string) =>{
      return axios.post("/api/posts/addPost", {title: newPostTitle});
    },
    onSuccess: () => {
        // Invalidate the 'posts' query so it fetches fresh data
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        toast.dismiss();
        toast.success("Post has been made 🔥", { id: toastPostID })

        setTitle("")
        setIsDisabled(false)
        console.log('Post created successfully!');
      },
      onError: (err: Error) => {
        if (err instanceof AxiosError) {
            toast.dismiss(); 
            toast.error(err?.response?.data.message, { id: toastPostID })
          }
          setIsDisabled(false)
        // Handle the error, show a message or log it
        console.error('Error creating post:', err.message);
      },

});

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    toastPostID = toast.loading("Creating your post", { id: toastPostID })
    mutate(title);
  }

    return(
        <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea 
                onChange={(e) => setTitle(e.target.value)}
                name="title" 
                value={title}
                placeholder="What's on your mind?"
                className="p-4 text-lg rounded-md my-2 bg-gray-200"
                ></textarea>
            </div>
            <div className="flex items-center justify-between gap-2">
                <p 
                className={`font-bold text-sm ${
                    title.length > 300 ? "text-red-700" : "text-gray-700"
                  } `}
                >{title.length}/300</p>
                <button
                    disabled={isDisabled}
                    className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                    type="submit"
                >
                    Create Post
                </button>
            </div>
        </form>
    )

}


