import React, {Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect}from 'react-router-dom';
import Item from './item'


const percentage = 66;
class Homes extends Component{
    state= {
        listProduk: []
    };
    componentDidMount(){
        axios.get('http://localhost:1997/produk_child')
        .then((data)=> {
            console.log(data.data)
            this.setState({listProduk:data.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    renderListProduk = ()=>{
        var listJSXProduk = this.state.listProduk.map((item)=>{
            return(
                <Item produk={item}/>
            )
        })
        return listJSXProduk
    }
    render(){
        if(this.props.username === ''){
            return<Redirect to="/login"/>
        }else{
        return(
            <div className="main text-center">
                <h1 className='welcome-h1'>Selamat datang {this.props.username}</h1>

            </div>
        )
        }
    }
}
const mapStateToProps = (state) => {
    return{
      username:state.auth.username,
      email:state.auth.email
    }
  }
export default connect(mapStateToProps, null)(Homes);
