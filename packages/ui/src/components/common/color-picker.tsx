import { Box, BoxProps, Popover, useTheme } from "@mui/material";
import React from "react";
import { TwitterPicker } from "react-color";

export interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const Display = React.forwardRef(function DisplayComponent(
  props: BoxProps & { color: string },
  ref,
) {
  return (
    <Box
      sx={{
        width: 35,
        height: 35,
        borderRadius: "50%",
        backgroundColor: props.color,
        cursor: "pointer",
      }}
      ref={ref}
      {...props}
    />
  );
});

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const displayRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  return (
    <React.Fragment>
      <Display
        color={color}
        onClick={() => setOpen((val) => !val)}
        ref={displayRef}
      />
      {open && (
        <Popover
          open={open}
          anchorEl={displayRef.current}
          onClose={() => setOpen((val) => !val)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <TwitterPicker
            color={color}
            onChange={(color) => onChange(color.hex)}
            triangle="hide"
            styles={{
              default: {
                card: {
                  boxShadow: theme.shadows[24],
                  backgroundColor: theme.palette.background.paper,
                },
                input: {
                  fontFamily: theme.typography.fontFamily,
                  fontWeight: theme.typography.fontWeightMedium,
                  fontSize: theme.typography.body1.fontSize,
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.secondary.main}`,
                  borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
                  boxShadow: "none",
                },
                hash: {
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`,
                  fontFamily: theme.typography.fontFamily,
                  fontWeight: theme.typography.fontWeightBold,
                  height: 32,
                },
                swatch: {
                  borderRadius: theme.shape.borderRadius,
                },
              },
            }}
          />
        </Popover>
      )}
    </React.Fragment>
  );
};
