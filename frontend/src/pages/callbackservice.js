import React from 'react'
import "../App.css";

const callbackservice = () => {
  return (
    
    <div className="container"><br/>
        <h5 className="service">Callback Service</h5><br/>
        <h6>We will be happy to call you back.</h6>
        <p>Do you have any questions about our services or a specific product?</p>
        <p>Then use our free callback service. Simply send us your telephone number and preferred calling time. This service is available Monday to Friday from 07:00am to 07:00pm. Excluded are national and regional holidays. You are also welcome to give us a brief explanation of what it's about so that we can put you directly in touch with the right person.</p>
    
    
        <form /* action="https://formsubmit.co/988c8d9efdf84a91dedf0469ccd8958f" method="POST"  */>
            <div className="form-outline mb-4">
             <input type="text" id="form" className="form-control" placeholder='Name'/>
            </div>
   
            <div className="form-outline mb-4">
              <input type="text" id="form" className="form-control" placeholder='Company Name' />
            </div>
  
            <div className="form-outline mb-4">
               <input type="text" id="form" className="form-control" placeholder='Address' />
            </div>

            <div className="form-outline mb-4">
                <input type="text" id="form" className="form-control" placeholder='Email' />
            </div>

            <div className="form-outline mb-4">
               <input type="text" id="form" className="form-control" placeholder='Phone' />
            </div>

            <div className="form-outline mb-4">
                <input type="text" id="form" className="form-control" placeholder='Preferred Callback Day&Time'/>
            </div>

            <div className="form-outline mb-4">
               <textarea className="form-control" id="form" rows="4" placeholder='Your Message'></textarea>
            </div>
             

            <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
        </form>
    </div>
  )
}

export default callbackservice