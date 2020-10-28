import React, { useState } from 'react';
import { useUser, useFirebaseApp } from 'reactfire';
import './HeaderUserMenu.scss';
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPopover,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import AccountButton from '../Header/AccountButton';
import UserAvatar from '../User/UserAvatar';
import { LoggedContext } from '../LoggedContext';

function HeaderUserMenu() {
  const user = useUser();
  const firebase = useFirebaseApp();
  const [isOpen, setIsOpen] = useState(false);

  const onMenuButtonClick = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  const logOut = async () => await firebase.auth().signOut();

  const button = <AccountButton isOpen={isOpen} onClick={onMenuButtonClick} />;

  return (
    <LoggedContext.Consumer>
      {({ save, clear }) => (
        <EuiPopover
          ownFocus
          repositionOnScroll
          button={button}
          isOpen={isOpen}
          anchorPosition="downRight"
          closePopover={closeMenu}
          panelPaddingSize="none"
        >
          <EuiFlexGroup
            gutterSize="m"
            className="AccountDetail"
            responsive={false}
          >
            <EuiFlexItem grow={false}>
              <UserAvatar size="xl" />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText>
                <p>{user ? user.email : 'Guest'}</p>
              </EuiText>
              <EuiSpacer size="s" />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFlexGroup justifyContent="spaceBetween">
                    <EuiFlexItem grow={false}>
                      <EuiButton
                        size="s"
                        onClick={() => {
                          save();
                          logOut();
                          clear();
                        }}
                      >
                        Log out
                      </EuiButton>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPopover>
      )}
    </LoggedContext.Consumer>
  );
}

export default HeaderUserMenu;
