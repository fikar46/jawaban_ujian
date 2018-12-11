import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect}from 'react-router-dom';
const now = new Date().toLocaleString();
const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class Cart extends Component{
    state= {
        listProduk: [],
        selectedEdit:0
    };
    componentDidMount(){
        this.getCartList();
    }
    getCartList=()=>{
        axios.get(`http://localhost:1997/cart?username=${this.props.username}`)
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
        axios.put('http://localhost:1997/cart/'+id,{
            username, produkid,namaproduk, image, harga, jumlah,totalharga, date
        }).then((res)=>{
            this.getCartList();
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnDeleteClick=(id)=>{
        if(window.confirm('Apakah anda yakin ingin menghapusnya?')){
            axios.delete('http://localhost:1997/cart/'+id)
                .then((res)=>{
                    this.getCartList();
                }).catch((err)=>{
                    console.log(err)
                })
        }
    }
    
    renderListProduk = ()=>{
        var listJSXProduk = this.state.listProduk.map((item)=>{
            if(item.id !== this.state.selectedEdit){
                return(
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.namaproduk}</td>
                        <td><img src={item.image} alt='img' className='image-admin'/> </td>
                        <td>{item.harga}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.totalharga}</td>
                        <td><input onClick={()=> this.setState({selectedEdit: item.id})} type="button" value="Edit" className="btn btn-primary"/></td>
                        <td><input onClick={()=> this.onBtnDeleteClick(item.id)} type="button" value="Delete" className="btn btn-danger"/></td>
                        
                    </tr>
                    )
            }
            return(
                <tr>
                   <td>{item.id}</td>
                   <input type="hidden" value={item.username} ref="usernameEdit"/>
                   <input type="hidden" value={item.namaproduk} ref="namaEdit"/>
                   <input type="hidden" value={item.image} ref="imageEdit"/>
                   <input type="hidden" value={item.harga} ref="hargaEdit"/>
                   <input type="hidden" value={item.produkid} ref="produkidEdit"/>
                    <td>{item.namaproduk}</td>
                    <td><img src={item.image} alt='img' className='image-admin'/> </td>
                    <td>{item.harga}</td>
                    <td><input type="text" defaultValue={item.jumlah} ref="jumlahEdit"/></td>
                    <td>{item.totalharga}</td>
                    <td><input onClick={()=> this.onBtnEditClick(item.id)} type="button" value="Submit" className="btn btn-primary"/></td>
                    <td><input onClick={()=> this.setState({selectedEdit:0})} type="button" value="Cancel" className="btn btn-danger"/></td>
                    
                </tr>
                )
            
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
                            <th>Nama produk</th>
                            <th>Image</th>
                            <th>harga</th>
                            <th>QTY</th>
                            <th>Total</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderListProduk()} 
                    </tbody>
                </table>
                <div className="total-harga">
                   {this.renderTotalcart()}
                </div>
                
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
  
  export default connect(mapStateToProps) (Cart)
