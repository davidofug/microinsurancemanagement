import { Form } from 'react-bootstrap'
import { AiOutlineCopy } from 'react-icons/ai'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function PasswordGenerator({ password, setPassword}) {
    const handleGeneratePassword = () => {
      
        setPassword(createPassword())
  
        // console.log(fields)
      }
    const createPassword = () => {
        const characterList = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!^+%&=?#$*@"
  
        let password = '';
        const characterListLength = characterList.length;
        for (let i = 0; i < 12; i++) {
          const characterIndex = Math.round(Math.random() * characterListLength);
          password = password + characterList.charAt(characterIndex);
        }
        return password;
      }


      // copy password to click board
      const copyToClipboard = () => {
        const newTextArea = document.createElement('textarea');
        newTextArea.innerText = password;
        document.body.appendChild(newTextArea);
        newTextArea.select();
        document.execCommand('copy');
        newTextArea.remove();
      }

      const handleCopyPassword = (e) => {
        if (password === '') {
          toast.error('Nothing To Copy', {position: "top-center"});
        } else {
          copyToClipboard();
          toast.success('Password successfully copied to clipboard', {position: "top-center"});
        }
      }


  return (
    <Form.Group className="mb-3" style={{display: "flex", flexDirection: "column"}}>
    <button type='button' className='btn btn-primary cta mb-3' onClick={handleGeneratePassword}>Generate Password</button>
    <div className='generator__password'>
        <h3 className='password-h3'>{password}</h3>
        <button type='button' className='copy__btn' onClick={handleCopyPassword}>
        <AiOutlineCopy />
        </button>
    </div>
    </Form.Group>
  );
}

export default PasswordGenerator;
