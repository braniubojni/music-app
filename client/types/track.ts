export interface ITrack {
  id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  comments: IComment[];
}

export interface IComment {
  id: string;
  username: string;
  text: string;
}
