import { Box, Menu, NavLink } from '@mantine/core';
import { NoteList } from './note-list.component';
import {
  IconCirclePlus,
  IconDotsVertical,
  IconEdit,
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

export interface IFolderList {
  folders: {
    id: string;
    title: string;
    notes?: Pick<Note, 'id' | 'title'>[];
  }[];
}

export const FolderList: FC<IFolderList> = ({ folders }) => {
  const { push } = useRouter();

  const [createNote, { data: newNote }] = useCreateNoteMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GetFoldersDocument }],
  });

  const [removeFolder, { loading, error }] = useRemoveFolderMutation({
    refetchQueries: [{ query: GetFoldersDocument }],
  });

  const [updateFolder] = useUpdateFolderMutation();

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
                  position: 'absolute',
                  top: 6,
                }}
              />
            </Menu.Target>
            <Menu.Dropdown
              sx={{
                marginRight: -10,
                marginLeft: -15,
                position: 'absolute',
                top: 30,
              }}
            >
              <Menu.Item
                onClick={() =>
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
                  })
                }
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
              <div style={{ display: 'block', width: '90%' }}>
                <NavLink
                  variant={'filled'}
                  label={folder.title}
                  key={folder.id}
                  childrenOffset={20}
                >
                  <NoteList notes={folder.notes} folderId={folder.id} />
                </NavLink>
              </div>
            </Box>
            <IconCirclePlus
              style={{ position: 'absolute', right: '-5', top: '8' }}
              size={20}
              onClick={() => {
                createNote({
                  awaitRefetchQueries: true,
                  variables: {
                    createNoteInput: {
                      folder: { id: folder.id },
                      title: 'New Note',
                      content: 'Example content',
                    },
                  },
                });

                if (newNote) {
                  push(
                    {
                      pathname: '/dashboard/note',
                      query: {
                        noteId: newNote.createNote.id,
                        folderId: folder.id,
                      },
                    },
                    '/dashboard/note'
                  );

                  showNotification({
                    title: 'Create new note',
                    message: folder.id,
                  });
                }
              }}
            />
          </Box>
        </Box>
      ))}
    </>
  );
};
