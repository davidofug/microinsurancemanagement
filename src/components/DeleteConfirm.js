import React from 'react'
import '../components/modal/ConfirmBox.css'

function DeleteConfirm({ openToggle, singleDoc, setOpenToggle, handleDelete, getOrganisations}) {
  return (
    <div className={openToggle ? 'myModal is-active': 'myModal'}>
        <div className="modal__content wack">
          <h1 className='wack'>Confirm</h1>
          <p className='wack'>Are you sure you want to delete <b>{singleDoc.name}</b></p>
          <div className="buttonContainer wack" >
            <button id="yesButton" onClick={() => {
              setOpenToggle(false)
              handleDelete(singleDoc.id)
              getOrganisations()
              }} className='wack'>Yes</button>
            <button id="noButton" onClick={() => setOpenToggle(false)} className='wack'>No</button>
          </div>
        </div>
      </div>
  )
}

export default DeleteConfirm