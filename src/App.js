import './App.css';
import React,{useEffect , useRef, useState } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Send } from 'react-bootstrap-icons';
import { ChatLeftDots } from 'react-bootstrap-icons';
import PersonalMessages from './PersonalMessages';

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

const auth = firebase.auth();
const firestore = firebase.firestore();

////////////////////////////////////////


function App() {
  const user = useAuthState(auth);
  return (
    <div className="App">
     {user[0] === null ?  <SignIn />  : <ChatRoom />}  
    </div>
  );
}

function SignIn() {

  const SignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <div>
    <section
    onClick={SignInWithGoogle}
     style={{height:"100vh"} }className='d-flex justify-content-center align-items-center'>        
        <div className='logo bg-light rounded d-flex justify-content-evenly align-items-center'>
            <img className='img' width={80}
             src='https://toppng.com/uploads/preview/google-g-logo-icon-11609362962anodywxeaz.png' alt='logo' />
          <div className='googleBtn  '> Sign in with google</div>
        </div>
      
      </section>
    </div>
  )
}

function SignOut () {
  return auth.currentUser && (
    <button
    className=' btn btn-outline-light  '
    onClick={() => auth.signOut()}>
      Sign Out
    </button>
  )
}
////////////////////////////////////////////////////
function ChatRoom() {

  const inputRef = useRef(null);

  const [value , setValue] = useState([]);
  const [id , setId] = React.useState([]);

  /////////////////////////
        
  useEffect( () =>{
    
      const response = firestore.collection('Messages');
      response.orderBy('createdAt').onSnapshot(snap => {
        setValue(snap.docs.map(doc => doc.data()));      
        setId(snap.docs.map(doc => doc.id));
      })
   
  } , [])  /// It works only at first not every update


  const uid  = firebase.auth().currentUser.uid
  const photoURL = firebase.auth().currentUser.photoURL

  //////////////////////////

  function handleSubmit(e) {      
      sendMessage();
      inputRef.current.value = null ;
    }

    function keypressHandle(e) {
      if(e.key === "Enter"){
        handleSubmit();

      }
     }

     async function sendMessage(e) {

      await firestore.collection("Messages").add(
        {
          text:inputRef.current.value , /// It is always vurrent message every time lost after new message
          createdAt: firebase.firestore.FieldValue.serverTimestamp() ,
          userId:{uid},
          photo:{photoURL},
        }
      )
     }
  return(
    <div className='chat-room  d-flex flex-column justify-content-between'>
        <nav className='d-flex bg-dark justify-content-around  py-4 text-light'>
          <ChatLeftDots size={50} color="white"/>
          <div><h1>Chat-app</h1></div>
           <SignOut />
          </nav>
      
        <div className='messages'>
          <PersonalMessages value={value} id={id} uid={uid} photoURL={photoURL}/>
        </div>

        <div className='inputDiv mx-auto my-4'>
          <input type="text "
          ref={inputRef}
          onKeyDown={keypressHandle }
           className='rounded' placeholder='Write a message' />
          <button
          onClick={handleSubmit}
          
          tabIndex={0}
           type='submit ' className='btn btn-dark '>
           <Send  />
            </button>
        </div>
    </div>
  )
}



export{firestore};
export default App;
