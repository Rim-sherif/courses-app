import { useEffect } from "react";

const JitsiMeetComponent = ({ roomName, userName }) => {
  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: roomName,
      width: "100%",
      height: 600,
      parentNode: document.getElementById("jitsi-container"),
      userInfo: { displayName: userName },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => api.dispose(); // اغلاق الجلسة عند الخروج
  }, [roomName, userName]);

  return <div id="jitsi-container"></div>;
};

export default JitsiMeetComponent;
