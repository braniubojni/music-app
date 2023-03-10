import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface IVolumeSlider {
  value: number;
  volumeChange: Function;
  show: Function;
}

const VolumeSlider: React.FC<IVolumeSlider> = ({
  value,
  volumeChange,
  show,
}) => {
  function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }

  return (
    <Box onBlur={() => show(false)} sx={{ height: 300 }}>
      <Slider
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: 'slider-vertical',
          },
        }}
        value={value}
        onChange={(_, value) => volumeChange(value)}
        orientation="vertical"
        aria-label="Temperature"
        valueLabelDisplay="auto"
        onKeyDown={preventHorizontalKeyboardNavigation}
      />
    </Box>
  );
};

export default VolumeSlider;
