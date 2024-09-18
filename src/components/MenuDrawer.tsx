import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Routing, ClipboardText, UserSquare, Folder, Setting3 } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import { FaSortDown } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [subSIAPPOpen, setSubSIAPPOpen]=useState(false);
  const [subReportOpen, setSubReportOpen]=useState(false);
  const pathName = usePathname();

  const toggleSubmenu=(menu: any)=>{
    if(menu === 'SIAPP') {
      setSubSIAPPOpen(!subSIAPPOpen);
    }
    else if(menu === 'Report'){
      setSubReportOpen(!subReportOpen);
    }
    
    console.log("menu =", menu);
  }

  const menuList = [
    {
      group: "General",
      items: [
        {
          path: '/dashboard',
          text: 'Dashboard',
          icon: <CiGrid41 size={24}/>,
        },
        {
          path: '/',
          text: 'SIAPP',
          icon: <Routing size={24} variant="Bold"/>,
          submenu: true,
          submenuItems: [
            {title: 'Patrol', path: "/", icon: <GoDotFill/>},
            {title: 'Incident', path: "/", icon: <GoDotFill/>},
            {title: 'Manpower', path: "/", icon: <GoDotFill/>},
            {title: 'Daily summary report', path: "/", icon: <GoDotFill/>},
            {title: 'Monitoring report', path: "/", icon: <GoDotFill/>},
          ]
        },
        {
          path: '/',
          text: 'Report',
          icon: <ClipboardText size={22}/>,
          submenu: true,
          submenuItems: [
            {title: 'Daily', path: "/", icon: <GoDotFill/>},
            {title: 'Monthly', path: "/", icon: <GoDotFill/>},
            {title: 'Minutes of meeting', path: "/", icon: <GoDotFill/>},
          ]
        },
        {
          path: '/',
          text: 'User',
          icon: <UserSquare size={22}/>
        },
        {
          path: '/',
          text: 'Master Data',
          icon: <Folder size={22}/>
        },
        {
          path: '/',
          text: 'Configuration',
          icon: <Setting3 size={22}/>
        },
      ]
    }
  ]

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const submenu=(option:any, optionkey: number)=> {
      return (
        option?.submenu ? 
        (<div key={`option-${optionkey}`}> 
        <CommandList>
            <div onClick={()=>toggleSubmenu(option.text)}>
            <CommandItem key={optionkey} className="flex gap-2 flex-1">
              {option?.icon}
              {option?.text}
              <FaSortDown size={20} 
               className={`${subSIAPPOpen&&(option.text==='SIAPP') || subReportOpen&&(option.text==='Report') ? "rotate-180 mt-2" : "mb-2"} ml-auto stroke-2 text-xs`}/>
            </CommandItem>
            </div>
            
            { subSIAPPOpen && (option.text === 'SIAPP') && (
              <CommandList>
                {option.submenuItems?.map((submenu: any, submenukey: number) => (
                  <Link key={submenukey} href={submenu.path}>
                    <CommandItem key={submenukey} className={`${pathName === submenu?.path ? "bg-accent" : ""} gap-2 px-7 py-3 leading-5 flex1`}>
                      {submenu?.icon}
                      {submenu?.title}
                    </CommandItem>
                  </Link>
                ))}
              </CommandList>
            )}
  
            { subReportOpen && (option.text === 'Report') && (
               <CommandList>
                {option.submenuItems?.map((submenu: any, submenukey: number) => (
                  <Link key={submenukey} href={submenu.path}>
                    <CommandItem key={submenukey} className={`${pathName === submenu?.path ? "bg-accent" : ""} gap-2 px-7 py-3 leading-5 flex1`}>
                      {submenu?.icon}
                      {submenu?.title}
                    </CommandItem>
                  </Link>
                ))}
              </CommandList>
            )}
            </CommandList>
            </div>
        ) : 
        (<Link key={optionkey} href={option?.path}>
            <CommandItem key={optionkey} className={`${pathName === option?.path ? "bg-accent" : ""} flex gap-2`}>
              {option.icon}
              {option.text}
            </CommandItem>
        </Link>)
      );
    }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 240 }}
      role="alert"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Command style={{overflow: 'visible'}}>
        <CommandList style={{overflow: 'visible'}}>
          {menuList.map((menu: any, menukey:number) => (
            <CommandGroup key={menukey}>
              {menu.items.map((option: any, optionKey: number) => (
                submenu(option, optionKey)
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </Box>
  );

  return (
    <div>
      {(['top', 'bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{width: 200, bgcolor: 'red'}}
            elevation={5}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
