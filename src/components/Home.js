import React from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { HomeCard } from "./HomeCard";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Home = () => {

  const projects = [
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: "URL de la imagen 1",
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: "URL de la imagen 2",
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: "URL de la imagen 3",
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: "URL de la imagen 4",
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: "URL de la imagen 5",
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: "URL de la imagen 6",
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Tab 3</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {/* Reemplaza el mapeo de projects con ProjectCard */}
                        {projects.map((project, index) => (
                          <HomeCard
                            key={index}
                            title={project.title}
                            description={project.description}
                            imgUrl={project.imgUrl}
                          />
                        ))}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="section">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      {/* Aquí puedes añadir la imagen de fondo si es necesario */}
    </section>
  )
}

export default Home;
