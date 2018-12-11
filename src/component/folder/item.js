import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select_produk } from '../../actions';
class Item extends Component{
    onItemClick = () => {
        this.props.select_produk(this.props.produk);
    }

    render(){
        const {namaproduk,image,caption} = this.props.produk;
        return(
    <div onClick={this.onItemClick} className="container">    
        <div className="row">
          <div className="col-sm-4">
            <div className="panel panel-primary">
              <div className="panel-heading">{namaproduk}</div>
              <div className="panel-body"><img src={image} className="img-responsive" style={{width: '100%'}} alt="Image" /></div>
              <div className="panel-footer">{caption}</div>
            </div>
          </div>
        </div>
      </div>
        );
    }
}
export default connect(null, { select_produk })(Item);











