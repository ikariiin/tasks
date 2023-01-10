import { Button, Stack, Typography } from "@mui/material";
import { TagDto } from "@tasks/common";
import React from "react";
import {
  boardApi,
  useRemoveTagFromBoardMutation,
} from "../../../services/api/board";
import { useAppDispatch } from "../../../services/store";
import { TagStrings } from "../../../services/strings/tags";
import { ActionButtonContainer } from "../../common/action-button-container";
import { PaddedPaper } from "../../common/padded-paper";
import { Tag } from "../../tag";
import { TagCreateModal } from "../../tag/create-modal";
import { NoTags } from "./no-tags";

export const TagEditor = ({
  boardId,
  tags,
}: {
  boardId: string;
  tags: TagDto[];
}) => {
  const [open, setOpen] = React.useState(false);
  const [removeFromBoard] = useRemoveTagFromBoardMutation();
  const dispatch = useAppDispatch();

  const renderContent = () => {
    if (tags.length === 0) {
      return (
        <NoTags
          onClick={() => {
            setOpen((val) => !val);
          }}
        />
      );
    }

    return (
      <Stack
        direction="row"
        spacing={1}
        sx={{
          my: 2,
        }}
      >
        {tags.map((tag) => (
          <Tag
            onRemove={() => {
              removeFromBoard({ boardId, tagId: tag.id });
              dispatch({
                type: `${boardApi.reducerPath}/invalidateTags`,
                payload: ["Board", "Tag"],
              });
            }}
            tag={tag}
            key={tag.id}
          />
        ))}
      </Stack>
    );
  };

  return (
    <React.Fragment>
      <TagCreateModal
        boardId={boardId}
        open={open}
        presentTags={tags}
        onClose={() => {
          setOpen((val) => !val);
        }}
      />
      <PaddedPaper elevation={4}>
        <Typography variant="h5">{TagStrings.title}</Typography>
        {renderContent()}
        <ActionButtonContainer>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => setOpen((val) => !val)}
          >
            {TagStrings.addTitle}
          </Button>
        </ActionButtonContainer>
      </PaddedPaper>
    </React.Fragment>
  );
};
