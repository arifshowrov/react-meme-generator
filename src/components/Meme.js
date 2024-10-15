import React from "react"
import {toPng} from "html-to-image"
import download from "downloadjs";


export default function Meme(){


    const [meme, setMeme]  = React.useState({
        topText: "",
        bottomText: "",
        leftText:"",
        rightText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    });
    const [allMemes, setAllMemes] = React.useState([]);

    React.useEffect( () => {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(data => setAllMemes(data.data.memes))

    },[])




    function getMemeImage(){
       
        const randomNumber = Math.floor(Math.random() *allMemes.length)
        const url = allMemes[randomNumber].url

        setMeme(prevMemes =>({
            ...prevMemes,
            randomImage:url
        }))

    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    const node =  document.getElementById("image-download");

let dataURL
    function downloadImage() {
        toPng(node)
            .then(dataURL => {
                // Attempt to download
                download(dataURL, "custom-image.png");
               
            })
            .catch(() => console.log("Error generating image"));
    }
    
    return(
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="left Text "
                    className="form--input"
                    name="leftText"
                    value={meme.leftText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="right text"
                    className="form--input"
                    name="rightText"
                    value={meme.rightText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>

            </div>
            {/* <a id="download-link" href={dataURL} download="custom-image.png" style="display:none;">Download Image</a> */}
             <a download target="_blank" href={dataURL}

                
                    className="form--button"
                    onClick={downloadImage}
                    >
                    Download Meme 

               
            </a>
            <div className="meme" id="image-download"> 
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
                <h2 className="meme--text left">{meme.leftText}</h2>
                <h2 className="meme--text right">{meme.rightText}</h2>
            </div>
           

        </main>
    )
}