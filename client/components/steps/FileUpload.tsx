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
  const [err, setErr] = useState<null | string>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sizes: ISizes = {
      image: 625_000,
      audio: 20_000_000,
    };
    const file = e.target.files && e.target.files[0];
    const type = file?.type.split('/')[0] as keyof ISizes;
    // Size validation
    if (sizes[type] && file?.size && file.size < sizes[type]) {
      setFile(file);
    } else {
      setErr(`${type} size shouldn't be bigger than ${sizes[type]}`);
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
      {err && <ErrorDiv msg={err} />}
    </Grid>
  );
};

export default FileUpload;
