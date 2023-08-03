import React, {ReactNode, useContext} from 'react';
import PropsContext from '../../Contexts/PropsContext';
import RtcContext from '../../Contexts/RtcContext';
import BtnTemplate from '../BtnTemplate';
import styles from '../../Style';

interface EndCallProps {
    render?: ((action: () => void) => ReactNode) | undefined;
}

/**
 * React Component that renders the endcall button
 * @returns Renders the endcall button
 */
const EndCall: React.FC<EndCallProps> = (props) => {
  const {styleProps} = useContext(PropsContext);
  const {localBtnStyles} = styleProps || {};
  const {endCall} = localBtnStyles || {};
  const {dispatch} = useContext(RtcContext);

  if (props?.render !== undefined) {
    return (
        <>
          {props.render(() => {
              dispatch({
                  type: 'EndCall',
                  value: [],
              });
          })}
        </>
    );
  }

  return (
    <BtnTemplate
      name={'callEnd'}
      btnText={'Hang Up'}
      color="#FFF"
      style={{...styles.endCall, ...(endCall as object)}}
      onPress={() =>
        dispatch({
          type: 'EndCall',
          value: [],
        })
      }
    />
  );
};

export default EndCall;
