import React from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMobileSidebar } from '@app/store/slices/CustomizerSlice';
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup';
import { subject } from '@casl/ability';
import { Can } from '@app/components/guards/Can';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const dispatch = useDispatch();

   return (
     <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item, index) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return (
              <Can I="view" a={subject('MenuItem', item)} key={`view-${item.subheader}`}> 
                <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />
              </Can>
            );
            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else if (item.children) {
            return (
              <Can I="view" a={subject('MenuItem', item)} key={`view-${item.title}`}> 
                <NavCollapse
                  menu={item}
                  pathDirect={pathDirect}
                  hideMenu={hideMenu}
                  pathWithoutLastPart={pathWithoutLastPart}
                  level={1}
                  key={item.id}
                  onClick={() => dispatch(toggleMobileSidebar())}
              />
              </Can>
            );
            // {/********If Sub No Menu**********/}
          } else {
            return (
              <Can I="view" a={subject('MenuItem', item)} key={`view-${item.id}`}> 
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
              </Can>
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
