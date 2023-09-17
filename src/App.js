import { useState } from "react";
import "./App.css";
import imageCompression from "browser-image-compression";



function App() {

  const [origImage, setOrigImage] = useState("");

  const [origImageFile, setOrigImageFile] = useState("");

  const [compressedImage, setCompressedImage] = useState("");

  



  const handle = (e) => {

    const imageFile = e.target.files[0];

    setOrigImage(imageFile);

    setOrigImageFile(URL.createObjectURL(imageFile));

    

  };



  const handleCompressImage = (e) => {

    e.preventDefault();



    const options = {

      maxSizeMB: 1,

      maxWidthOrHeight: 500,

      useWebWorker: true,

    };



    if (options.maxSizeMB >= origImage / 1024) {

      alert("Image is too small, cant be compressed");

      return 0;

    }



    let output;

    imageCompression(origImage, options).then((x) => {

      output = x;



      const downloadLink = URL.createObjectURL(output);

      setCompressedImage(downloadLink);

    });

  };

  return (

    <div className="App">

      <h1></h1>

      <div>

        <div>

          <div>

            <div>

              {origImageFile ? (

                <img style={{'width':'625px'}} src={origImageFile} />

              ) : (

       <p>...</p>

              )}

            </div>

          </div>

          <div>

            <input

              type="file"

              accept="image/*"

              className="mt-2 btn btn-dark w-75"

              onChange={(e) => handle(e)}

            />

            <h1></h1>

            {origImageFile && (

              <button

                primary

                onClick={(e) => {

                  handleCompressImage(e);

                }}

              >

                {" "}

                Compress Image

              </button>

            )}

            <h1></h1>

            {compressedImage && (

              <button>

                <a href={compressedImage} download={'new-compressed-file'}>

                  {" "}

                  Download Image

                </a>

              </button>

            )}

          </div>

          <div>

            <div>

              {compressedImage ? (

                <img src={compressedImage} />
              ) : (

                <img src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png" />

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}



export default App;

