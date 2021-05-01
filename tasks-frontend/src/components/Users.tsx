import {FC} from 'react'
import Modal from 'react-modal'

export const Users:FC = () => {

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
      Modal.setAppElement('#root')

      
    return(
        <>
            <h1>USERS VIEW</h1>
        </>
    )
}