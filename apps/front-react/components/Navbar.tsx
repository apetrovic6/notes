import {
  Navbar as MNavbar,
  Button,
  SegmentedControl,
  Skeleton,
} from '@mantine/core';
import { FolderList } from './folder-list/folder-list.component';
import { NoteList } from './folder-list/note-list.component';
import { openModal } from '@mantine/modals';
import { CreateUpdateFolder } from './CreateUpdateFolder';
import {
  GetFoldersDocument,
  useCreateFolderMutation,
  useGetFoldersQuery,
  useGetSharedNotesQuery,
} from '@notes/apollo';
import { useState } from 'react';

export const Navbar = ({ opened }) => {
  const [showShared, setShowShared] = useState('my-notes');
  const { data, loading } = useGetFoldersQuery();
  const { data: sharedNotes } = useGetSharedNotesQuery();

  const [createFolder] = useCreateFolderMutation({
    refetchQueries: [GetFoldersDocument],
  });

  const onCreateFolder = () => {
    openModal({
      title: 'Create Folder',
      children: (
        <>
          <CreateUpdateFolder
            mutation={() => createFolder}
            payload={{
              variables: { createFolderInput: { title: null } },
            }}
          />
        </>
      ),
    });
  };

  const segmentData = [
    {
      label: 'My notes',
      value: 'my-notes',
    },
    {
      label: 'Shared',
      value: 'shared',
    },
  ];

  return (
    <MNavbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 310 }}
    >
      <Button
        fullWidth
        mb={10}
        variant="light"
        radius="lg"
        onClick={onCreateFolder}
      >
        Create Folder
      </Button>

      <SegmentedControl
        value={showShared}
        onChange={setShowShared}
        color={'blue'}
        radius={'lg'}
        data={segmentData}
      />

      {loading && (
        <>
          <Skeleton height={15} radius="xl" />
          <Skeleton height={15} mt={10} radius="xl" />
          <Skeleton height={15} mt={10} radius="xl" />
        </>
      )}

      {showShared === 'my-notes' && data?.folders && (
        <FolderList folders={data.folders} />
      )}

      {showShared === 'shared' && sharedNotes && (
        <NoteList notes={sharedNotes?.getNotesForCollaborator} />
      )}
    </MNavbar>
  );
};
