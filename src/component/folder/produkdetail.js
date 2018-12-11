import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import {Redirect}from 'react-router-dom';
import { select_produk } from '../../actions';
const now = new Date().toLocaleString();
class ProdukDetail extends Component {
    state= {
        listProduk: []
    };
    getCartList=()=>{
        axios.get(`http://localhost:1997/cart?username=${this.props.username}`)
        .then((data)=> {
            console.log(data.data)
            this.setState({listProduk:data.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnAddClick=()=>{
        var params = queryString.parse(this.props.location.search)
        var username= this.refs.usernameAdd.value;
        var produkid = params.produkid;
        var namaproduk= params.namaproduk;
        var image = this.props.produk.image;
        var harga = this.props.produk.harga;
        var jumlah = this.refs.jumlahAdd.value;
        var totalharga= harga*jumlah;
        var date = now;
        if(this.state.listProduk.produkid === params.produkid){
            axios.put(`http://localhost:1997/cart?username=${this.props.username}`,{
            username, produkid,namaproduk, image, harga, jumlah,totalharga, date
        }).then((res)=>{
            window.location.reload();
        }).catch((err)=>{
            console.log(err)
        })
        }else{
            axios.post('http://localhost:1997/cart',{
            username, produkid,namaproduk, image, harga, jumlah,totalharga, date
             }).then((res)=>{
                 window.location.reload();
            }).catch((err)=>{
            console.log(err)
            })
        }
        
    }
    componentDidMount() {
        this.getCartList();
        console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var produkId = params.produkid;
        // var popokId = this.props.match.params.id;
        axios.get(`http://localhost:1997/produk/${produkId}`)
            .then((res) => {
                this.props.select_produk(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
     render() {
        var { namaproduk, harga, image, description, caption } = this.props.produk;
        return(
            <div className="main container-fluid">
                <div className="row">
                    <div className="col-4">
                        <img alt={image} src={image} className="img-responsive" />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h1>{namaproduk}</h1>
                        </div>
                        <div className="row">
                            <h3>{caption}</h3>
                        </div>
                        <div className="row">
                            <h2>Rp. {harga}</h2>
                        </div>
                        <div className="row">
                            <p>{description}</p>
                        </div>
                        <div className="row">
                            <input ref="usernameAdd" type="hidden" value={this.props.username} />   
                        </div>
                        <div className="row">
                            <input ref="jumlahAdd" type="number" placeholder="jumlah yang ingin dibeli" />   
                        </div>
                        <div className="row">
                            <input onClick={this.onBtnAddClick} type="button" className="btn btn-button--success" value="Add to cart"/>
                        </div>
                    </div>
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

export default connect(mapStateToProps, { select_produk })(ProdukDetail);