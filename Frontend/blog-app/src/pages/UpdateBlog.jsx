import React, { useContext, useEffect, useRef, useState } from 'react';
import Base from '../Components/Base';
import { useNavigate, useParams } from 'react-router-dom';
import userContext from '../context/userContext';
import { loadPost,updatePost as doUpdatePost, uploadPostImage } from '../Services/post-service';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap';
import { loadAllCategories } from '../Services/category-service';
import JoditEditor from 'jodit-react';

function UpdateBlog() {
    const editor = useRef(null);
    const { blogId } = useParams();
    const object = useContext(userContext);
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [categories, setCategories] = useState([]);
    const[image,setImage] = useState(null)

    useEffect(() => {
        loadAllCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.log(error);
            });

        // Load blog
        loadPost(blogId)
            .then((data) => {
                console.log(data)
                setPost({ ...data,categoryId:data.category.categoryId });
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error in loading post");
            });
    }, [blogId]);

    useEffect(() => {
        if (post) {
            if (post.user.user_id !== object.user.data.user_id) {
                toast.error("You are not authorized to update this post");
                navigate("/"); // Redirect to a safe route
            }
        }
    }, [post]);
    
    const handleChange=(event,fieldName)=>{
        setPost({
            ...post,
            [fieldName]:event.target.value
        })
    }
    const updatePost=(event)=>{
        event.preventDefault();
        doUpdatePost({...post,category:{categoryId:post.categoryId}},post.postId)
        .then(res=>{
            console.log(res)
            toast.success("Post updated")
            if(image)
            {
                uploadPostImage(image,post.postId)
            }
            
        }).catch((error) => {
            console.log(error);
            toast.error("Error in updating post");
        });
    }
        //handle file change image
  const handleFileChange=(event)=>{

    console.log(event.target.files[0])
    setImage(event.target.files[0])
  }
    const updateHtml = () => {
        return (
            <div className="wrapper">
                
                <Card className="shadow mt-5">
                    <CardBody>
                        <h3>Update post from here</h3>
                        <Form onSubmit={updatePost}>
                            {/* Post title section */}
                            <div className="my-3">
                                <Label for="title">Post Title</Label>
                                <Input
                                    type="text"
                                    id="title"
                                    placeholder="Enter title of your post"
                                    name="title"
                                    onChange={(event)=>handleChange(event,'title')}
                                    value={post ? post.title : ''}
                                />
                            </div>
                            {/* Content area */}
                            <div className="my-3">
                                <Label for="content">Post Content</Label>
                                <JoditEditor
                                    ref={editor}
                                    value={post ? post.content : ''}
                                    onChange={newContent=>setPost({...post,content:newContent}) }
                                />
                            </div>

                            {/* File field */}
                            <div className="mt-3">
                                <Label for="image">Select Post Image</Label>
                                <Input id="image" type="file" onChange={handleFileChange} />
                            </div>

                            {/* Category */}
                            <div className="my-3">
                                <Label for="category">Post Category</Label>
                                <Input
                                    type="select"
                                    id="category"
                                    name="categoryId"
                                    onChange={(event)=>handleChange(event,'categoryId')}
                                    
                                    value={post.categoryId}
                                >
                                    <option disabled value={0}>
                                        --Select Category--
                                    </option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.categoryId}
                                            value={category.categoryId}
                                        >
                                            {category.categoryTitle}
                                        </option>
                                    ))}
                                </Input>
                            </div>
                            <Container className="text-center">
                                <Button type="submit" color="dark">
                                    Update Post
                                </Button>
                                <Button color="danger" className="ms-2">
                                    Reset
                                </Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    };



    return (
        <Base>
           <Container>
           {post ? updateHtml() : <div>Loading...</div>}
           </Container>
        </Base>
    );
}

export default UpdateBlog;
