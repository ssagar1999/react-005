import { useState } from "react";
import "./App.css";
import imageCompression from "browser-image-compression";



function App() {

  const [origImage, setOrigImage] = useState("");

  const [origImageFile, setOrigImageFile] = useState("");

  const [compressedImage, setCompressedImage] = useState("");


  const handle = (e) => {
    console.log(e)
    const imageFile = e.target.files[0];
    setOrigImage(imageFile);
    setOrigImageFile(URL.createObjectURL(imageFile)); 
    //setting it as blob
  };

  const handleCompressImage = (e) => {
    // e.preventDefault();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
console.log(origImage)
    if (options.maxSizeMB >= origImage / 1024) {
      alert("Image is too small, cant be compressed");
      return 0;
    }

    // let output;
    imageCompression(origImage, options).then((x) => {
      // output = x;
      const downloadLink = URL.createObjectURL(x);
      console.log(x, origImage, downloadLink)
      setCompressedImage(downloadLink);
    });

  };

  return (

    <div className="App">

      <div><div><div><div>

              {origImageFile && 

                <img style={{'width':'625px'}} src={origImageFile} />

                }

            </div>

          </div>

          <div>

            <input

              type="file"

              accept="image/*"

              className="mt-2 btn btn-dark w-75"

              onChange={(e) => handle(e)}

            />

            {origImageFile && (
              <button primary onClick={(e) => handleCompressImage(e)}>
                Compress Image
              </button>

            )}

            {compressedImage && (
              <button>
                <a href={compressedImage} download={'new-compressed-file'}>
                  Download Image
                </a>
              </button>
            )}

          </div>

            <div>
              {compressedImage && (
                <img src={compressedImage} />
              ) }

            </div>

        </div>

      </div>

    </div>

  );

}



export default App;

