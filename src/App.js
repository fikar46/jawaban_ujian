import React, { Component } from 'react';
import './App.css';
import './support/css/style.css';
import Header from './component/folder/header';
// // import Content from './component/Content';
// import Footer from './component/Footer';
// import { Button } from 'reactstrap';
import './support/css/bootstrap.css';
import Login from './component/folder/login';
// import InputLogin from './component/inputlogin';
import {Route} from 'react-router-dom';
// import Carousell from './component/carousel';
// import Home from './component/home';
import About from './component/about';
import Homepage from './component/landingpage';
import Register from './component/folder/register';
import Homes from './component/folder/homes';
import {connect} from 'react-redux';
import './support/css/footer.css';
import './support/css/animation.css';
import './support/css/hover.css';
import Cookies from "universal-cookie";
import {keepLogin,cookieChecked} from './actions';
import {withRouter} from 'react-router-dom';
import Admin from './component/folder/admin';
import Footer from './component/folder/Footer';
import OnTheMenu from './component/folder/onthemenu';
import ProdukDetail from './component/folder/produkdetail';
import Cart from './component/folder/cart';
import Histori from './component/folder/history';
const cookies = new Cookies();
class App extends Component {
  componentDidMount(){
    const cookienya = cookies.get("dataUser");
    if(cookienya!== undefined){
      this.props.keepLogin(cookienya);
    }else{
      this.props.cookieChecked()
    }
}
  render() {
    if(this.props.cookie){
      return (
        <div>
          
          <Header/>
          
          <Route exact path='/' component={Homepage}/>
          <Route path='/login' component={Login}/>
          <Route path = '/register' component = {Register}/>
          <Route  path='/about' component={About}/>
          <Route path='/homes' component={Homes}/>
          <Route path='/admin' component={Admin}/>
          <Route path='/onthemenu' component={OnTheMenu}/>
          <Route path='/produkdetail' component={ProdukDetail}/>
          <Route path='/cart' component={Cart}/>
          <Route path='/history' component={Histori}/>
          <Footer />
          
        </div>
      );
    }
    return(<div><center><h1>Loading...</h1></center></div>);
    
  }
}
const mapStateToProps =(state)=>{
  return {
      cookie: state.auth.cookie
  };
}
export default withRouter(connect(mapStateToProps, {keepLogin,cookieChecked})(App));


//redux
//global state itu object berlaku global
//jalur kiri redux itu ==>

//MapStateToProps

//sebuah function yang terima 1 parameter yaitu global statenya, berfungsi untuk mengubah state tersebut menjadi props di component dimana dia ada

//kalo jalur kanan tahap tahapnya adalah dari component ke action creator ke reducer ke global state
//action creator adalah sebuah function yang  menerima sebuah parameter dari componnent(jumlah parameter bebas), berfungsi
//untuk membuat action dan mengirim action tersebut ke reducer
//action sebuah object javascript biasa, yang biasanya memiliki 2 property uaitu (type dan payload)
//type: isinya itu string (bertugas untuk memberi tahu reducer untuk open action tersebut untuk apa)
//payload: isinya adaah apapun yang mau dikirim untuk ubah global state

//reducer
//sebuah funtion yang menerima 2 parameter 
//parameter 1 adalaha property state terakhir
//parameter 2 adalah action dari action creator

// state={
//   username: username Reducer,
//   password: password Reducer,
//   pikachu: pikachu Reducer,
// }

// 1 property dari global state diisi oleh 1 reducer