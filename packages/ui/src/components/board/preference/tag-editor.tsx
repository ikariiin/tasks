import { Button, Typography } from "@mui/material";
import { TagDto } from "@tasks/common";
import React from "react";
import { TagStrings } from "../../../services/strings/tags";
import { ActionButtonContainer } from "../../common/action-button-container";
import { PaddedPaper } from "../../common/padded-paper";
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

    return <div>tags</div>;
  };

  return (
    <React.Fragment>
      <TagCreateModal open={open} onClose={() => setOpen((val) => !val)} />
      <PaddedPaper elevation={4}>
        <Typography variant="h5">{TagStrings.title}</Typography>
        {renderContent()}
        <ActionButtonContainer>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={() => setOpen((val) => !val)}
          >
            {TagStrings.add}
          </Button>
        </ActionButtonContainer>
      </PaddedPaper>
    </React.Fragment>
  );
};
