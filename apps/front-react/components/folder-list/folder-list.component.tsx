import { Box, Menu, NavLink } from '@mantine/core';
import { INote, NoteList } from './note-list.component';
import {
  IconCirclePlus,
  IconDotsVertical,
  IconEdit,
  IconNote,
  IconTrash,
} from '@tabler/icons';
import {
  GetFoldersDocument,
  useCreateNoteMutation,
  useRemoveFolderMutation,
  useUpdateFolderMutation,
} from '@notes/apollo';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Note } from '@notes/entities/notes';
import { openModal } from '@mantine/modals';
import { CreateUpdateFolder } from '../CreateUpdateFolder';
import { Folder } from '@notes/entities/folders';

export interface IFolderList {
  folders: (Pick<Folder, 'id' | 'title'> & INote)[];
}

export const FolderList: FC<IFolderList> = ({ folders }) => {
  const { push } = useRouter();

  const [createNote] = useCreateNoteMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GetFoldersDocument }],
  });

  const [removeFolder] = useRemoveFolderMutation({
    refetchQueries: [{ query: GetFoldersDocument }],
  });

  const [updateFolder] = useUpdateFolderMutation();

  const afterCreateNote = (noteId, { id: folderId, title: folderTitle }) => {
    push(
      {
        pathname: '/dashboard/note',
        query: { noteId, folderId },
      },
      '/dashboard/note'
    );

    showNotification({
      title: `Created new note in folder ${folderTitle}`,
      message: 'You can edit it later',
      color: 'teal',
      icon: <IconNote />,
    });
  };

  const onUpdateFolder = folder =>
    openModal({
      title: 'Edit Title',
      children: (
        <CreateUpdateFolder
          possibleTitle={folder.title}
          mutation={() => updateFolder}
          payload={{
            variables: {
              updateFolderInput: { title: null, id: folder.id },
            },
          }}
        />
      ),
    });

  const onCreateNote = folder => {
    createNote({
      variables: {
        createNoteInput: {
          folder: { id: folder.id },
          title: 'New Note',
          content: 'Example content',
        },
      },
    }).then(({ data: { createNote } }) =>
      afterCreateNote(createNote.id, folder)
    );
  };

  return (
    <>
      {folders?.map(folder => (
        <Box
          key={folder.id}
          sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}
        >
          <Menu trigger={'hover'}>
            <Menu.Target>
              <IconDotsVertical
                style={{
                  marginRight: -10,
                  marginLeft: -15,
                  alignSelf: 'flex-start',
                  marginTop: 7,
                }}
              />
            </Menu.Target>
            <Menu.Dropdown sx={{ alignSelf: 'flex-start', marginTop: 7 }}>
              <Menu.Item
                onClick={onUpdateFolder.bind(this, folder)}
                icon={<IconEdit size={15} />}
              >
                Edit
              </Menu.Item>

              <Menu.Item
                onClick={() => removeFolder({ variables: { id: folder.id } })}
                icon={<IconTrash size={15} />}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Box
            key={folder.id}
            sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                position: 'relative',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'block', width: '100%' }}>
                <NavLink
                  variant={'filled'}
                  label={folder.title}
                  key={folder.id}
                  childrenOffset={20}
                >
                  {folder?.notes?.length > 0 ? (
                    <NoteList notes={folder.notes} />
                  ) : (
                    <Text align={'center'} py={2} size={'sm'}>
                      No notes in this folder
                    </Text>
                  )}
                </NavLink>
              </div>
            </Box>
            <IconCirclePlus
              style={{
                alignSelf: 'flex-start',
                marginTop: 9,
                cursor: 'pointer',
              }}
              size={20}
              onClick={onCreateNote.bind(this, folder)}
            />
          </Box>
        </Box>
      ))}
    </>
  );
};
