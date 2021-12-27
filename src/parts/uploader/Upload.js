import { useState } from 'react'
import './upload.css'
import { MdCloudUpload  } from 'react-icons/md'
import { FaFileAlt } from 'react-icons/fa'
import { MdCheck, MdDelete } from 'react-icons/md'

export default function Upload() {

    const [ fileName, setFileName ] = useState("No selected File")

    return (
        <div className='upload-wrapper'>
            {/* <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>upload profile image</Form.Label>
                <Form.Control type="file" />
            </Form.Group> */}
            <form action="" onClick={({ target }) => {
                document.querySelector(".input-file").click()
            }}>
                <input type="file" className='input-file' hidden onChange={({target}) => {
                    let file = target.files[0]
                    file && setFileName(file.name)
                }}/>
                <MdCloudUpload id='upload-icon'/>
                <p>Browse files to upload</p>
            </form>
            <section className="progress-area">
                <li className="uploaded-row">
                    <FaFileAlt className='uploaded-icon' />
                    <div className='upload-content'>
                        <div id="details">
                            <span className="name">{fileName} - <MdDelete onClick={() => setFileName("No selected File")}/></span>
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
