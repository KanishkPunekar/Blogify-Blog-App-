import { useParams } from "react-router-dom";
import Base from "../Components/Base";
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { createComment, loadPost } from "../Services/post-service";
import {toast} from 'react-toastify';
import { BASE_URL } from "../Services/helper";
import { isLoggedIn } from "../auth";

 const PostPage=()=>{
  const{postId}=useParams()
  const[post,setPost] = useState(null)
  const[comment,setComment] = useState({
    content:''
  })
  useEffect(()=>{
    loadPost(postId).then(data=>{
      console.log(data);
      setPost(data);

    }).catch(error=>{
      console.log(error)
      toast.error("Error in loading toast")

    })
  },[])
  const printDate=(numbers)=>{
    return new Date(numbers).toLocaleDateString()
  }
  const submitComment=()=>{
    if(!isLoggedIn())
    {
      toast.error("Need to login first !!")
      return 
    }
    if(comment.content=='')
    {
      toast.error("Comment cannot be blank")
      return 
    }
    createComment(comment,post.postId).then(data=>{
      console.log(data)
      toast.success("Comment posted...")
      setPost({
        ...post,
        comments:[...post.comments,data.data]
      })
      setComment({
        content:''
      })

    }).catch(error=>{
      console.log(error)
    }
    )
  }
    return (
      <Base>
        <Container className="mt-4">
          <Row>
            <Col
              md={{
                size: 12,
              }}
            >
              <Card className="mt-3">
                {post && (
                  <CardBody>
                    <CardText>
                      Posted by : <b>{post.user.name}</b> on{" "}
                      <b>{printDate(post.addDate)}</b>
                    </CardText>

                    <CardText>
                      <span className="text-muted">
                        Category : {post.category.categoryTitle}
                      </span>
                    </CardText>
                    <div
                      className="divider"
                      style={{
                        width: "100%",
                        height: "1px",
                        background: "#e2e2e2",
                      }}
                    ></div>
                    <CardText className="mt-3">
                      <h2 dangerouslySetInnerHTML={{ __html: post.title }} />
                    </CardText>

                    <div
                      className="image-container mt-5 container text-center "
                      style={{ width: "80%" }}
                    >
                      <img
                        className="img-fluid"
                        src={`${BASE_URL}/api/post/image/${post.imageName}`}
                        alt=""
                      />
                    </div>
                    <CardText
                      className="mt-5"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    ></CardText>
                  </CardBody>
                )}
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col
              md={{
                size: 9,
                offset: 0,
              }}
            >
              <h4>Comments : ({post ? post.comments.length : 0})</h4>
              {post &&
                post.comments.map((c, index) => (
                  <Card className="mt-2 border-0" key={index}>
                    <CardBody>
                      <CardText>{c.content}</CardText>
                    </CardBody>
                  </Card>
                ))}
              <Card className="mt-2 border-0 mb-4">
                <CardBody>
                  <Input 
                    type="text" 
                    placeholder="Enter comment here!!"
                    value={comment.content}
                    onChange={(event)=>setComment({content:event.target.value})}/>
                  <Button onClick={submitComment} className="mt-2">Submit</Button>
                 
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Base>
    );
 }
 export default PostPage;