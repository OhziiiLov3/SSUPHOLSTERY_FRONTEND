import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, } from 'react-bootstrap'
import Product  from "../components/Product"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Services from '../components/Services' 
import Hero from "../components/Hero"
import { listProducts } from '../actions/productActions';

// import Video from '../components/Video' 
// import HomeBlog from '../components/HomeBlog' 
// import products from '../products'
// import blog from '../blog'




function HomeScreen() {
   const dispatch = useDispatch()
   const productList = useSelector(state => state.productList)
   const {error, loading, products } = productList  

    useEffect(() => {
      dispatch(listProducts())

    }, [dispatch])

    

    return (
      <div>
        <Hero />
        <div className="my-2 p-3">
          <h1 className="mx-auto py-3">Feature Products</h1>
          {loading ? (
            <Loader/>
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}

          <Services />
          {/* <Video /> */}
          {/* <Row className="my-2 p-3">
            <HomeBlog blog={blog} />
          </Row> */}
        </div>
      </div>
    );
}

export default HomeScreen

