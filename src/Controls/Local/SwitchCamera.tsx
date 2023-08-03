import React, {ReactNode, useContext} from 'react';
import PropsContext, {ToggleState} from '../../Contexts/PropsContext';
import {LocalContext} from '../../Contexts/LocalUserContext';
import RtcContext from '../../Contexts/RtcContext';
import BtnTemplate from '../BtnTemplate';
import styles from '../../Style';
import {Text} from "react-native";

interface SwitchCameraProps {
    render?: ((action: () => void) => ReactNode) | undefined;
}

const SwitchCamera: React.FC<SwitchCameraProps> = (props) => {
  const {styleProps, callbacks} = useContext(PropsContext);
  const {localBtnStyles} = styleProps || {};
  const {switchCamera} = localBtnStyles || {};
  const {RtcEngine} = useContext(RtcContext);
  const local = useContext(LocalContext);

    if (props?.render !== undefined) {
        return (
            <>
                {props.render(() => {
                    RtcEngine.switchCamera();
                    callbacks?.SwitchCamera && callbacks.SwitchCamera();
                })}
            </>
        );
    }

  return (
    <BtnTemplate
      name={'switchCamera'}
      style={{...styles.localBtn, ...(switchCamera as object)}}
      btnText={'Switch'}
      disabled={local.video === ToggleState.enabled ? false : true}
      onPress={() => {
        RtcEngine.switchCamera();
        callbacks?.SwitchCamera && callbacks.SwitchCamera();
      }}
    />
  );
};

export default SwitchCamera;
