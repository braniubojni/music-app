import axios from 'axios';
import { Dispatch } from 'react';
import { TRACKS } from '../../common/paths';
import { TrackAction, TrackActionTypes } from '../../types/track';

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    let url = '';
    try {
      url =
        process.env.NEXT_PUBLIC_BACK_END_URL + TRACKS ??
        'http://localhost:5000';
      const response = await axios.get(url);
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: url + '| Error accured while download tracks ->',
      });
    }
  };
};
