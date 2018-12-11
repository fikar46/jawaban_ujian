import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Redirect}from 'react-router-dom';
const now = new Date().toLocaleString();;
// now.getHours();
// now.getMinutes();
// now.getSeconds();
class Diskusi extends Component{
    state= {
        listPost: [],
        selectedEdit:0,
        searchUser:[]
    };
    
    componentDidMount(){
        this.getPostList();
    }
    getPostList=()=>{
        axios.get('http://localhost:1997/post')
        .then((data)=> {
            console.log(data.data)
            this.setState({listPost:data.data, selectedEdit:0})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnAddClick=()=>{
        var username = this.refs.usernameAdd.value;
        var post = this.refs.postAdd.value;
        var date = this.refs.dateAdd.value;

        axios.post('http://localhost:1997/post',{
            username, post, date
        }).then((res)=>{
            window.location.reload();
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnEditClick=(id)=>{
        var username = this.refs.usernameEdit.value;
        var post = this.refs.postEdit.value;
        var date = this.refs.dateEdit.value;

        axios.put('http://localhost:1997/post/'+id,{
            username, post, date
        }).then((res)=>{
            this.getPostList();
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnDeleteClick=(id)=>{
        if(window.confirm('Apakah anda yakin ingin menghapusnya?')){
            axios.delete('http://localhost:1997/post/'+id)
                .then((res)=>{
                    this.getPostList();
                }).catch((err)=>{
                    console.log(err)
                })
        }
    }
    
    renderListProduk = ()=>{
        var timeline= this.state.listPost.sort(function(a, b) {
            var dateA = new Date(a.date), dateB = new Date(b.date);
            return dateB - dateA;
        });
        
    var listJSXProduk = timeline.map((item)=>{
        if( item.username === this.props.username){
            if(item.id !== this.state.selectedEdit){
                return(
                    <div className="postan-user">
                        <div className="username-item">{item.username} <div className="date-post">{item.date}</div></div>
                       <div className="post-item">{item.post}</div> 
                       {/* <div className="post-item">{item.komentar[0].post_komentar}</div>  */}
                       <div className="tombol-edit">
                       
                        <p onClick={()=> this.setState({selectedEdit: item.id})}  className="editlink">Edit</p>
                        <p onClick={()=> this.onBtnDeleteClick(item.id)}  className="deletelink">Delete</p>
                        </div>
                    </div>
                    )
            }
            return(
                <div className="postan-user">
                    
                    <input type="hidden" defaultValue={item.username} ref="usernameEdit"/>
                    <input type="text" defaultValue={item.post} ref="postEdit"/>
                    <input type="hidden" defaultValue={now} ref="dateEdit"/>
                    <div className="button-edit-pots">
                    <input onClick={()=> this.onBtnEditClick(item.id)} type="button" value="Submit" className="btn btn-primary"/>
                    <input onClick={()=> this.setState({selectedEdit:0})} type="button" value="Cancel" className="btn btn-danger"/>
                    </div>
                    </div>
                )
        }
        return(
            <div className="postan-user">
                <div className="username-item">{item.username}  <div className="date-post">{item.date}</div></div>
               <div className="post-item">{item.post}</div> 
              
            </div>
            )

            
            
        })
        return listJSXProduk
    }
    render(){
        if(this.props.username === ''){
            return<Redirect to="/login"/>
        }else{
        return(
            <div className="container-fluid main"> 
                <h1>Diskusikan disini yuk</h1>
                <div className="input-post">
                    <input ref="usernameAdd" type="hidden" value={this.props.username} />
                    <input ref="dateAdd" type="hidden" value={now} /> 
                    <textarea ref="postAdd" type="text" className="text-area-inputpost" placeholder="Diskusikan sesuatu"/>
                    <input onClick={this.onBtnAddClick} type="button" className="btn btn-button-success tombol-post" value="Post"/>
                </div>
                <div className="post-timeline">
                {this.renderListProduk()} 
                </div>
                
                
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
export default  connect(mapStateToProps, null)(Diskusi);










