import {
  PlayerAction,
  PlayerActionTypes,
  PlayerState,
} from '../../types/player';

const initialState: PlayerState = {
  currentTime: 0,
  duration: 0,
  active: null,
  volume: 50,
  pause: true,
};

export const playerReducer = (state = initialState, action: PlayerAction) => {
  switch (action.type) {
    case PlayerActionTypes.PAUSE:
      console.log('Pause worked 1')
      return { ...state, pause: true };
    case PlayerActionTypes.PLAY:
      console.log('Pause worked 2')
      return { ...state, pause: false };
    case PlayerActionTypes.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case PlayerActionTypes.SET_VOLUME:
      return { ...state, volume: action.payload };
    case PlayerActionTypes.SET_DURATION:
      return { ...state, duration: action.payload };
    case PlayerActionTypes.SET_ACTIVE:
      return { ...state, active: action.payload, duration: 0, currentTime: 0 };
    default:
      return state;
  }
};
