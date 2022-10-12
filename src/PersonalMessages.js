import React, { useEffect } from 'react'

// v9 compat packages are API compatible with v8 code

import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';

import 'firebase/compat/firestore';

firebase.initializeApp(
  { 
    apiKey: "AIzaSyCpC_0_uloBHLVEUSDSrG4aLdca7Fn9tfw",
    authDomain: "chat-app-a42c5.firebaseapp.com",
    projectId: "chat-app-a42c5",
    storageBucket: "chat-app-a42c5.appspot.com",
    messagingSenderId: "780964223577",
    appId: "1:780964223577:web:b81f1d745ceb2df520ef48",
    measurementId: "G-W8YKEBDP26"
  }
)
const firestore = firebase.firestore();

function PersonalMessages(props) {

  return (
    <div className='personal-message'>
      {props.value.map( (item , i) =>{
          return (
            
        <div key={props.id[i]}   className='oneMessage  text-light d-flex gap-2 m-2 justify-content-end'>
              { props.uid === props.value[i].userId.uid ? <p className='bg-primary d-inline p-2 px-4 rounded-pill '>{item.text}</p>    :   <p className='otherMessage text-dark d-inline p-2 px-4 rounded-pill '>{item.text}</p> }
{/*              <p className='bg-primary d-inline p-2 px-4 rounded-pill '>{item.text}</p>
 */}              <div   className='avatar-div'>
               <img src={props.value[i].photo.photoURL} className="img-fluid rounded-pill"/> 
               </div>
        </div>
          ) }
         

      
      )}
    </div>
  )
  /// I MUST DIFFERENTIATE GMAIL PHOTOURL
  /// AND EXCEPT ME ALL USERS MUST BE SHOWN IN THE LEFT
}

export default PersonalMessages