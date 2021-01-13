import React from 'react'
import './index.css'
import chrome from './chrome.png'
import edge from './edge.png'
import firefox from './firefox.png'


const DisclaimerInformation = () =>{
   
    return(
        <div className="DisclaimerInformation">
            <div>
                <label style={{ color: 'red' }}>*</label>
                <label style={{ fontFamily:'Roboto',color:'whitesmoke' }}>Supported browser versions</label>
           
            <table className="tableStyle">
                <tbody>
                    <tr>
                        <td className="tdStyleDisclimer">
                        <img src={chrome} alt="Logo"/><br></br>
                                <label style={{color:'whitesmoke'}}> >V-81 </label>
                        </td>
                        <td className="tdStyleDisclimer">
                        <img src={edge} alt="Logo" /><br></br>
                        <label style={{color:'whitesmoke'}}>>V-84 </label>
                        </td>
                        <td className="tdStyleDisclimer">
                        <img src={firefox} alt="Logo" /><br></br>
                        <label style={{color:'whitesmoke'}}>>V-79 </label>
                        </td>
                        
                    </tr>
                   
                </tbody>
            </table>        
        </div>                    
    </div>
    )
}
export default DisclaimerInformation;