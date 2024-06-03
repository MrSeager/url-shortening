import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Nav, Navbar, Image, Button, Row, Col, Form, Card } from 'react-bootstrap';
import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef, useState } from 'react';
import ImgLogo from './images/logo.svg';
import ImgTop from './images/illustration-working.svg';
import CopyToClipboard from "react-copy-to-clipboard";

import ImgBR from './images/icon-brand-recognition.svg';
import ImgDR from './images/icon-detailed-records.svg';
import ImgFC from './images/icon-fully-customizable.svg';

import ImgFB from './images/icon-facebook.svg';
import ImgTW from './images/icon-twitter.svg';
import ImgPT from './images/icon-pinterest.svg';
import ImgIG from './images/icon-instagram.svg';

const UrlShort = () => {
    const parentRef = useRef(null);
    const [longURL, setLongUrl] = useState("");
    const [shortLink, setShortLink] = useState({});
    const [shortLinks, setShortLinks] = useState([]);
    const [active, setActive] = useState(false);
    const [copy, setCopy] = useState(false);

    useEffect(() => {
        if (parentRef.current) {
            autoAnimate(parentRef.current);   
        }
    }, [parentRef]);

    function handleChange(e) {
        setLongUrl(e.target.value);
    };
    
    async function handleSubmit(e) {
        e.preventDefault();
        await fetch("https://api-ssl.bitly.com/v4/shorten", {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_BITLY_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            long_url: longURL,
            domain: "bit.ly",
            group_guid: `${process.env.REACT_APP_GUID}`,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            const new_link = data.link.replace("https://", "");
            fetch(
              `https://api-ssl.bitly.com/v4/bitlinks/${new_link}/qr?image_format=png`,
              {
                mode: "cors",
                headers: {
                  Authorization: `Bearer ${process.env.REACT_APP_BITLY_TOKEN}`,
                },
              }
            )
              .then((response) => response.json())
              .then((result) => {
                setShortLink(result);
                setActive(true);
              });
          });
        setShortLinks([...shortLinks, { longURL, shortLink: shortLink.link }]);
        setLongUrl("");
    };

    return (
        <Container fluid className='p-0'>
            <Navbar collapseOnSelect expand="lg" className="bg-transparent mt-3 mx-5">
                <Navbar.Brand><Image fluid src={ImgLogo} alt='logo' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className='cs-bg rounded'>
                    <Nav className='me-auto align-items-center pb-3 pb-lg-0'>
                        <Nav.Link className='cs-tc cs-fw m-1'>Features</Nav.Link>
                        <Nav.Link className='cs-tc cs-fw m-1'>Pricing</Nav.Link>
                        <Nav.Link className='cs-tc cs-fw m-1'>Resources</Nav.Link>
                    </Nav>
                    <Nav className='align-items-center pb-2 pb-lg-0 pt-3 pt-lg-0 cs-bt'>
                        <Nav.Link className='cs-tc cs-fw m-1'>Login</Nav.Link>
                        <Button variant='custom' className='rounded-pill cs-btn text-white m-1 px-5 px-lg-3'>Sign Up</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container fluid className='mt-5'>
                <Row className='ms-4'>
                    <Col lg={{ order: 1, span: 6 }} xs={{ order: 2, span: 12 }} className='d-flex flex-column justify-content-center'>
                        <h1 className='display-1 cs-fw text-center text-lg-start'>More than just shorter links</h1>
                        <p className='cs-tc text-center text-lg-start'>Build your brand’s recognition and get detailed insights 
                        on how your links are performing.</p>
                        <Button variant='custom' className='mx-auto mx-lg-0 w-25 px-3 rounded-pill cs-btn text-white'>Get Started</Button>
                    </Col>
                    <Col lg={{ order: 2, span: 6 }} xs={{ order: 1, span: 12 }}>
                        <Image fluid src={ImgTop} alt='img' />
                    </Col>
                </Row>
            </Container>
            <Container className='mt-5'>
                <Form onSubmit={handleSubmit} className='w-75 m-auto cs-bg-2 p-3 p-lg-5 rounded d-flex flex-column flex-lg-row gap-3'>
                    <Form.Control
                        placeholder='Shorten a link here...'
                        className='cs-w'
                        type='text'
                        value={longURL}
                        onChange={handleChange}
                        />
                    <Button type='submit' variant='custom' className='cs-w-2 rounded cs-btn text-white'>Shorten It!</Button>
                </Form>
                <Container ref={parentRef}>
                    {shortLinks.map((link, index) => (
                        <Container key={index} className='w-75 mx-auto rounded p-2 bg-white m-2 d-flex flex-row justify-content-between align-items-center'>
                            <p className='m-0'>{link.longURL}</p>
                            <p className='m-0 ms-auto cs-tc-2'>{link.shortLink}</p>
                            <CopyToClipboard text={link.shortLink} onCopy={() => {setCopy(true);}}>
                                <Button variant='custom' className='ms-3 px-3 rounded cs-btn text-white'>Copy</Button>
                            </CopyToClipboard>
                        </Container>
                    ))}
                </Container>
            </Container>
            <Container className='mt-5 mb-5'>
                <h2 className='cs-fw h1 text-center'>Advanced Statistics</h2>
                <p className='cs-tc w-50 text-center mx-auto'>Track how your links are performing across the web with our 
                advanced statistics dashboard.</p>
                <Row className='mt-5'>
                    <Col lg={4} xs={12}>
                        <Card className='cs-card border-0 rounded mt-5 mt-lg-0'>
                            <div className='cs-card-img'>
                                <Card.Img variant='custom' className='m-4' src={ImgBR} alt='Brand Recognition' />
                            </div>
                            <Card.Body className='mt-5 mt-lg-5 mb-3 mx-4'>
                                <Card.Title className='cs-fw mb-3'>Brand Recognition</Card.Title>
                                <Card.Text className='cs-tc'>Boost your brand recognition with each click. Generic links don’t 
                                mean a thing. Branded links help instil confidence in your content.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} xs={12} className='mt-5 mt-lg-5 cs-line'>
                        <Card className='cs-card border-0 rounded mt-5 mt-lg-0'>
                            <div className='cs-card-img'>
                                <Card.Img variant='custom' className='m-4' src={ImgDR} alt='Detailed Records' />
                            </div>
                            <Card.Body className='mt-5 mb-3 mx-4'>
                                <Card.Title className='cs-fw mb-3'>Detailed Records</Card.Title>
                                <Card.Text className='cs-tc'>Gain insights into who is clicking your links. Knowing when and where 
                                people engage with your content helps inform better decisions.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} xs={12} className='mt-5 mt-lg-5'>
                        <Card className='cs-card border-0 rounded mt-5 mt-lg-5'>
                            <div className='cs-card-img'>
                                <Card.Img variant='custom' className='m-4' src={ImgFC} alt='Fully Customizable' />
                            </div>
                            <Card.Body className='mt-5 mb-3 mx-4'>
                                <Card.Title className='cs-fw mb-3'>Fully Customizable</Card.Title>
                                <Card.Text className='cs-tc'>Improve brand awareness and content discoverability through customizable 
                                links, supercharging audience engagement.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container fluid className='p-5 d-flex flex-column align-items-center gap-3 cs-bg-3'>
                <h3 className='text-white cs-fw h1'>Boost your links today</h3>
                <Button variant='custom' className='rounded-pill cs-btn text-white px-4'>Get Started</Button>
            </Container>
            <Container fluid className='cs-bg-4 p-3 p-lg-5'>
                <Row  className="g-2">
                    <Col lg={3} xs={12} className='d-flex d-lg-block justify-content-center'>
                        <Image fluid src={ImgLogo} alt="logo" className='cs-img' />
                    </Col>
                    <Col lg={2} xs={12}>
                        <Nav className="flex-column align-items-center align-items-lg-start">
                            <Nav.Link className='cs-link text-white cs-fw mb-2'>Features</Nav.Link>
                            <Nav.Link className='cs-link cs-tc pb-0'>Link Shortening</Nav.Link>
                            <Nav.Link className='cs-link cs-tc pb-0'>Branded Links</Nav.Link>
                            <Nav.Link className='cs-link cs-tc pb-0'>Analytics</Nav.Link>
                        </Nav>
                    </Col>
                    <Col lg={2} xs={12}>
                        <Nav className="flex-column align-items-center align-items-lg-start">
                            <Nav.Link className='cs-link text-white cs-fw mb-2'>Resources</Nav.Link>
                            <Nav.Link className='cs-link cs-tc pb-0'>Blog</Nav.Link>
                            <Nav.Link className='cs-link cs-tc pb-0'>Developers</Nav.Link>
                            <Nav.Link className='cs-link cs-tc pb-0'>Support</Nav.Link>
                        </Nav>
                    </Col>
                    <Col lg={2} xs={12}>
                        <Nav className="flex-column align-items-center align-items-lg-start">
                            <Nav.Link className='cs-link text-white cs-fw mb-2'>Company</Nav.Link>
                            <Nav.Link className='cs-link cs-tc pb-0'>About</Nav.Link>
                            <Nav.Link className='cs-link cs-tc pb-0'>Our Team</Nav.Link>
                            <Nav.Link className='cs-link cs-tc pb-0'>Careers</Nav.Link>
                            <Nav.Link className='cs-link cs-tc pb-0'>Contact</Nav.Link>
                        </Nav>
                    </Col>
                    <Col lg={3} xs={12}>
                        <Nav className="flex-row justify-content-center">
                            <Nav.Link className='p-2'><Image src={ImgFB} alt='facebook' className='cs-soc' /></Nav.Link>
                            <Nav.Link className='p-2'><Image src={ImgTW} alt='twitter' className='cs-soc' /></Nav.Link>
                            <Nav.Link className='p-2'><Image src={ImgPT} alt='pinterest' className='cs-soc' /></Nav.Link>
                            <Nav.Link className='p-2'><Image src={ImgIG} alt='instagram' className='cs-soc' /></Nav.Link>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default UrlShort;