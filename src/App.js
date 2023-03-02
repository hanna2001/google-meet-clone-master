import MainScreen from "./components/MainScreen/MainScreen.component";

import firepadRef, { db, userName } from "./server/firebase";
import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  // setMainStream,
  addParticipant,
  setUser,
  removeParticipant,
  updateParticipant,
} from "./store/actioncreator";
import { connect } from "react-redux";
import { MeetingEnds } from "./components/LastPage/MeetingEnds.component";

function App(props) {
  const getUserStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return localStream;
  };
  const participantRef = firepadRef.child("participants");

  useEffect(async () => {
    //   // const stream = await getUserStream();
    //   // stream.getVideoTracks()[0].enabled = false;
    //   // props.setMainStream(stream);

    const connectedRef = db.database().ref(".info/connected");

    connectedRef.on("value", (snap) => {
      if (snap.val()) {
        const defaultPreference = {
          audio: true,
          video: false,
          screen: false,
        };
        const userStatusRef = participantRef.push({
          userName,
          preferences: defaultPreference,
        });
        props.setUser({
          [userStatusRef.key]: { name: userName, ...defaultPreference },
        });
        userStatusRef.onDisconnect().remove();
      }
    });
  }, []);

  // const isUserSet = !!props.user;
  // const isStreamSet = !!props.stream;

  useEffect(() => {
    // if (isStreamSet && isUserSet) {
    participantRef.on("child_added", (snap) => {
      // const preferenceUpdateEvent = participantRef
      //   .child(snap.key)
      //   .child("preferences");
      // preferenceUpdateEvent.on("child_changed", (preferenceSnap) => {
      //   props.updateParticipant({
      //     [snap.key]: {
      //       [preferenceSnap.key]: preferenceSnap.val(),
      //     },
      //   });
      // });
      const { userName: name, preferences = {} } = snap.val();
      props.addParticipant({
        [snap.key]: {
          name,
          ...preferences,
        },
      });
    });
    participantRef.on("child_removed", (snap) => {
      props.removeParticipant(snap.key);
    });
    // }
  }, [props.user]); //isStreamSet, isUserSet

  return (
    <div className="App">
      Current User: {JSON.stringify(props.user)} <br />
      Participants: {JSON.stringify(props.participants)}
      {/* <MainScreen /> */}
      {/* <Router>
        <Routes>
          <Route exact path="/" component={MainScreen} />

          <Route path="/ended" component={MeetingEnds} />
        </Routes>
      </Router> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    stream: state.mainStream,
    user: state.currentUser,
    participants: state.participants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setMainStream: (stream) => dispatch(setMainStream(stream)),
    addParticipant: (user) => dispatch(addParticipant(user)),
    setUser: (user) => dispatch(setUser(user)),
    removeParticipant: (userId) => dispatch(removeParticipant(userId)),
    updateParticipant: (user) => dispatch(updateParticipant(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
