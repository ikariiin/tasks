import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { TagDto } from "@tasks/common";
import React from "react";
import { CommonStrings } from "../../services/strings/common";
import { TagStrings } from "../../services/strings/tags";
import { ColorPicker } from "../common/color-picker";

export interface TagCreateModalProps {
  open: boolean;
  onClose: (tag: TagDto | null) => void;
}

const ColorPickerContainer = React.forwardRef(function ColorPickerContainer(
  props: React.HTMLAttributes<HTMLDivElement>,
  ref,
) {
  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
      {...props}
    />
  );
});

export const TagCreateModal = ({ open, onClose }: TagCreateModalProps) => {
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("#fff");

  return (
    <Dialog open={open} onClose={() => onClose(null)}>
      <DialogTitle>{TagStrings.titleCreate}</DialogTitle>
      <DialogContent>
        <DialogContentText>{TagStrings.descriptionCreate}</DialogContentText>
        <form>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <ColorPickerContainer>
                <ColorPicker color={color} onChange={setColor} />
              </ColorPickerContainer>
            </Grid>
            <Grid item xs={10}>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="name"
                label={TagStrings.name}
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)}>{CommonStrings.cancel}</Button>
        <Button
          onClick={() => {
            // TODO: Validate and create tag
          }}
        >
          {CommonStrings.create}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
