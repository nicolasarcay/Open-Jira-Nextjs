import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import NextLink from 'next/link';
import { MenuOutlined } from '@mui/icons-material';
import { FC, useContext } from 'react';
import { UIContext } from '../../context/ui';

export const Navbar: FC = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={openSideMenu}
        >
          <MenuOutlined />
        </IconButton>
        <NextLink href="/" passHref>
          <Link color="inherit" underline="none">
            <Typography variant="h6" component="h1">
              Open Jira
            </Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
