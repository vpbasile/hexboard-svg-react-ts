import { Global } from '@mantine/core';
import hexFont from './hexatus/hexatus.ttf';

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Hexatus',
            src: `url('${hexFont}') format("ttf")`,
            fontWeight: 700,
            fontStyle: 'normal',
          },
        },
      ]}
    />
  );
}