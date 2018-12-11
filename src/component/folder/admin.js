import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Redirect}from 'react-router-dom';
class Admin extends Component{
    state= {
        listProduk: [],
        selectedEdit:0
    };
    componentDidMount(){
        this.getTryoutList();
    }
    getTryoutList=()=>{
        axios.get('http://localhost:1997/produk')
        .then((data)=> {
            console.log(data.data)
            this.setState({listProduk:data.data, selectedEdit:0})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnAddClick=()=>{
        var namaproduk = this.refs.namaAdd.value;
        var image = this.refs.imageAdd.value;
        var caption = this.refs.capAdd.value;
        var description= this.refs.descAdd.value;

        axios.post('http://localhost:1997/produk',{
            namaproduk, image, caption, description
        }).then((res)=>{
            this.getTryoutList()
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnEditClick=(id)=>{
        var namaproduk = this.refs.namaEdit.value;
        var image = this.refs.imageEdit.value;
        var caption = this.refs.capEdit.value;
        var description= this.refs.descEdit.value;

        axios.put('http://localhost:1997/produk/'+id,{
            namaproduk, image, caption, description
        }).then((res)=>{
            this.getTryoutList();
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnDeleteClick=(id)=>{
        if(window.confirm('Apakah anda yakin ingin menghapusnya?')){
            axios.delete('http://localhost:1997/produk/'+id)
                .then((res)=>{
                    this.getTryoutList();
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
                        <td>{item.caption}</td>
                        <td>{item.description}</td>
                        <td><img src={item.image} alt='img' className='image-admin'/> </td>
                        <td><input onClick={()=> this.setState({selectedEdit: item.id})} type="button" value="Edit" className="btn btn-primary"/></td>
                        <td><input onClick={()=> this.onBtnDeleteClick(item.id)} type="button" value="Delete" className="btn btn-danger"/></td>
                        
                    </tr>
                    )
            }
            return(
                <tr>
                    <td>{item.id}</td>
                    <td><input type="text" defaultValue={item.namaproduk} ref="namaEdit"/></td>
                    <td><input type="text" defaultValue={item.caption} ref="capEdit"/></td>
                    <td><input type="text" defaultValue={item.description} ref="descEdit"/></td>
                    <td><input type="text" defaultValue={item.image} ref="imageEdit"/></td>
                    <td><input onClick={()=> this.onBtnEditClick(item.id)} type="button" value="Submit" className="btn btn-primary"/></td>
                    <td><input onClick={()=> this.setState({selectedEdit:0})} type="button" value="Cancel" className="btn btn-danger"/></td>
                    
                </tr>
                )
            
        })
        return listJSXProduk
    }
    render(){
        if(this.props.username === ''){
            return<Redirect to="/login"/>
        }else{
        return(
            <div className="container-fluid"> 
                <h1>Menu Admin Tryout</h1>
                <table className="tableadmin">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama produk</th>
                            <th>Caption produk</th>
                            <th>Desc produk</th>
                            <th>Image</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderListProduk()} 
                    </tbody>
                    <tfoot>
                        <td>Input</td>
                        <td>
                            <input ref="namaAdd" type="text" placeholder="Nama Produk" />
                        </td>
                        <td>
                            <input ref="capAdd" type="text" placeholder="caption Produk"/>
                        </td>
                        <td>
                            <input ref="descAdd" type="text" placeholder="deskripsi"/>
                        </td>
                        <td>
                            <input ref="imageAdd" type="text" placeholder="Link image" /> 
                        </td>
                        <td>
                            <input onClick={this.onBtnAddClick} type="button" className="btn btn-button--success" value="submit"/>
                        </td>
                        <td></td>
                    </tfoot>
                </table>
                
            </div>
        );
        }
    
    }
}
const mapStateToProps = (state) => {
    return{
      username:state.auth.username
    }
  }
export default  connect(mapStateToProps, null)(Admin);










