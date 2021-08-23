import React, { useEffect } from 'react'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Message from '../components/Message';

import products from '../backend/data/products';

const cartItems = [
    {
        name: 'Airpods Wireless Bluetooth Headphones',
        image: 'https://www.visions.ca/Images/Catalogue/Product/Dir1/53710_l_1.jpg',
        description:
            'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
        brand: 'Apple',
        category: 'Electronics',
        price: 89.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
        _id: 1
    },
    {
        name: 'iPhone 11 Pro 256GB Memory',
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-gold-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021660000',
        description:
            'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
        brand: 'Apple',
        category: 'Electronics',
        price: 599.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
        _id: 2
    },
    {
        name: 'Canon EOS 80D DSLR Camera',
        image: 'https://www.bhphotovideo.com/images/images2500x2500/canon_1263c005_eos_80d_dslr_camera_1225876.jpg',
        description:
            'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
        brand: 'Cannon',
        category: 'Electronics',
        price: 929.99,
        countInStock: 5,
        rating: 3,
        numReviews: 12,
        _id: 3
    }
]

const CartScreen = ({ match, location, history }) => {

    return (
        <Row>
            <Col md={9}>
                <h2>Shopping Cart</h2>

                {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go back</Link></Message> : (
                    <ListGroup variant='flush'>{cartItems.map(item => {
                        return (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={3}>
                                        <Image src={item.image} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <p>{item.name}</p>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            onChange={(e) => {

                                            }}>
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <i className='fas fa-trash' />
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                    })}</ListGroup>
                )}
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items</h4>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button disabled={cartItems.length === 0} block>Proceed to Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
