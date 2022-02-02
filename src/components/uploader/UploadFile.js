import { useState } from 'react'
import './upload.css'
import { MdCloudUpload  } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import { AiFillFileText } from 'react-icons/ai'

export default function UploadFile({setAttachedDocs, attachedDocs}) {

    const [ fileName, setFileName ] = useState("No selected File")
    const [ fileName2, setFileName2 ] = useState("No selected File")
    const [ imageUrl, setImageUrl ] = useState(null)
    const [ imageUrl2, setImageUrl2 ] = useState(null)
    

    return (
        <div className='upload-wrapper'>
            <div id="form" onClick={() => {
                document.querySelector(".input-file").click()
            }}>
                <input type="file" className='input-file' hidden defaultValue={""} onChange={(event) => {
                    setAttachedDocs(event.target.files)
                    event.target.files[0] && setFileName(event.target.files[0].name)
                    event.target.files[1] && setFileName2(event.target.files[1].name)
                    if(event.target.files){
                        setImageUrl(URL.createObjectURL(event.target.files[0]))
                        event.target.files[1] && setImageUrl2(URL.createObjectURL(event.target.files[1]))
                    }
                }} multiple/>
                {fileName !== "No selected File" || fileName2 !== "No selected File"
                ?
                <div>
                    {attachedDocs.length} files
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
                            <span className="name">{fileName} - <MdDelete onClick={() => {setFileName("No selected File"); setAttachedDocs([attachedDocs[1]]); setImageUrl(null)}}/></span>
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
                                <span className="name">{fileName2} - <MdDelete onClick={() => {setFileName2("No selected File"); setAttachedDocs(attachedDocs[0]); setImageUrl2(null)}}/></span>
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
