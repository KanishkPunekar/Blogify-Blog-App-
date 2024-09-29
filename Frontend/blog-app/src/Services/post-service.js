import { getToken } from "../auth";
import { privateAxios } from "./helper";
import { myAxios } from "./helper";

//create post function
// export const createPost=(postData)=>{
//     console.log(postData)
//     return privateAxios
//     .post(`/api/user/${postData.userId}/category/${postData.categoryId}/posts`,postData)
//     .then((response) =>response.data);

// }
export const createPost= async(postData)=>{
    const token = getToken(); // Retrieve the token
    console.log("Token being sent:", token); // Log the token

    const response = await privateAxios.post(`/api/user/${postData.userId}/category/${postData.categoryId}/posts`, postData);
    return response.data;

}

//load all posts

export const loadAllPost=(pageNumber,pageSize)=>{

    return myAxios.get(`/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(response=>response.data);
}

//load post according to posrtid

export const loadPost=(postId)=>{
    return myAxios.get(`/api/posts/`+postId).then(response=>response.data);
}

export const createComment=(comment,postId)=>{

    return privateAxios.post(`/api/post/${postId}/comments`,comment)
}

//upload post
export const uploadPostImage=(image,postId)=>{
    let formData = new FormData()
    formData.append("image",image)
    return privateAxios.post(`/api/post/image/upload/${postId}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(response=>response.data);
}

//get category wise post
export const loadPostByCategory=(categoryId)=>{
    return privateAxios.get(`/api/category/${categoryId}/posts`).then(response=>response.data);
}

export function loadPostUserWise(userId){
    return privateAxios.get(`/api/user/${userId}/posts`).then(response=>response.data);
}

//deldte post

export function deletePostService(postId)
{
    return privateAxios.delete(`/api/posts/${postId}`).then(response=>response.data)
}

//update post
export function updatePost(post,postId)
{
    console.log(post)
    return privateAxios.put(`/api/posts/${postId}`,post).then(response=>response.data)
}
