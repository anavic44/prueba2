import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'animate.css';
import { ButtonToolbar } from 'react-bootstrap';
import TrackVisibility from 'react-on-screen';
import ColorSharp2 from "../assets/img/color-sharp2.png";
import { NavBar } from './NavBar';  // Asegúrate de que la ruta es correcta
import 'animate.css';
import { ProjectCard } from "./ProjectCard";
import { Link } from 'react-router-dom';
import { Col, Container, Tab, Row, Nav } from "react-bootstrap";
import { NgrokUrl } from './NgrokUrl';

export const RegistrarProyecto = () => {
  const [projects, setProjects] = useState([]);
  const [proyecto, setProyecto] = useState(0);
  const { userId } = useParams(); // Asumiendo que hay un parámetro de usuario en la ruta
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {

    const fetchProyectos = async () => {
      try {
        const { data } = await axios.get('https://${NgrokUrl}/api/load-all-objects');
        console.log(data.projects)
	console.log(data)
        setProjects(data);
	console.log(projects)      
      } catch (error) {
        console.log('Error fetching projects', error);
      }
    };
    console.log(proyecto)
    
    fetchProyectos();
  }, []);

  const handleSelectProject = async () => {
   
    
    try {
      const id_usuario= userId
      const id_objeto= proyecto
      await axios.post('https://${NgrokUrl}/api/EscenaObjeto', {
        id_usuario,
        id_objeto
      });
      console.log("Proyecto agregado")
      navigate('/projects/${userId}'); // Ruta donde el usuario puede ver sus proyectos
    } catch (error) {
      console.error('Error saving projects', error);
    }
  };
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    
};

  const proyectoUpdate = (id) => {
    setProyecto((current) => current*0+id)
  }

  return (
    <div>
        <NavBar />  
        
        <section className="Project" id="projects">
            <Container>
                <Row>
                    <Col size={12}>
                    <TrackVisibility>
                    {({ isVisible }) => (
                    <div className={isVisible ? "animate_animated animate_fadeIn" : ""}>
                      
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
                            <Tab.Content id="slideImUp" className={isVisible ? "animate_animated animate_slideInUp" : ""}>
                                <Tab.Pane eventKey="first">
                                    <Row>
                                    <button onClick = {
                                            
                                            () => {
                                                  handleSelectProject()}
                                          }style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none' }}> Agregar Proyecto</button>
                                           
                                        {projects.map((project) => (
                                           
                                            <Col xs={12} sm={6} md={4} key ={project.id_objeto}>
                                               <div >
                                            <ProjectCard 
                                                
                                                {...project}

                                            />
                                            <label>
                                              <input
                                                  type="radio"
                                                  name="radioGroup"
                                                  value={project.Titulo}
                                                  checked={selectedValue === project.Titulo}
                                                  onChange={(e)=> {handleChange(e)
                                                    proyectoUpdate(project.id_objeto)
                                                  }}

                                              />
                                              {project.Titulo}
                                          </label>
                                            
                                     
                                             </div>
                                            </Col>
                                           
                                        ))}
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="section">
                                    <p>Agrega mas proyectos</p>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <p>Agrega mas proyectos</p>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                    )}
                    </TrackVisibility>
                    </Col>
                </Row>
            </Container>
            {/* <img className="background-image-right" src={ColorSharp2} alt="Decorative"></img> */}
        </section>
    </div>
);
};