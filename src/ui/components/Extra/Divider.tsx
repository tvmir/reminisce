import React, { forwardRef } from 'react';
import { View } from 'react-native';

interface DividerProps {
  spacing?: boolean;
  style?: {};
}

export const Divider = forwardRef(
  ({ spacing = true, style }: DividerProps, ref) => {
    return (
      <View
        // @ts-ignore
        ref={ref}
        style={[
          {
            height: 1,
            backgroundColor: '#b2b2b2',
            marginHorizontal: spacing ? 24 : 0,
          },
          style,
        ]}
      />
    );
  }
);
