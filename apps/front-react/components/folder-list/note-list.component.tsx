import Link from 'next/link';
import { NavLink, Box, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import { GetFoldersDocument, useRemoveNoteMutation } from '@notes/apollo';
import { Note } from '@notes/entities/notes';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { showNotification } from '@mantine/notifications';

import { User } from '@notes/entities/user';

export interface INote {
  notes: (Pick<Note, 'id' | 'title' | 'shared'> & { user: Pick<User, 'id'> })[];
}

export const NoteList: FC<INote> = ({ notes }) => {
  const { replace, query } = useRouter();
  const [removeNote] = useRemoveNoteMutation({
    refetchQueries: [{ query: GetFoldersDocument }],
    awaitRefetchQueries: true,
  });

  function onDeleteNote({ id, title }: Pick<Note, 'id' | 'title'>) {
    removeNote({ variables: { id } });
    if (id === query.noteId) {
      replace('/dashboard');
    }
    showNotification({
      title: 'Note deleted',
      message: title,
      icon: <IconTrash size={20} />,
      color: 'red',
    });
  }

  return (
    <>
      {notes?.map(note => (
        <Box sx={{ display: 'flex', alignItems: 'center' }} key={note.id}>
          <Link
            key={note.id}
            href={{
              pathname: '/dashboard/note',
              query: { noteId: note.id },
            }}
            as={'/dashboard/note'}
            passHref
          >
            <NavLink key={note.id} label={note.title} component={'a'} />
          </Link>
          <ActionIcon variant={'subtle'}>
            <IconTrash onClick={onDeleteNote.bind(this, note)} />
          </ActionIcon>
        </Box>
      ))}
    </>
  );
};
