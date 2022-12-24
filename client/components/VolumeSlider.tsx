import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface IVolumeSlider {
  value: number;
}

const VolumeSlider: React.FC<IVolumeSlider> = ({ value }) => {
  function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }

  return (
    <Box sx={{ height: 300 }}>
      <Slider
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: 'slider-vertical',
          },
        }}
        orientation="vertical"
        defaultValue={30}
        value={value}
        aria-label="Temperature"
        valueLabelDisplay="auto"
        onKeyDown={preventHorizontalKeyboardNavigation}
      />
    </Box>
  );
};

export default VolumeSlider;
