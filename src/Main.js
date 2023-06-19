import React from 'react';
import './grid.css'
import myImage from "./1069102.jpg"

function Main(){
   return(
    <div className="cont" >
    
  <div className="bav row row-cols-1 ">
    <div className="col d-flex justify-content-center align-items-center"><input placeholder='type'></input></div>
</div>

<div className="nav row row-cols-1">
    <div className="col"><img src={myImage} className='cimg'></img></div>
</div>

</div>

   ) 
}
export default Main