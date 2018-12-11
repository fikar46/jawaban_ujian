import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect}from 'react-router-dom';
import Item from './item';


class OnTheMenu extends Component{
    state= {
        listProduk: [], searchListProduk: []
    };
    componentDidMount(){
        axios.get('http://localhost:1997/produk')
        .then((data)=> {
            console.log(data.data)
            this.setState({listProduk:data.data,  searchListProduk: data.data })
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnSearchClick = () => {
        var nama = this.refs.searchNama.value;
        var hargaMin = parseInt(this.refs.hargaMinSearch.value);
        var hargaMax = parseInt(this.refs.hargaMaxSearch.value);
        var arrSearch = this.state.listProduk.filter((item) => {
            return  item.harga >= hargaMin
                    && item.harga <= hargaMax
                    && item.nama.toLowerCase().includes(nama.toLowerCase())
        })

        this.setState({ searchListProduk: arrSearch })
    }
    
    renderListProduk = ()=>{
        var total = 12;
        var size = 4;
        var check = true;
        var listJSXProduk = this.state.listProduk.map((item)=>{
            if(total === 0 && check === true) {
                size = 6;
                total = 12;
                check = false;
            }
            else if(total === 0 && check === false){
                size = 4;
                total = 12;
                check = true;
            }
            total -= size;
            return(
                <Item produk={item}/>
            )
        })
        return listJSXProduk
    }
    render(){
        if(this.props.username !== "") {
            if(this.props.produk.id !== 0) {
                return <Redirect to={`/produkdetail?produkid=${this.props.produk.id}&namaproduk=${this.props.produk.namaproduk}`} />
            }
            return (
                <div className="main">
                    <section className="bg-light" id="portfolio">
                        <div className="container-fluid">
                            <div className="row">
                            <div className="col-lg-12 text-center">
                                <h1 className="section-heading text-uppercase">Menu makanan minggu ini</h1>
                            </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <form>
                                        <input type="text" className="form-input" ref="searchNama" placeholder="Nama Popok" />
                                        Harga : <input type="number" ref="hargaMinSearch" defaultValue="0" /> - <input type="number" ref="hargaMaxSearch" defaultValue="9999999" />
                                        <input type="button" className="btn btn-success" value="Search" onClick={this.onBtnSearchClick} />
                                    </form>
                                </div>
                            </div>
                            <div className="main">
                                   {this.renderListProduk()}
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        return <Redirect to='/login' />
    }
}
const mapStateToProps = (state) => {
    return{
        username:state.auth.username,
        produk: state.selectedProduk
    }
    }
export default connect(mapStateToProps)(OnTheMenu);