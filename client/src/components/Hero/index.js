import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import MenuItem from '@material-ui/core/MenuItem'
import Badge from '@material-ui/core/Badge'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Avatar from '@material-ui/core/Avatar'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  the__title: {
    width: "100%",
    fontWeight: "700",
    lineHeight: "1",
  },
  menuItem: {
    color: "secondary",
    fontWeight: "700",
    textAlign: "center",
    maxWidth: "80px",
    margin: "0 5px",
    padding: "5px",
    borderRadius: "3px",
    flexGrow: 1
  },
  appBar: {
    width: "100%",
    backgroundColor: "#fff",
  },
  main__pageHeader: {
    height: "100%",
    minHeight: "90vh",
    textAlign: "left",
    padding: "100px 50px",
    display: "flex",
    justifyContent: "left",
    width: "100%",
    backgroundColor: "#ffffff"
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  hover: {
    textOpacity: 1,
    color: "#d2d6dc",
    // color: rgba(210,214,220,(textOpacity)),
  },
  MenuItem: {
    color: "#000",
  },
  MenuItemSelected: { /* Increase the specificity */
    color: "#f3f3fe",
  },
  the__button: {
    fontSize: "18px",
    marginRight: theme.spacing(2),
    padding: "15px 35px",
    borderRadius: "6px",
  },
  the__content: {
    padding: theme.spacing(3, 0),
    maxWidth: "500px",
  },
  pad50: {
    padding: "0 50px"
  }
}));

const Logo = () => {
  const classes = useStyles();
  
  return (
    <div>
      <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className={classes.small}/>
    </div>
  )
}


export default function Hero() {
  const classes = useStyles();
  
  return (
    <div className="main__nav">
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.pad50}>
            <Logo />
            <Link href="/" selected className={classes.menuItem}>Home</Link>
            <Link href="/team" className={classes.menuItem}>Product</Link>
            <Link href="/projects" className={classes.menuItem}>Feature</Link>
            <Link href="/calendar" className={classes.menuItem}>Marketplace</Link>
            <Link href="/reports" className={classes.menuItem}>Log In</Link>
            <div className={classes.grow}></div>
            {/* <MenuItem>
              <IconButton aria-label="show 11 new notifications" className={classes.menuItem}>
                <Badge badgeContent={11} color="error">
                  <NotificationsNoneOutlinedIcon />
                </Badge>
              </IconButton>
            </MenuItem> */}
            {/* <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className={classes.small}/> */}
        </Toolbar>
      </AppBar>
     
      <div className={classes.main__pageHeader}>
        <Box component="div" justifyContent	="flex-center">
          <Typography variant="h2" component="h1" className={classes.the__title}>Hero with angled <br /> image on right</Typography>
          <Typography component="p" className={classes.the__content}>Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</Typography>
          <Button variant="contained" color="secondary" size="large" className={classes.the__button}>
            Get Started
          </Button>
          <Button variant="contained" color="text.primary" size="large" className={classes.the__button}>
            Live Demo
          </Button>
        </Box>
        {/* <Box component="div" justifyContent	="flex-center">
          <img src="https://images.unsplash.com/photo-1558403121-aa30fd55fdf4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1339&q=80"></img>
        </Box> */}
      </div>
    </div>
  )
}
