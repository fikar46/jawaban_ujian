import React, { Component} from 'react';
// import Header from "./folder/header";
import Carousell from "./folder/carousel";
import Home from './folder/home';


class Homepage extends Component{
    render(){
        return(
            <div>
                
                <Carousell/>
                <Home/>
                
                

            </div>
        )
    }
}
export default Homepage;