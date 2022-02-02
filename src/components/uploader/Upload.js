import { useState } from 'react'
import './upload.css'
import { MdCloudUpload  } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'

export default function Upload({setLogo}) {

    const [ fileName, setFileName ] = useState("No selected File")
    const [ imageUrl, setImageUrl ] = useState(null)
    

    return (
        <div className='upload-wrapper'>
            <div id="form" onClick={() => {
                document.querySelector(".input-file").click()
            }}>
                <input type="file" accept='image/*' className='input-file' hidden id='photo' defaultValue={""} onChange={({target: {files}}) => {
                    setLogo(files[0])
                    files[0] && setFileName(files[0].name)
                    if(files){
                        setImageUrl(URL.createObjectURL(files[0]))
                    }
                }}/>
                {imageUrl ?
                 <img src={imageUrl} width={50} height={50} alt='image' style={{borderRadius: "50%"}}/>
                :
                    <MdCloudUpload id='upload-icon'/>
                }
                <p>Browse files to upload</p>
            </div>
            <section className="progress-area">
                <li className="uploaded-row">
                    <AiFillFileImage className='uploaded-icon' />
                    <div className='upload-content'>
                        <div id="details">
                            <span className="name">{fileName} - <MdDelete onClick={() => {setFileName("No selected File"); setLogo(null); setImageUrl(null)}}/></span>
                        </div>
                        <div id="progress-bar">
                            <div id="progress"></div>
                        </div>
                    </div>
                </li>
            </section>
        </div>
    )
}
