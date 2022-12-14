import React, {useState} from 'react'
import "./MessageSender.css"
import {Avatar} from "@mui/material"
import VideocamIcon from "@mui/icons-material/VideoCameraBack"
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useStateValue} from "./StateProvider";
import db from "./firebase"
import firebase from "firebase/compat/app"


function MessageSender() {
    const [{user}, dispatch] = useStateValue();
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState("")
    const [checked, setChecked] = useState("")


    const handleSubmit =(e) =>{
        e.preventDefault()
    
        db.collection('posts').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            profilePic: user.photoURL,
            username : user.displayName,
            image: imageUrl,
            checked: checked
        })
    
        setImageUrl("")
        setInput("")
      }

  return (
    <div className="messageSender">
        <div className="messageSender__top">
            <Avatar src={user.photoURL}/>
            <form>
                <input 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="messageSender__input" 
                    placeholder= {"What's on your mind, "+ user.displayName +" ?"}/>
                <input 
                    value={imageUrl}
                    onChange={e=> setImageUrl(e.target.value)}
                    placeholder="image URL (Optional)"/> 
                    <h3 className="add__story">Story? </h3>
                <label className="custom-checkbox">
                <input 
                    className="checkmark"
                    type = "checkbox"
                    checked = {checked}
                    onChange={e=> setChecked(e.target.checked)} />
                    <span></span>
                    </label>
                <button onClick={handleSubmit} type="submit">Share</button>
            </form>
        </div>

        <div className="messageSender__bottom">
            
            <div className="messageSender__option">
                <VideocamIcon style= {{color: "red"}} />
                <h3>Live Video</h3>
            </div>
            <div className="messageSender__option">
                <PhotoLibraryIcon style= {{color: "green"}} />
                <h3>Photo/Video</h3>
            </div>
            <div className="messageSender__option">
                <InsertEmoticonIcon style= {{color: "orange"}} />
                <h3>Feeling/Activity</h3>
            </div>

        </div>

    </div>
  )
}

export default MessageSender