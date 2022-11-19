import { Chip, ChipProps } from "@mui/material";
import { TagDto } from "@tasks/common";
import Color from "color";
import React from "react";

export interface TagProps {
  tag: TagDto;
  onClick?: () => unknown;
  onRemove?: () => unknown;
}

const handleClick = (tag: TagDto, onClick?: () => unknown) => {
  if (onClick) {
    onClick();
  }
  // TODO: Open tag edit modal
};

export const Tag = ({
  tag,
  onClick,
  onRemove,
  ...props
}: ChipProps & TagProps) => {
  return (
    <Chip
      {...props}
      label={tag.name}
      sx={{
        backgroundColor: tag.color,
        color: tag.contrastText,
        "&:hover": {
          backgroundColor: Color(tag.color).darken(0.3).hex(),
          color: tag.contrastText,
        },
      }}
      onClick={() => handleClick(tag, onClick)}
      onDelete={onRemove}
    />
  );
};
