import React, { useEffect } from "react";
// scss
import "./assets/scss/theme.scss";
// actions
import { useDispatch, useSelector } from "react-redux";
import { changelayoutMode } from "./redux/actions";
//Route
import Routes from "./routes";
//api config
import config from "./config";
import fakeBackend from "./helpers/fakeBackend";
import socketIOClient from "socket.io-client";

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";


// TODO
// fakeBackend();

// const firebaseConfig = {
//   apiKey: config.FIRE_BASE.API_KEY,
//   authDomain: config.FIRE_BASE.AUTH_DOMAIN,
//   databaseURL: config.FIRE_BASE.DATABASEURL,
//   projectId: config.FIRE_BASE.PROJECTID,
//   storageBucket: config.FIRE_BASE.STORAGEBUCKET,
//   messagingSenderId: config.FIRE_BASE.MESSAGINGSENDERID,
//   appId: config.FIRE_BASE.APPID,
//   measurementId: config.FIRE_BASE.MEASUREMENTID,
// };

// // init firebase backend
// initFirebaseBackend(firebaseConfig);

const App = () => {
  const dispatch = useDispatch();

  const { layoutMode } = useSelector((state: any) => ({
    layoutMode: state.Layout.layoutMode,
  }));

  // Dark/Light Mode 
  useEffect(() => {
    var getLayoutMode = localStorage.getItem("layoutMode");
    if (getLayoutMode) {
      dispatch(changelayoutMode(getLayoutMode));
    } else {
      dispatch(changelayoutMode(layoutMode));
    }
  }, [layoutMode, dispatch]);

  /*useEffect(() => {
    const socket = socketIOClient(`${process.env.REACT_APP_SOCKET_URL}`);
    socket.on('5144772222', (res) => {
      console.log(res);
      // CLEAN UP THE EFFECT
    });
    socket.disconnect();
  }, []);*/

  return <Routes />;
};

export default App;
