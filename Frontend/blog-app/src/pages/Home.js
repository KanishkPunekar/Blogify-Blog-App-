import { useEffect } from "react"
import Base from "../Components/Base"
import NewFeed from "../Components/NewFeed"
import { Col, Container, Row } from "reactstrap"
import CategorySideMenu from "../Components/CategorySideMenu"

const Home=()=>{
    
    return(
        <Base>
         <Container className="mt-3">

            <Row>
                <Col md={2} className="pt-">
                    <CategorySideMenu/>
                </Col>
                <Col md={10}>
                    <NewFeed/>
                </Col>
            </Row>
         </Container>
   
        </Base>
    )
}

export default Home