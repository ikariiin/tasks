import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  createFilterOptions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { TagDto } from "@tasks/common";
import React from "react";
import { boardApi, useAddTagToBoardMutation } from "../../services/api/board";
import {
  useCreateTagMutation,
  useGetTagsByUserQuery,
} from "../../services/api/tag";
import { useAppDispatch } from "../../services/store";
import { CommonStrings } from "../../services/strings/common";
import { TagStrings } from "../../services/strings/tags";
import { getContrastTextColor } from "../../services/theme/contrast-text";
import { ColorPicker } from "../common/color-picker";

export interface TagCreateModalProps {
  open: boolean;
  onClose: (tag: TagDto | null) => void;
  presentTags: TagDto[];
  boardId: string;
}

export type AddTagOptionType = {
  tag: TagDto | null;
  label: string;
  inputValue?: string;
};

const filter = createFilterOptions<AddTagOptionType>();

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

export const TagCreateModal = ({
  boardId,
  open,
  onClose,
  presentTags = [],
}: TagCreateModalProps) => {
  const [value, setValue] = React.useState<AddTagOptionType | null>(null);
  const [color, setColor] = React.useState("#ffffff");
  const { data: userTags, isLoading: tagsLoading } = useGetTagsByUserQuery();

  const [createTag, { isLoading: submitting }] = useCreateTagMutation();
  const [addTag, { isLoading: adding }] = useAddTagToBoardMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (ev?: React.FormEvent<HTMLFormElement>) => {
    if (ev) ev.preventDefault();

    if (!value) return;

    if (value.tag) {
      const tag = await addTag({
        boardId,
        tagId: value.tag.id,
      }).unwrap();
      onClose(tag);
    } else if (value.inputValue) {
      const createTagDto = {
        name: value.inputValue,
        color: color,
        boardId,
        contrastText: getContrastTextColor(color),
      };
      const tag = await createTag(createTagDto).unwrap();
      dispatch({
        type: `${boardApi.reducerPath}/invalidateTags`,
        payload: ["Board", "Tag"],
      });
      onClose(tag);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(null)}>
      <DialogTitle>{TagStrings.addTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{TagStrings.descriptionCreate}</DialogContentText>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={10}>
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setValue(value);
                  } else if (newValue && newValue.inputValue) {
                    setValue({
                      tag: null,
                      label: `Add "${newValue.inputValue}"`,
                      inputValue: newValue.inputValue,
                    });
                  } else {
                    setValue(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  const { inputValue } = params;
                  const isExistingTag = userTags?.some(
                    (tag) => tag.name === inputValue,
                  );
                  if (inputValue !== "" && !isExistingTag) {
                    filtered.push({
                      tag: null,
                      label: `Add "${inputValue}"`,
                      inputValue,
                    });
                  }

                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={
                  userTags
                    ?.filter(
                      (tag) => !presentTags.some((pTag) => tag.id === pTag.id),
                    )
                    .map((tag) => ({
                      tag,
                      label: tag.name,
                      inputValue: undefined,
                    })) || []
                }
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.label;
                }}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          backgroundColor: option.tag?.color || color,
                        }}
                      />
                      <Box>{option.label}</Box>
                    </Stack>
                  </li>
                )}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={TagStrings.name}
                    margin="normal"
                    variant="outlined"
                    type="search"
                  />
                )}
                disabled={tagsLoading || submitting || adding}
              />
            </Grid>
            <Grid item xs={2}>
              <ColorPickerContainer>
                <ColorPicker color={color} onChange={setColor} />
              </ColorPickerContainer>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)}>{CommonStrings.cancel}</Button>
        <LoadingButton
          onClick={() => {
            onSubmit();
          }}
          loading={submitting || adding}
        >
          {value?.tag === null ? CommonStrings.create : CommonStrings.add}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
