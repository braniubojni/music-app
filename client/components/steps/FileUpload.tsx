import { Grid, Input } from '@mui/material';
import React, { useRef, useState } from 'react';
import ErrorDiv from '../errors/ErrorDiv';

interface IFileUploadProps {
  setFile: Function;
  accept: string;
  children: React.ReactNode;
}
interface ISizes {
  image: number;
  audio: number;
}

const FileUpload: React.FC<IFileUploadProps> = ({
  setFile,
  accept,
  children,
}) => {
  const ref = useRef<HTMLInputElement>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  return (
    <Grid
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClick={() => ref.current?.click()}
    >
      <Input
        type="file"
        inputProps={{ accept, ref }}
        sx={{ display: 'none' }}
        onChange={onChange}
      />
      {children}
    </Grid>
  );
};

export default FileUpload;
