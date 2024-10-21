import { Button, Menu, MenuItem } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { availableLanguages, DEFAULT_LANGUAGE_CODE } from 'constants/languages';
import useLocalStorage from 'hooks/localStorage';
import { languageKey } from 'constants/localStorage';
import { userService } from 'services';
import { useAuth } from 'providers/AuthContext';

const LanguageMenu = () => {
  const { i18n } = useTranslation('main');
  const [, setSelectedLanguageCode] = useLocalStorage<string>(languageKey, DEFAULT_LANGUAGE_CODE);

  const { userSignedIn } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedLanguage = useMemo(() => availableLanguages.find(
      (language) => language.code === i18n.language
    ), [i18n.language]);

  const changeLanguage = (newLanguageCode: string) => {
    i18n.changeLanguage(newLanguageCode);
    setSelectedLanguageCode(newLanguageCode);

    if (userSignedIn) {
      userService.setLanguage({language: newLanguageCode});
    }

    handleClose();
  };

  const menuItems = availableLanguages.filter((lang) => lang.code !== i18n.language);

  return (
    <div>
      <Button
        id="language-switch-btn"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img src={selectedLanguage?.flag} alt={selectedLanguage?.name} />
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-switch-btn',
        }}
      >
        {
          menuItems.map((language) => (
            <MenuItem
              onClick={() => { changeLanguage(language.code) } }
              key={`language-${language.code}`}
              title={language.name}
            >
              <img src={language.flag} alt={language.name} />
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  )
}

export default LanguageMenu;