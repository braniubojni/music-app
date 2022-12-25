export interface IFiles {
  picture: Express.Multer.File;
  audio: Express.Multer.File;
}

export interface IGetAllQuery {
  offset: string | number;
  count: string | number;
}

export interface IQuery {
  query: string;
}
