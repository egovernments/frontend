import React from 'react'
import belLogo from './bel.png'
import  digit from './digitlogo.png'

const LanguageSelectionHeader = () =>{
   
    return(
    
            <div className="LanguageSelectionHeader">
                <img src={belLogo} alt="Logo" width="150px" height="40px"
                />
                 {/* <label style={{ fontFamily:'Roboto',color:'whitesmoke' }}> Powered by </label>&nbsp; &nbsp;<img src={digit} alt="Logo" width="25px" height="25px"/><label style={{ fontFamily:'Roboto',color:'whitesmoke' }}> DIGIT</label>            */}
            </div>
            // <div className="LogoHeader">
                  
            // // </div>
            // <div class="LanguageSelectionHeader">

            // <table className="tableStyle">
            // <tbody>
            //     <tr>
            //         <td className="tdStyle">
            //         <img src={belLogo} alt="Logo" width="150px" height="40px"/>
            //         </td>

            //     <td className="tdStylelogo">
            //         <label style={{ fontFamily:'Roboto',color:'whitesmoke' }}> Powered by </label>&nbsp; &nbsp;
            //         <img src={digit} alt="Logo" width="25px" height="25px" />
            //         <label style={{ fontFamily:'Roboto',color:'whitesmoke' }}> DIGIT</label> 
            //         </td> 
            //     </tr>

            //     </tbody>
            //     </table> 
            // </div>

  

    )
}
export default LanguageSelectionHeader;

