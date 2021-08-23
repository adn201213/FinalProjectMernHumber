import React from "react";
import { Row, Col, Image } from 'react-bootstrap'

import profile_placeholder from "../img/profile-placeholder.png";
import github from "../img/github.png";
import linkedin from "../img/linkedin.png";
const About = () => {
  return (
    <div>
      <h2>About Us</h2>
      <div className="aboutRowContainer">
          <div className="aboutTextContainer">
            <h3><b>Magnolia Team Members</b></h3>
              <p className="aboutText">We are Humber College "Information Technology Solutions" students. <br/>
              And this is our group project for "MERN Stack Development - ITE-5430-RNA"</p>
          </div>
          <Row>
              <Col>
                <div className="aboutColContainer-left">
                  <Image className="aboutImg" src={profile_placeholder} roundedCircle  />
                  <div className="aboutTextName">Thanh Duy Tran (Daniel)</div>
                  <p className="aboutTextTitle">Team Lead</p>
                  <div className="aboutTextDescription">
                    <Row>
                      <Col>
                        <a href="https://www.linkedin.com/in/thanh-duy-tran-he-him-65277b182/" target="_blank" rel="noopener noreferrer">
                          <Image className="aboutImg" src={linkedin} rounded />
                        </a>
                      </Col>
                      <Col>
                      <a href="https://github.com/danielduytran/" target="_blank" rel="noopener noreferrer">
                        <Image className="aboutImg" src={github} rounded />
                      </a>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="aboutColContainer">
                  <Image className="aboutImg" src={profile_placeholder} roundedCircle  />
                  <div className="aboutTextName">Adnan Alajroudi</div>
                  <p className="aboutTextTitle">Developer</p>
                  <div className="aboutTextDescription">
                  <Row>
                      <Col>
                        <a href="https://www.linkedin.com/in/adnan-alajroudi-a0538a143/" target="_blank" rel="noopener noreferrer">
                          <Image className="aboutImg" src={linkedin} rounded />
                        </a>
                      </Col>
                      <Col>
                      <a href="https://github.com/adn201213/" target="_blank" rel="noopener noreferrer">
                        <Image className="aboutImg" src={github} rounded />
                      </a>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="aboutColContainer-right">
                  <Image className="aboutImg" src={profile_placeholder} roundedCircle  />
                  <div className="aboutTextName">Viktor Tai</div>
                  <p className="aboutTextTitle">Developer</p>
                  <div className="aboutTextDescription">
                  <Row>
                      <Col>
                        <a href="https://www.linkedin.com/in/viktor-tai-bb99a2173/" target="_blank" rel="noopener noreferrer">
                          <Image className="aboutImg" src={linkedin} rounded />
                        </a>
                      </Col>
                      <Col>
                      <a href="https://github.com/tavi6/" target="_blank" rel="noopener noreferrer">
                        <Image className="aboutImg" src={github} rounded />
                      </a>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col> 
          </Row>
        </div>
    </div>
  );
};
export default About;


