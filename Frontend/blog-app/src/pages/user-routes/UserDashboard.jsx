import React, { useEffect, useState } from 'react';
import Base from '../../Components/Base';
import AddPost from '../../Components/AddPost';
import { Container, Row, Col } from 'reactstrap';
import { getCurrentUser } from '../../auth';
import { deletePostService, loadPostUserWise } from '../../Services/post-service';
import { toast } from 'react-toastify';
import Post from '../../Components/Post';

const UserDashboard = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setUser(getCurrentUser());
        loadPostData();
    }, []);

    // Function to load user posts
    function loadPostData() {
        loadPostUserWise(getCurrentUser().user_id)
            .then(data => {
                console.log(data);
                setPosts([...data]);
            })
            .catch(error => {
                console.log(error);
                toast.error("Error in loading user posts");
            });
    }

    // Function to delete post
    function deletePost(post) {
        deletePostService(post.postId)
            .then(res => {
                toast.success("Post is deleted");
                let newPost = posts.filter(p => p.postId !== post.postId);
                setPosts([...newPost]);
            })
            .catch(error => {
                toast.error("Error in deleting post");
            });
    }

    return (
        <Base>
            <Container>
                <AddPost />
                <h2 className='my-3'>Posts Count: {posts.length}</h2>
                <Row>
                    {
                        posts.map((post, index) => {
                            return (
                                <Col sm="6" key={index} className="mb-3">
                                    <Post post={post} deletePost={deletePost} />
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        </Base>
    );
};

export default UserDashboard;
