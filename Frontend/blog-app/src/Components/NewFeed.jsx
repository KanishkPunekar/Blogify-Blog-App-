import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './Post';
import { toast } from 'react-toastify';
import { loadAllPost, deletePostService } from '../Services/post-service';

function NewFeed() {
    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNumber: ''
    });
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        changePage(currentPage);
    }, [currentPage]);

    const changePage = (pageNumber = 0, pageSize = 5) => {
        if (pageNumber > postContent.pageNumber - 1 && postContent.lastPage) {
            return;
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
            return;
        }

        loadAllPost(pageNumber, pageSize)
            .then((data) => {
                setPostContent({
                    content: [...postContent.content, ...data.content],
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    pageSize: data.pageSize,
                    lastPage: data.lastPage,
                    pageNumber: data.pageNumber
                });
            })
            .catch((error) => {
                toast.error('Error in loading posts');
            });
    };

    function deletePost(post) {
        deletePostService(post.postId)
            .then((res) => {
                toast.success('Post is deleted');
                let newPostContent = postContent.content.filter((p) => p.postId !== post.postId);
                setPostContent({ ...postContent, content: newPostContent });
            })
            .catch((error) => {
                toast.error('Error in deleting post');
            });
    }

    const changePageInfinite = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="container-fluid">
            <Row>
                <Col md={12}>
                    <h1>Blogs Count: {postContent?.totalElements}</h1>

                    <InfiniteScroll
                        dataLength={postContent.content.length}
                        next={changePageInfinite}
                        hasMore={!postContent.lastPage}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        <Row>
                            {postContent.content.length > 0 &&
                                postContent.content.map((post) => (
                                    <Col md={6} key={post.postId} className="d-flex align-items-stretch">
                                        <Post deletePost={deletePost} post={post} />
                                    </Col>
                                ))}
                        </Row>
                    </InfiniteScroll>
                </Col>
            </Row>
        </div>
    );
}

export default NewFeed;
