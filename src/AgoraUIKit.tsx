/**
 * @module AgoraUIKit
 */
import React from 'react';
import {View} from 'react-native';
import RtcConfigure from './RtcConfigure';
import {
  PropsProvider,
  PropsInterface,
  Layout,
  AgoraUIKitProps,
} from './Contexts/PropsContext';
import LocalControls from './Controls/LocalControls';
import GridVideo from './Views/GridVideo';
import PinnedVideo from './Views/PinnedVideo';
import RtmConfigure from './RtmConfigure';
import LocalUserContext from './Contexts/LocalUserContext';
import PopUp from './Controls/Remote/RemoteMutePopUp';

/**
 * Agora UIKit component following the v3 props
 * @returns Renders the UIKit
 */
const AgoraUIKitv3: React.FC<PropsInterface> = (props) => {
  const {layout} = props.rtcProps;
  return (
    <PropsProvider value={props}>
      <View style={[containerStyle, props.styleProps?.UIKitContainer]}>
        <RtcConfigure key={props.rtcProps.channel}>
          <LocalUserContext>
            {props.rtcProps.disableRtm ? (
              <>
                {layout === Layout.Grid ? <GridVideo /> : <PinnedVideo />}
                <LocalControls
                    showButton={props?.showButton ?? undefined}
                    renderLocalAudioMute={props?.controls?.renderLocalAudioMute ?? undefined}
                    renderLocalVideoMute={props?.controls?.renderLocalVideoMute ?? undefined}
                    renderSwitchCamera={props?.controls?.renderSwitchCamera ?? undefined}
                    renderEndCall={props?.controls?.renderEndCall ?? undefined}
                />
              </>
            ) : (
              <RtmConfigure>
                {layout === Layout.Grid ? <GridVideo /> : <PinnedVideo />}
                <LocalControls
                    showButton={props?.showButton ?? undefined}
                    renderLocalAudioMute={props?.controls?.renderLocalAudioMute ?? undefined}
                    renderLocalVideoMute={props?.controls?.renderLocalVideoMute ?? undefined}
                    renderSwitchCamera={props?.controls?.renderSwitchCamera ?? undefined}
                    renderEndCall={props?.controls?.renderEndCall ?? undefined}
                />
                <PopUp />
              </RtmConfigure>
            )}
          </LocalUserContext>
        </RtcConfigure>
      </View>
    </PropsProvider>
  );
};

/**
 * Agora UIKit component
 * @returns Renders the UIKit
 */
const AgoraUIKit: React.FC<AgoraUIKitProps> = (props) => {
  const {rtcUid, rtcToken, rtmToken, rtmUid, ...restConnectonData} =
    props.connectionData;
  const adaptedProps: PropsInterface = {
    rtcProps: {
      uid: rtcUid,
      token: rtcToken,
      ...restConnectonData,
      ...props.settings,
      callActive: true,
    },
    rtmProps: {
      token: rtmToken,
      uid: rtmUid,
      ...restConnectonData,
      ...props.settings,
    },
  };

  return (
    <AgoraUIKitv3
      rtcProps={adaptedProps.rtcProps}
      rtmProps={adaptedProps.rtmProps}
      callbacks={props.rtcCallbacks}
      rtmCallbacks={props.rtmCallbacks}
      styleProps={props.styleProps}
      showButton={props.showButton ?? undefined}
      controls={props.controls ?? undefined}
    />
  );
};

const containerStyle = {backgroundColor: '#000', flex: 1};

export default AgoraUIKit;
