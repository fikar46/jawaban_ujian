import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {onUserLogout,keepLogin} from "../../actions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import Cookies from "universal-cookie";
  const cookies = new Cookies();
 class Header extends Component {
  state = { listUser:[], searchListUser: [] }
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  componentDidMount() {
    axios.get('http://localhost:1997/users')
        .then((res) => {
            this.setState({ listUser: res.data, searchListUser: res.data })
        }).catch((err) => {
            console.log(err)
        })
}
  onLogOutSelect=()=>{
    this.props.onUserLogout();
    cookies.remove('dataUser');
  }
  onBtnSearchClick = () => {
    var username = this.refs.searchNama.value;
    var arrSearch = this.state.listUser.filter((item) => {
      return item.username.toLowerCase().includes(username.toLowerCase())
  })
  
  this.setState({ searchListUser: arrSearch })
}


  render() {
    if(this.props.username === ''){
    return(
          <div class="header">
            <Navbar  light expand="md">
            <Link to='/'><NavbarBrand style={{color:'black'}}>Boxfood</NavbarBrand></Link>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to='/about'><NavLink>About</NavLink></Link>
                  </NavItem>
                  <NavItem>
                  <Link to='/register'><NavLink>Register</NavLink></Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/login'><NavLink>Login</NavLink></Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
    );
      }
        return (
          <div class="header">
            <Navbar light expand="md">
              <a href='/homes'><NavbarBrand style={{color:'black'}}>Boxfood</NavbarBrand></a>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
              <NavItem>
                <form className="search-button-d">
                    <input type="text" className="form-input" ref="searchNama" placeholder="cari username" />
                    <input type="button" className="btn btn-success" value="Search" onClick={this.onBtnSearchClick} />
                 </form>
                </NavItem>
              </Nav>
                <Nav className="ml-auto" navbar>
                <NavItem>
                   <a href="/onthemenu"><NavLink>On The Menu</NavLink></a>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Hello, {this.props.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                    <a href="/cart"> <DropdownItem>
                        Cart
                      </DropdownItem></a>
                      <a href="/history"> <DropdownItem>
                        history
                      </DropdownItem></a>
                      <Link to='/'><DropdownItem>
                        Option
                      </DropdownItem></Link>
                      <DropdownItem divider />
                      <a href="/"><DropdownItem onClick={this.onLogOutSelect}>
                        Log Out
                      </DropdownItem></a>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
         );
      
   
    
  }
}

const mapStateToProps = (state) => {
  return{
    username:state.auth.username
  }
}

export default connect(mapStateToProps, {onUserLogout, keepLogin})(Header);