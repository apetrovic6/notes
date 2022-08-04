import { Box, NavLink } from '@mantine/core';
import { NoteList } from './note-list.component';

export const FolderList = ({ folders }) => {
  return (
    <>
      {folders?.map(folder => (
        <Box key={folder.id} sx={{ display: 'flex', alignItems: 'center' }}>
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
        </Box>
      ))}
    </>
  );
};
