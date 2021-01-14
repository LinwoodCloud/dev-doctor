import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Link as RouterLink } from "react-router-dom";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import GavelOutlinedIcon from "@material-ui/icons/GavelOutlined";
import {
  AppBar,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SvgIcon,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ReactComponent as LogoDark } from "../logo-dark.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));
interface MyAppBarProps {
  title: string;
  subtitle?: string;
}

export default function MyAppBar({
  title,
  subtitle,
}: MyAppBarProps): ReactElement {
  const { t, i18n } = useTranslation("common");
  const [languageAnchorEl, setLanguageAnchorEl] = React.useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = React.useState(null);

  const handleLanguageClick = (event: { currentTarget: unknown }) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };
  const handleAccountClick = (event: { currentTarget: unknown }) => {
    setAccountAnchorEl(event.currentTarget);
  };
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleLanguageClose();
  };

  const handleAccountClose = () => {
    setAccountAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          component={RouterLink}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          to="/"
        >
          <SvgIcon component={LogoDark} viewBox="0 0 400 400" />
        </IconButton>
        <div className={classes.title}>
          <Typography variant="h6">
            {process.env.REACT_APP_VERSION} {title}
          </Typography>
          {subtitle && (
            <Typography variant="subtitle1" color="textSecondary">
              {subtitle}
            </Typography>
          )}
        </div>
        {/* <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton> */}
        <IconButton
          aria-controls="language-menu"
          aria-haspopup="true"
          onClick={handleLanguageClick}
        >
          <LanguageOutlinedIcon />
        </IconButton>
        <Menu
          id="language-menu"
          anchorEl={languageAnchorEl}
          keepMounted
          open={Boolean(languageAnchorEl)}
          onClose={handleLanguageClose}
        >
          {i18n.languages.map((e) => (
            <MenuItem
              key={e}
              onClick={() => changeLanguage(e)}
              selected={e === i18n.language}
            >
              {t(`language.${e}`)}
            </MenuItem>
          ))}
        </Menu>
        <IconButton
          aria-controls="account-menu"
          aria-haspopup="true"
          onClick={handleAccountClick}
        >
          <AccountCircleOutlinedIcon />
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={accountAnchorEl}
          keepMounted
          open={Boolean(accountAnchorEl)}
          onClose={handleAccountClose}
        >
          <MenuItem>
            <ListItemIcon>
              <TuneOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("profile")} />
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <AssessmentOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("stats")} />
          </MenuItem>
          <MenuItem component={RouterLink} to="/settings">
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("settings")} />
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <InfoOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("info")} />
          </MenuItem>
          <MenuItem
            component={Link}
            href="https://codedoctor.tk/impress"
            target="_blank"
            color="inherit"
          >
            <ListItemIcon>
              <GavelOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("impress")} />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
