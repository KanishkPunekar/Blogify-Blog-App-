import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardText } from 'reactstrap';
import { getCurrentUser } from '../auth';
import userContext from '../context/userContext';
import { BASE_URL } from '../Services/helper';

function Post({ post = { postId: 0, title: 'This is default post title', content: 'This is default post content', imageName: '' }, deletePost }) {
    const userContextData = useContext(userContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    return (
        <Card className="post-card mb-4" style={{ width: '100%' }}>
            <div
                className="image-container mt-5 container text-center"
                style={{ width: '80%', margin: '0 auto' }} // Centering the image within the card
            >
                <img
                    className="img-fluid"
                    src={`${BASE_URL}/api/post/image/${post.imageName}`} // Dynamic image source
                    alt="Post"
                    style={{ height: '200px', objectFit: 'cover' }} // Ensuring all images are the same size
                />
            </div>
            <CardBody className="d-flex flex-column align-items-center">
                <h5 className="post-title text-center">{post.title}</h5>
                <CardText className="text-center" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 100) + "..." }}></CardText>
                <div className="d-flex justify-content-center">
                    <Link className="btn btn-secondary mx-2" to={'/posts/' + post.postId}>
                        Read More
                    </Link>
                    {userContextData.user.login && user && user.user_id === post.user.user_id && (
                        <>
                            <Button onClick={() => deletePost(post)} color="danger" className="mx-2">
                                Delete
                            </Button>
                            <Button tag={Link} to={`/user/update-blog/${post.postId}`} color="primary" className="mx-2">
                                Update
                            </Button>
                        </>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}

export default Post;
