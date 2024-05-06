import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from './assets/logo1.png';
import { HashLink } from 'react-router-hash-link';
import {BrowserRouter as Router} from "react-router-dom";

export const NavBar = () => {

  //Define state variables for active link and scroll status
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // useEffect hook to handle scroll events
  useEffect(() => {
    const onScroll = () => {
      // Check if the vertical scroll position is greater than 50 pixels
      if (window.scrollY > 50) {
        setScrolled(true); // If scrolled more than 50 pixels, set 'scrolled' state to true
      } else {
        setScrolled(false); // If not scrolled more than 50 pixels, set 'scrolled' state to false
      }
    }

    // Add event listener for scroll event
    window.addEventListener("scroll", onScroll);
    
    // Cleanup function to remove event listener when component unmounts
    return () => window.removeEventListener("scroll", onScroll);
  }, []) // Empty dependency array means this effect runs only once after initial render
  
  // Function to update active link state
  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  //router:  It wraps around the application's routes and enables navigation between different components based on the URL.
  //navbar: a custom component, possibly a navigation bar, which is rendered at the top of the application. It seems to accept a prop called expand with the value "md", which might control the layout or behavior of the navigation bar at certain screen sizes.
  //className={scrolled ? "scrolled" : ""}: This sets the className prop of the <Navbar> component dynamically based on the value of the scrolled state variable. If scrolled is true, it adds the class "scrolled" to the Navbar component, which presumably applies some styling to indicate that the user has scrolled the page. If scrolled is false, it doesn't add any additional classes.
  
  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          {/* /:This sets the hyperlink reference (href) attribute of the <Navbar.Brand> to /, which usually represents the root URL of the application. Clicking on the brand/logo will navigate the user back to the homepage. */}
          <Navbar.Brand href="/">
            <img src={logo} alt="Ripipsa" />
          </Navbar.Brand>

          {/*<Navbar.Toggle>: This is a component provided by React Bootstrap for toggling the navigation menu on smaller screens, typically when the menu is collapsed into a mobile-friendly format. It's a button that users can click or tap to expand or collapse the menu.*/}
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          {/*<Navbar.Collapse id="basic-navbar-nav">: This is a component provided by React Bootstrap used to wrap the collapsible content of the navbar. It typically includes the navigation links that collapse into a dropdown menu on smaller screens. */}
          <Navbar.Collapse id="basic-navbar-nav">
            {/*<Nav className="ms-auto">: This is a component provided by React Bootstrap for rendering a list of navigation items. The class ms-auto is a Bootstrap utility class that aligns the navigation items to the right. */}
            <Nav className="ms-auto">
              {/*Nav.Link is a React B used for navigation links. Each Nav.Link represents a clickable item */}
              {/*href are the attributes of the navigation links. They specify the target location within the same page using anchor ids*/}
              {/*className dynamically sets the class name of each navigation link based on the activeLink state variable. If the activeLink matches the current link (e.g., 'home', 'skills', or 'projects'), it adds the classes 'active navbar-link' to apply styling for the active link. Otherwise, it only applies the class 'navbar-link'. */}
              {/*These are onClick event handlers attached to each navigation link. They call the onUpdateActiveLink function with the corresponding link identifier when the link is clicked. This function is used to update the activeLink state variable, indicating which link is currently active. */}
              <Nav.Link href="#registroproyecto" className={activeLink === 'registroproyecto' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('registroproyecto')}>Registrar Proyecto</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <HashLink to='#connect'>
                <button className="vvd"><span>Log Out</span></button>
              </HashLink>
            </span>
            {/*<span className="navbar-text">: This is an inline element (<span>) with the class name "navbar-text". It's likely used to style text within the navigation bar.
            <HashLink to='#connect'>: This is a component provided by the react-router-hash-link library, which allows smooth scrolling to anchor links within the same page when using React Router. It's similar to <Link> from React Router, but it supports hash links.
            to='#connect': This sets the to prop of the <HashLink> to '#connect', indicating that clicking this link will navigate to the element with the ID 'connect' within the same page.
            <button className="vvd">: This is a button element with the class name "vvd". It's likely a custom class for styling purposes.
            <span>Let’s Connect</span>: This is the text content of the button, which says "Let’s Connect". It's wrapped in a <span> element, which can be styled separately if needed. */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}