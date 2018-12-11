import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import {Redirect}from 'react-router-dom';
import { select_produk } from '../../actions';
const now = new Date().toLocaleString();
class HistoriDetail extends Component {
    state= {
        listProduk: []
    };
    componentDidMount() {
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var produkId = params.transaksiid;
        // var popokId = this.props.match.params.id;
        axios.get(`http://localhost:1997/history/${produkId}`)
            .then((res) => {
                this.setState({listProduk:data.data})
            }).catch((err) => {
                console.log(err)
            })
    }
    // renderdetail=()=>{
    //     var listJSXProduk = this.state.listProduk.map((item)=>{
    //     for(let i=0; i<this.state.listProduk; i++){
    //         return(
                
    //             <td>{item.order.id}</td>
    //             <td>{item.order.produkId}</td>
    //             <tr>{item.order.nama}</td>
    //             <tr>{item.order.image}</td>
    //             <tr>{item.order.harga}</td>
    //             <tr>{item.order.qty}</td>
    //         );
    //     }
    // })
    // return listJSXProduk
    // }
     render() {
        var { namaproduk, harga, image, description, caption } = this.props.produk;
        return(
            <div className="main">
                <div className="container-fluid"> 
                <h1>detail transaksi</h1>
                <table className="tableadmin">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>produkid</th>
                            <th>nama</th>
                            <th>image</th>
                            <th>harga</th>
                            <th>qty</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        
                    </tr>
                    </tbody>
                </table>
                
            </div>
            </div>
           
        )
    }
}

const mapStateToProps = (state) => {
    return { produk: state.selectedProduk,
             username:state.auth.username
            }
}

export default connect(mapStateToProps, { select_produk })(HistoriDetail);