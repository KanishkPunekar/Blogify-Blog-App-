import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Card,CardBody, Container, Form, Input, Label, Toast} from 'reactstrap'
import { loadAllCategories } from '../Services/category-service'
import JoditEditor from 'jodit-react';
import { createPost as docreate, uploadPostImage} from '../Services/post-service';
import { getCurrentUser } from '../auth';
import { toast } from 'react-toastify';
const AddPost =()=> {

  const editor  = useRef(null)
 // const[content,setContent] = useState('')
  const[categories,setCategories]=useState([])
  //variables to push data on database
  const[user,setUser] = useState(undefined)
  const[post,setPost] = useState({
    title:'',
    content:'',
    categoryId:''


  })

  const[image,setImage] = useState(null)


  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    loadAllCategories()
        .then((data) => {
            console.log(data);
            setCategories(data);
        })
        .catch((error) => {
            console.log(error);
        });
}, []);


  const fieldChange = (event)=>{
    setPost({
      ...post,
      [event.target.name]: event.target.value // This updates the specific field dynamically
    })
  }

  const contentFieldChange=(data)=>{
    setPost({...post,'content':data})
  }

  const createPost = async (event) => {
    event.preventDefault();

    if (post.title.trim() === '') {
        toast.error("Post Title is required");
        return;
    }
    if (post.content.trim() === '') {
        toast.error("Post content is required");
        return;
    }
    if (post.categoryId === '') {
        toast.error("Post category is required"); // Fixed message
        return;
    }

    // Submit the data on the server
    post['userId'] = user.user_id; // Set userId correctly

    try {
        const data = await docreate(post); // Make sure docreate is set up to accept post
        uploadPostImage(image,data.postId).then(data=>{
          toast.success("image uploaded")
        }).catch(error=>{
          toast.error("error in uploading image")
          console.log(error)
        })
        toast.success("Posted Successfully");
        //console.log(data); // Log the response data
        setPost({
          title:'',
          content:'',
          categoryId:''
        })
    } catch (error) {
      toast.error("Error creating post");
      //console.error("Error details:", error); // Log the error details
  }
};
//handle file change image
  const handleFileChange=(event)=>{

    console.log(event.target.files[0])
    setImage(event.target.files[0])
  }


  return (
    <div className="wrapper">
        <Card className='shadow mt-5'>
          <CardBody>
            
            <h3 >What's in your mind ?</h3>
            <Form onSubmit={createPost}>
                {/* post title section */}
                <div className='my-3'>
                    <Label for='title'>Post Title</Label>
                    <Input 
                      type="text" 
                      id="title" 
                      placeholder='Enter title of your post'
                      name='title'
                      onChange={fieldChange}
                    />
                </div>
                {/*  Content area*/}
                <div className='my-3'>
                    <Label for='content'>Post Content</Label>
                    {/* <Input 
                      type="textarea" 
                      id="content" 
                      placeholder='Enter content '
                      style={{height:'300px'}}/> */}
                      <JoditEditor
                        ref = {editor}
                        value = {post.content}
                        onChange = {contentFieldChange}

                      />
                </div>
                
                {/* file field*/}
                <div className="mt-3">
                  <Label for='image'>Select Post Image</Label>
                  <Input id='image' type='file' onChange={handleFileChange}/>
                </div>
                      
                {/*  Category*/}
                <div className='my-3'>
                    <Label for='category'>Post Category</Label>
                    <Input 
                      type="select" 
                      id="category" 
                      placeholder='Enter content'
                      name='categoryId'
                      onChange={fieldChange}
                      defaultValue={0}>
                        <option disabled value={0}>--Select Category--</option>
                        {
                          categories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                              {category.categoryTitle}
                            </option>
                          ))
                        }
                    </Input>

                </div>     
                <Container className='text-center'>
                  <Button type='submit' color='dark'>Create Post</Button>
                  <Button color='danger' className='ms-2' >Reset</Button>
                </Container>          

            </Form>
          </CardBody>
        </Card>
    </div>
  )
}

export default AddPost