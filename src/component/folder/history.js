import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect}from 'react-router-dom';
const now = new Date().toLocaleString();
const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class Histori extends Component{
    state= {
        listProduk: [],
        selectedEdit:0
    };
    componentDidMount(){
        this.getCartList();
    }
    getCartList=()=>{
        axios.get(`http://localhost:1997/history?username=${this.props.username}`)
        .then((data)=> {
            console.log(data.data)
            this.setState({listProduk:data.data, selectedEdit:0})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnEditClick=(id)=>{
        var username= this.refs.usernameEdit.value;
        var produkid = this.refs.produkidEdit.value;
        var namaproduk= this.refs.namaEdit.value;
        var image =this.refs.imageEdit.value;
        var harga = this.refs.hargaEdit.value;
        var jumlah = this.refs.jumlahEdit.value;
        var totalharga = harga*jumlah;
        var date= now;
        axios.put('http://localhost:1997/history/'+id,{
            username, produkid,namaproduk, image, harga, jumlah,totalharga, date
        }).then((res)=>{
            this.getCartList();
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    renderListProduk = ()=>{
        var listJSXProduk = this.state.listProduk.map((item)=>{
            if(item.id !== this.state.selectedEdit){
                for(let i=0; i<=this.state.listProduk.length; i++){
                return(
                    
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.order[i].username}</td>
                        <td>{item.order[i].date}</td>
                        <td>{item.order[i].jumlah}</td>
                        <td>{item.order[i].totalharga}</td>
                        <td><input onClick={()=> this.setState({selectedEdit: item.id})} type="button" value="detail" className="btn btn-primary"/></td>        
                    </tr>
                    )}
            }
            return<Redirect to={`/detailtransaksi?transaksiid=${item.id}`}/>
        })
        return listJSXProduk
    }
    renderTotalcart=()=>{
        var total = 0
        for(let i = 0; i < this.state.listProduk.length ; i++){
          total += this.state.listProduk[i].totalharga
        }
        return(
          <div className='col-2'>
          <h3>{rupiah.format(total)}</h3>
           <input className="btn-primary" type='button' value='CHECKOUT' onClick ={this.renderCheckOut}/>
          </div>
        )
    }
    renderCheckOut = () => {
        if(window.confirm('Apakah anda yakin ingin checkout? adaduit ga')){
        axios.post('http://localhost:1997/history', {
          username : this.props.username,
          order : this.state.listProduk
        })
        .then((res) => {
          console.log(res)
          for(let i = 0 ; i < this.state.listProduk.length ; i ++){
            axios.delete('http://localhost:1997/cart/' + this.state.listProduk[i].id    
            ).then((res) => {
              console.log(res)     
              this.renderListProduk()      
            })
          }
        
        })
    }
      }
    render(){
        if(this.state.listProduk.length > 0){
        return(
            <div className="main">
                <div className="container-fluid"> 
                <h1>Cart {this.props.username}</h1>
                <table className="tableadmin">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>username</th>
                            <th>Tanggal transaksi</th>
                            <th>total item</th>
                            <th>total harga</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderListProduk()} 
                    </tbody>
                </table>
                
            </div>
            </div>
        );
        }else{
            return(
                <center >
                  <div className='main'>
                  <h1>Keranjang anda kosong</h1>
                  <a href='/onthemenu'><button type="button" className='btn-primary'>Lanjutkan Belanja</button></a>          
                  </div>
                </center>
              )
        }
    }
}
const mapStateToProps = (state) => {
    return{
      username : state.auth.username
    }
  }
  
  export default connect(mapStateToProps)(Histori)
