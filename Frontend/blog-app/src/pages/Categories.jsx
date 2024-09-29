import React, { useEffect, useState } from 'react';
import Base from '../Components/Base';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import NewFeed from '../Components/NewFeed';
import CategorySideMenu from '../Components/CategorySideMenu';
import { deletePostService, loadPostByCategory } from '../Services/post-service';
import { toast } from 'react-toastify';
import Post from '../Components/Post';

function Categories() {
    const [posts, setPosts] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {
        loadPostByCategory(categoryId)
            .then(data => {
                setPosts([...data]);
            })
            .catch(error => {
                console.log(error);
                toast.error("Error in loading post");
            });
    }, [categoryId]);

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
            <Container className="mt-3">
                <Row>
                    <Col md={2}>
                        <CategorySideMenu />
                    </Col>
                    <Col md={10}>
                        <h1>Blogs Count: {posts.length}</h1>
                        <Row>
                            {
                                posts && posts.map((post, index) => {
                                    return (
                                        <Col sm="6" key={index} className="mb-3">
                                            <Post post={post} deletePost={deletePost} />
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}

export default Categories;
