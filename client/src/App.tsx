import React from "react";
import MediaServiceProvider from "./module/media/MediaServiceProvider";
import { MeetingServiceProvider } from "./module/meeting/MeetingProvider";
import { MemberServiceProvider } from "./module/members/MemberServiceProvider";
import RTCProvider from "./module/rtc/RtcProvider";
import AppRoutes from "./routes/app-routes";
import { AuthProvider } from "./module/auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <MediaServiceProvider>
        <MemberServiceProvider>
          <MeetingServiceProvider>
            <RTCProvider>
              <AppRoutes />
            </RTCProvider>
          </MeetingServiceProvider>
        </MemberServiceProvider>
      </MediaServiceProvider>
    </AuthProvider>
  );
}

export default App;
