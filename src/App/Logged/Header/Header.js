import React from 'react';
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
} from '@elastic/eui';
import { useUser } from 'reactfire';

import AppTitle from '../../AppTitle';
import HeaderUserMenu from './HeaderUserMenu';

function Header() {
  const user = useUser();

  return (
    <EuiHeader position="fixed">
      <EuiHeaderSection grow={false}>
        <EuiHeaderSectionItem border="none">
          <AppTitle size="s" />
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
      {user && (
        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem border="none">
            <HeaderUserMenu />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      )}
    </EuiHeader>
  );
}

export default Header;
