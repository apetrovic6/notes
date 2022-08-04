import Link from 'next/link';
import { NavLink } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';

export const NoteList = ({ notes, folderId }) => {
  const { push } = useRouter();
  return (
    <>
      {notes?.map(note => (
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
      ))}

      <IconCirclePlus
        style={{ position: 'absolute', right: '-5', top: '8' }}
        size={20}
        onClick={() => {
          showNotification({
            title: 'Create new note',
            message: folderId,
          });

          push(
            {
              pathname: '/dashboard/new',
              query: { folderId: folderId },
            },
            '/dashboard/new'
          );
        }}
      />
    </>
  );
};
