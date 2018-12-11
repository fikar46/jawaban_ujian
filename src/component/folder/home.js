import React, { Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {CardImg} from 'reactstrap';

class Home extends Component{
    state= {
        listProduk: []
    };
    componentWillMount(){
        axios.get('http://localhost:1997/produk')
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
                <div>
                    <div className='box'>
                        <h3>{item.nama_produk}</h3>
                        <div className='description'>
                            <p>{item.description}</p>
                        </div>
                    </div>
                </div>
            )
        })
        return listJSXProduk
    }
    render(){
        return(
            <div className='home'>
                <center>
                    <div className='judul'>
                        <h2> 
                    Pilih paket belajar yang sesuai
                        </h2>
                    </div>
                    {this.renderListProduk()}
                        
                    
                </center>
            <div className="sekat">
                <div className='info-header'>
                    <h2 className='h2-info'>A Groundbreaking Learning Experience</h2>
                        <div  className="info-header-b_dash">
                            <center>   <div className="dash"></div></center> 
                        </div>
                    <p className="info-header-b_subtitle">Thrive in an immersive learning environment that brings together leading academics and industry visionaries.</p>
                </div>
            </div>
            <div className="sekat">
                <div className="penjelasan-1">
                 <CardImg src="https://www.udacity.com/assets/iridium/images/new-home/experiments/home-b/img-curriculum-2x.jpg" className='gambar-penjelasan1'></CardImg>
                <div className='text-penjalasan1'>
                <div className="dash"></div>
                    <h3 className="info-section__title">Immersive Curriculum</h3>
                    <p className="info-section__description">Hands-on learning, interactive content, measurable progress.</p>
                </div>
                </div>
            </div>
            <div className="sekat">
                <div className="penjelasan-1">
                 <CardImg src="https://www.udacity.com/assets/iridium/images/new-home/experiments/home-b/img-projects-2x.jpg" className='gambar-penjelasan2'></CardImg>
                <div className='text-penjalasan2'>
                <div className="dash"></div>
                    <h3 className="info-section__title">Immersive Curriculum</h3>
                    <p className="info-section__description">Hands-on learning, interactive content, measurable progress.</p>
                </div>
                </div>
            </div>
            <div className="sekat">
                <div className="penjelasan-1">
                 <CardImg src="https://www.udacity.com/assets/iridium/images/new-home/experiments/home-b/img-career-2x.jpg" className='gambar-penjelasan1'></CardImg>
                <div className='text-penjalasan1'>
                <div className="dash"></div>
                    <h3 className="info-section__title">Immersive Curriculum</h3>
                    <p className="info-section__description">Hands-on learning, interactive content, measurable progress.</p>
                </div>
                </div>
            </div>
            <div className="sekat">
                <div className="penjelasan-1">
                 <CardImg src="https://www.udacity.com/assets/iridium/images/new-home/experiments/home-b/img-support-2x.jpg" className='gambar-penjelasan2'></CardImg>
                <div className='text-penjalasan2'>
                <div className="dash"></div>
                    <h3 className="info-section__title">Immersive Curriculum</h3>
                    <p className="info-section__description">Hands-on learning, interactive content, measurable progress.</p>
                </div>
                </div>
            </div>
            <div className="wrapper ng-star-inserted" style={{backgroundImage: 'url("https://www.udacity.com/assets/iridium/images/new-home/experiments/home-b/img-middle.jpg")'}}>
                <div className="contain contain--small">
                    {/**/}
                    <section className="cta-banner-a ng-star-inserted">
                        <h2 className="cta-banner-a__title">Ready to begin?</h2>
                            <p className="cta-banner-a__subtitle">Enroll in a program and build your best future, today.</p>
                                <div className="cta-banner-a__button">
                                    <a className="button--white" href="/register"> Sign Up </a>
                                </div>
                    </section>{/**/}
                </div>
            </div>
        </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        blackpink: state.blackpink
    };
}
export default connect(mapStateToProps)(Home);