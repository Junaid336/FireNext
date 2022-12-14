 import {useEffect, useState} from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import {auth, addSizeToGoogleProfilePic} from '../src/Firebase';


import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import Header from '../src/components/Header';
import Loading from '../src/components/Loading'
 
 const MyApp = ({Component, pageProps}) => {

    const [isLogin, setIsLogin] = useState(null);
    const [loading, setLoading] = useState(true);
    const profilePic = isLogin ? `${addSizeToGoogleProfilePic(auth.currentUser.photoURL)}` : '/images/user.png';

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(!!user){
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
            setLoading(false);
        });
    },[])

    return(
    <>
        <CssBaseline />
        <Header
         isLogin={isLogin}
         setIsLogin={setIsLogin}
         profilePic={profilePic}
        />
       
        <Grid
         item sm={12} md={7}
         sx={{ 
            position: 'absolute',
            top: '5rem',
            bottom: '0',
            margin: '0 auto',
            width: '100vw'
        }}>
            <Container sx={{position: 'relative', height: '100%'}}>
                {
                    loading
                    ? <Loading />
                    : <Component {...pageProps} isLogin={isLogin} />
                }
            </Container>
        </Grid>
    </>
    )
 }

 export default MyApp;