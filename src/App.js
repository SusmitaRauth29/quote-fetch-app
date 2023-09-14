
import './App.css';
import { Icon } from '@iconify/react';
import React, { useEffect, useState} from 'react';

const config = {
  apiUrl: 'https://type.fit/api/quotes',
}

function App() {

  const [quote, setquote] = useState("")
  const [loadind,setLoading]=useState(false)
  const [color,setColor]=useState()

 
  

  const newjoke = () => {
  setLoading(true)
  fetch(config.apiUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    setLoading(false)
    console.log(data);
    setquote(data[Math.floor(Math.random()*15)])
    setColor('#' + Math.floor(Math.random()*16777215).toString(16))
  })
  
  }
  useEffect(() => {
    newjoke()
  }, [])

  return (
    <div className={`main w-full h-screen flex justify-center items-center wrapper `} style={{background:color}}>
      <div id="quote-box" className="">
      {!loadind && 
      <>
        <div className="quote-text">
        <Icon color={color} icon="bi:quote" />
          <span id="text" className="" style={{color:color}}> {quote.text}</span>
        </div>

        <div className="quote-auther" >
          <p id="author" style={{color:color}}>-{quote?.author?.split(",")[0]}</p>
        </div>
        <div className="buttons">
          <div className="socialbuttons">
            <a id="tweet-quote" style={{background:color}} href={`https://twitter.com/intent/tweet?hashtags=quotes&text="${quote.text}"`} target="_top"><Icon icon="ei:sc-twitter" /></a>
            <a id="tumblr-quote" style={{background:color}} href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${quote?.author?.split(",")[0]}&content=${quote.text}`} target="_blank" rel="noreferrer"><Icon icon="typcn:social-tumbler" /></a>
          </div>
          <div className="navigate-btn">
            <button id="new-quote" type="button" style={{background:color}} className="btn btn-primary" onClick={newjoke}>New quote</button>
          </div>


        </div>
        </>
        }
         {loadind && 
           <div className="loadermodal">
             <Icon color={color} icon="svg-spinners:blocks-wave" />
           </div>
         }
      </div>
    </div>
  );
}

export default App;
