import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../../actions/users';
import IdleTimer from 'react-idle-timer';
import Image from 'react-bootstrap/Image';
import Logo from './images/thearqive_white_color_logos.png';
import styles from '../styles/styles.css';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from 'react-bootstrap';
function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState('collapse navbar-collapse');
  const [activePages, setActivePages] = useState({
    faq: false,
    aboutUs: false,
    supportUs: false,
    resources: false,
    contactUs: false,
  });

  let location = useLocation();
  const toggle = () => {
    console.log(isDropdownOpen);
    setIsDropdownOpen(!isDropdownOpen);

    setDropdownOpen(
      dropdownOpen == 'collapse navbar-collapse'
        ? 'navbar-collapse collapse show'
        : 'collapse navbar-collapse',
    );
    console.log(typeof dropdownOpen);
    setDropdownOpen(!dropdownOpen);
    console.log(isDropdownOpen);
  };

  useEffect(() => {
    const currentPage = location.pathname;
    if (currentPage === '/faq') {
      setActivePages({
        faq: true,
        aboutUs: false,
        supportUs: false,
        resources: false,
        contactUs: false,
      });
    } else if (currentPage === '/About') {
      setActivePages({
        faq: false,
        aboutUs: true,
        supportUs: false,
        resources: false,
        contactUs: false,
      });
    } else if (currentPage === '/support') {
      setActivePages({
        faq: false,
        aboutUs: false,
        supportUs: true,
        resources: false,
        contactUs: false,
      });
    } else if (currentPage === '/resources') {
      setActivePages({
        faq: false,
        aboutUs: false,
        supportUs: false,
        resources: true,
        contactUs: false,
      });
    } else if (currentPage === '/ContactUs') {
      setActivePages({
        faq: false,
        aboutUs: false,
        supportUs: false,
        resources: false,
        contactUs: true,
      });
    } else {
      setActivePages({
        faq: false,
        aboutUs: false,
        supportUs: false,
        resources: false,
        contactUs: false,
      });
    }
  }, [location.pathname]);

  const idleTimer = useRef(null);

  // Redirect users to a blank page for privacy reasons on idle
  const onIdle = (e) => {
    dispatch(logout());
    window.location.replace('about:blank');
  };

  const toggleAnonymous = () => {
    const is_anonymous_active = !user.is_anonymous_active;

    const userData = { is_anonymous_active };
    dispatch(editUser(user.id, user.id, userData));
  };

  let accessibilityWidget = document.body.getElementsByClassName('userway')[0];

  if (accessibilityWidget) {
    accessibilityWidget.style.visibility = 'hidden';
  }
  let userRole = '';
  let adminManager = null;
  let actual_username = '';
  if (user !== null) {
    if (actual_username == '') {
      actual_username = user.username;
    }

    if (user.accessibility_mode_active) {
      if (accessibilityWidget !== undefined) {
        accessibilityWidget.style.visibility = 'visible';
      }
    } else {
      if (accessibilityWidget !== undefined) {
        accessibilityWidget.style.visibility = 'hidden';
      }
    }
    if (user.is_administrator) {
      adminManager = (
        <li className='nav-item'>
          <Link to='/manage' className='nav-link header-dropdown-nav-item'>
            Management
          </Link>
        </li>
      );
      userRole = <strong>(Administrator)</strong>;
    } else if (user.is_moderator) {
      adminManager = (
        <li className='nav-item'>
          <Link to='/manage' className='nav-link header-dropdown-nav-item'>
            Management
          </Link>
        </li>
      );
      userRole = <strong>(Moderator)</strong>;
    }
  } else {
    if (accessibilityWidget !== undefined) {
      accessibilityWidget.style.visibility = 'hidden';
    }
  }
  const authLinks = () => {
    return (
      <>
        <FormGroup className='nav-link ml-auto'>
          <FormControlLabel
            style={{ color: 'white' }}
            control={
              <Switch
                checked={isAuthenticated ? user.is_anonymous_active : true}
                onChange={toggleAnonymous}
                aria-label='Anon'
              />
            }
            label={
              isAuthenticated && user.is_anonymous_active
                ? 'Anonymous on'
                : 'Anonymous off'
            }
          />
        </FormGroup>

        <Nav.Link className='userDropdown'>
          <Dropdown
            className='header-dropdown'
            outline
            isOpen={isDropdownOpen}
            nav={true}
            onClick={toggle}>
            <DropdownToggle
              caret
              className='header-user-dropdown-button header-nav-link'>
              {user ? (
                <span>
                  Welcome &nbsp;
                  <span className={'header-nav-username'}>
                    {user.is_anonymous_active ? 'Anonymous' : user.username}
                  </span>
                </span>
              ) : (
                ''
              )}{' '}
              <span className={'header-nav-username'}>{userRole}</span>{' '}
            </DropdownToggle>
            <DropdownMenu className='header-user-dropdown-menu'>
              <DropdownItem>
                <Link
                  to={user ? `/users/${actual_username}` : ' '}
                  className='nav-link header-dropdown-nav-item'>
                  Profile
                </Link>
              </DropdownItem>
              {adminManager ? <DropdownItem>{adminManager}</DropdownItem> : ''}
              <DropdownItem>
                <li className='nav-item'>
                  <button
                    onClick={() => dispatch(logout())}
                    className='nav-link btn btn-link header-dropdown-nav-item'>
                    Logout
                  </button>
                </li>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav.Link>
      </>
    );
  };

  const GuestLinks = () => {
    return (
      <>
        <Nav.Link>
          <Link
            onClick={() => setExpanded(false)}
            to='/register'
            className='nav-link header-nav-link'>
            Register
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link
            onClick={() => setExpanded(false)}
            to='/login'
            className='nav-link header-nav-link'>
            Login
          </Link>
        </Nav.Link>
      </>
    );
  };

  const [expanded, setExpanded] = useState(false);
  const useStyles = makeStyles((theme) => ({
    navHeight: {
      height: '130px',
      padding: '0px',
    },
    labelHeight: {
      height: 'fit-content',
    },
  }));
  const classes = useStyles();
  return (
    <Navbar className='site-header' expanded={expanded} fixed='top' expand='lg'>
      <Container fluid className={classes.navHeight}>
        <Link to='/'>
          <Navbar.Brand>
            <Image src={Logo} height={'108px'} />
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle
          onClick={() => setExpanded(expanded ? false : 'expanded')}
          aria-controls='basic-navbar-nav'
        />
        <IdleTimer
          ref={(ref) => (idleTimer.current = ref)}
          element={document}
          onIdle={onIdle}
          debounce={250}
          //15 minutes
          timeout={15 * 60 * 1000}
        />

        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='w-100 justify-content-around'>
            <Link
              onClick={() => setExpanded(false)}
              to='/faq'
              className={
                activePages['faq']
                  ? 'nav-link header-nav-link faq-header-nav-link'
                  : 'nav-link header-nav-link faq-header-nav-link'
              }>
              {' '}
              Faq{' '}
            </Link>

            <Link
              to='/About'
              onClick={() => setExpanded(false)}
              className={
                activePages['aboutUs']
                  ? 'about-us-header-active nav-link header-nav-link about-us-header-nav-link'
                  : 'nav-link header-nav-link about-us-header-nav-link'
              }>
              About Us{' '}
            </Link>

            <Link
              to='/support'
              onClick={() => setExpanded(false)}
              className={
                activePages['supportUs']
                  ? 'support-us-header-active nav-link header-nav-link support-us-nav-link'
                  : 'nav-link header-nav-link support-us-nav-link'
              }>
              Support Us{' '}
            </Link>

            <Link
              to='/resources'
              onClick={() => setExpanded(false)}
              className={
                activePages['resources']
                  ? 'resources-header-active nav-link header-nav-link resources-nav-link'
                  : 'nav-link header-nav-link resources-nav-link'
              }>
              Resources{' '}
            </Link>

            <Link
              to='/ContactUs'
              onClick={() => setExpanded(false)}
              className={
                activePages['contactUs']
                  ? 'contactUs-header-active nav-link header-nav-link contact-us-nav-link '
                  : 'nav-link header-nav-link contact-us-nav-link '
              }>
              Contact Us{' '}
            </Link>
            <div className='userLogin'>
              {isAuthenticated ? authLinks() : GuestLinks()}
            </div>
          
          </Nav>
    
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
