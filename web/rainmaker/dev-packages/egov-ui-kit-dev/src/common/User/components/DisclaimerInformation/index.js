import React from 'react'
import './index.css'
import chrome from './chrome.png'
import edge from './edge.png'
import firefox from './firefox.png'
import ie from './ie.png'

const DisclaimerInformation = () =>{
   
    return(
        <div className="DisclaimerInformation">
            <div>
                <label style={{ color: 'red' }}>*</label>
                <label style={{ font: '8px',fontFamily:'arial' }}>Website works well on these browser versions</label>
           
            <table className="tableStyle">
                <tbody>
                    <tr>
                        <td className="tdStyle">
                        <img src={chrome} alt="Logo"/><br></br>
                        <label> >V-23 </label>
                        </td>
                        <td className="tdStyle">
                        <img src={edge} alt="Logo" /><br></br>
                        <label>>V-10 </label>
                        </td>
                        <td className="tdStyle">
                        <img src={firefox} alt="Logo" /><br></br>
                        <label>>V-21 </label>
                        </td>
                        <td className="tdStyle">
                        <img src={ie} alt="Logo"/> <br></br>
                        <label>>V-9 </label>
                        </td>
                    </tr>
                    {/* <tr>
                        <td className="tdStyle">
                        <label> >V-23 </label>
                        </td>
                        <td className="tdStyle">
                         <label>>V-10 </label>
                        </td>
                        <td className="tdStyle">
                        <label>>V-21 </label>
                        </td>
                        <td className="tdStyle">
                        <label>>V-9 </label>
                        </td>
                    </tr> */}
                </tbody>
            </table>        
        </div>                    
    </div>
    )
}
export default DisclaimerInformation;