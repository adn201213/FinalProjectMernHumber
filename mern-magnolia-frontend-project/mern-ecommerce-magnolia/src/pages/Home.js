import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product/Product';

import products from '../backend/data/products';


const Home = () => {

  return (
    <>
      <h2>Latest products</h2>
      <Row>
        {products.map(product => (
          <Col className="px-3" key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Home
