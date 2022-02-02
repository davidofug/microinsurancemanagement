import { useState } from 'react'
import './upload.css'
import { MdCloudUpload  } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import { AiFillFileText } from 'react-icons/ai'

export default function UploadFile({setAttachedDocs}) {

    const [ fileName, setFileName ] = useState("No selected File")
    const [ fileName2, setFileName2 ] = useState("No selected File")
    const [ imageUrl, setImageUrl ] = useState(null)
    const [ imageUrl2, setImageUrl2 ] = useState(null)
    

    return (
        <div className='upload-wrapper'>
            <div id="form" onClick={() => {
                document.querySelector(".input-file").click()
            }}>
                <input type="file" className='input-file' hidden id='photo' defaultValue={""} onChange={({target: {files}}) => {
                    setAttachedDocs(files[0])
                    files[0] && setFileName(files[0].name)
                    files[1] && setFileName2(files[1].name)
                    if(files){
                        setImageUrl(URL.createObjectURL(files[0]))
                        files[1] && setImageUrl2(URL.createObjectURL(files[1]))
                    }
                }} multiple/>
                {imageUrl ?
                <div>
                    <img src={imageUrl} width={50} height={50} alt='attached Documents'/>
                    { imageUrl2 && <img src={imageUrl2} width={50} height={50} alt='attached Documents 2'/>}
                </div>
                :
                    <MdCloudUpload id='upload-icon'/>
                }
                <p>Browse files to upload</p>
            </div>
            <section className="progress-area">
                <li className="uploaded-row">
                    <AiFillFileText className='uploaded-icon' />
                    <div className='upload-content'>
                        <div id="details">
                            <span className="name">{fileName} - <MdDelete onClick={() => {setFileName("No selected File"); setAttachedDocs(null); setImageUrl(null)}}/></span>
                        </div>
                        <div id="progress-bar">
                            <div id="progress"></div>
                        </div>
                    </div>
                </li>
                {fileName2 !== "No selected File" &&
                    <li className="uploaded-row">
                        <AiFillFileText className='uploaded-icon' />
                        <div className='upload-content'>
                            <div id="details">
                                <span className="name">{fileName2} - <MdDelete onClick={() => {setFileName2("No selected File"); setAttachedDocs(null); setImageUrl2(null)}}/></span>
                            </div>
                            <div id="progress-bar">
                                <div id="progress"></div>
                            </div>
                        </div>
                    </li>
                }
            </section>
        </div>
    )
}
