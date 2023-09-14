import { useState } from "react";
import { CAMPSITES } from '../shared/campsites';
import DirectoryScreen from './DirectoryScreen';

// Const [campsites... state variable named campsites, function for setting this variable is setCampsites. Then passing the "CAMPSITES" array to the use state hook to initialize the "campsites" state variable equal to the array imported from the shared folder (CAMPSITES).

const Main = () => {
    const [campsites, setCampsites] = useState(CAMPSITES); 

    return <DirectoryScreen campsites={campsites} /> 
}

export default Main;

// campsites={campsites} -- passing a prop names campsites that is equal to our state variable campsites-(1st campsites under Main is the state variable)