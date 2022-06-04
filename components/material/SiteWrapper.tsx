import React from "react";
import { ChevronLeft, Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, AppBarProps, Drawer, IconButton, styled, Toolbar, Typography } from "@mui/material";

interface Props {
  navContent: JSX.Element,
  userMenu: JSX.Element,
  logoUrl: string,
  pageTitle: string
}

export const SiteWrapper: React.FC<Props> = props => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => { setOpen(!open); };

  const drawerWidth: number = 240;
  const CustomDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        }),
        boxSizing: "border-box",
        ...(!open && {
          overflowX: "hidden",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up("sm")]: { width: theme.spacing(9) }
        })
      }
    })
  );

  interface CustomAppBarProps extends AppBarProps {
    open?: boolean;
  }

  const CustomAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== "open"
  })<CustomAppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  }));

  return <>
    <CustomAppBar position="absolute" open={open}>
      <Toolbar sx={{ pr: "24px" }}>
        <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{ marginRight: "36px", ...(open && { display: "none" }) }}>
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, borderBottom: "none" }}>
          {props.pageTitle}
        </Typography>
        {props.userMenu}
      </Toolbar>
    </CustomAppBar>

    <CustomDrawer variant="permanent" open={open}>
      <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", px: [1] }}>
        <img src={props.logoUrl} alt="logo" style={{ maxWidth: 170 }} />
        <IconButton onClick={toggleDrawer}><ChevronLeft /></IconButton>
      </Toolbar>
      {props.navContent}
    </CustomDrawer>
  </>
};
