import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faDesktop,
  faVideoSlash,
  faPhone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "./MeetingFooter.css";
const MeetingFooter = (props) => {
  const [streamState, setStreamState] = useState({
    mic: true,
    video: false,
    screen: false,
  });
  const micClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        mic: !currentState.mic,
      };
    });
  };

  // const onVideoClick = () => {
  //   setStreamState((currentState) => {
  //     return {
  //       ...currentState,
  //       video: !currentState.video,
  //     };
  //   });
  // };


//   const onEndCall = () => {
//     window.opener = null;
//     window.open("", "_self");
//     window.close();
//   //   setStreamState((currentState) => {
    
//   //     return {
//   //       ...currentState,
//   //   };
//   // });
// };


  // const onScreenClick = () => {
  //   props.onScreenClick(setScreenState);
  // };

  // const setScreenState = (isEnabled) => {
  //   setStreamState((currentState) => {
  //     return {
  //       ...currentState,
  //       screen: isEnabled,
  //     };
  //   });
  // };
  useEffect(() => {
    props.onMicClick(streamState.mic);
  }, [streamState.mic]);
  // useEffect(() => {
  //   props.onVideoClick(streamState.video);
  // }, [streamState.video]);
  return (
    <div className="meeting-footer">
      <div
        className={"meeting-icons " + (!streamState.mic ? "active" : "")}
        data-tip={streamState.mic ? "Mute Audio" : "Unmute Audio"}
        onClick={micClick}
      >
        <FontAwesomeIcon
          icon={!streamState.mic ? faMicrophoneSlash : faMicrophone}
          title="Mute"
        />
      </div>
      <div
        className={"meeting-icons active"}
        // + (!streamState.video ? "active" : "")}
        data-tip={"EndCall"}
        // onClick={onEndCall}
      >
        <FontAwesomeIcon icon={faPhone} />
        {/* <FontAwesomeIcon icon={!streamState.video ? faVideoSlash : faVideo} /> */}
      </div>
      {/* <div
        className="meeting-icons"
        data-tip="Share Screen"
        // onClick={onScreenClick}
        disabled={streamState.screen}
      >
        <FontAwesomeIcon icon={faDesktop} />
      </div> */}
      <ReactTooltip />
    </div>
  );
};

export default MeetingFooter;
