import { Col } from "react-bootstrap";

export const ProjectCard = ({ Titulo, Empresa, imgUrl }) => {
  return (
  <Col xs={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} alt={Titulo} />
        <div className="proj-text">
          <h4>{Titulo}</h4>
          <span>{Empresa}</span>
        </div>
      </div>
    </Col>
  );
};
