import { NavLink, Navbar as MNavbar } from '@mantine/core';


export const Navbar = () => {
  return (
    <MNavbar
      p="md"
      className={`transition-all duration-300 ease-in-out `}
      // hiddenBreakpoint="sm"

      width={{ sm: 200, lg: 300 }}
    >
      <NavLink label="First parent link" childrenOffset={28}>
        <NavLink label="First child link" />
        <NavLink label="Second child link" />
        <NavLink label="Nested parent link" childrenOffset={28}>
          <NavLink label="First child link" />
          <NavLink label="Second child link" />
          <NavLink label="Third child link" />
        </NavLink>
      </NavLink>

      <NavLink label="Second parent link" childrenOffset={28}>
        <NavLink label="First child link" />
        <NavLink label="Second child link" />
        <NavLink label="Third child link" />
      </NavLink>
    </MNavbar>
  );
};
