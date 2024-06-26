import {
    IconAward,
    IconBoxMultiple,
    IconPoint,
    IconAlertCircle,
    IconNotes,
    IconCalendar,
    IconMail,
    IconTicket,
    IconEdit,
    IconGitMerge,
    IconCurrencyDollar,
    IconApps,
    IconFileDescription,
    IconFileDots,
    IconFiles,
    IconBan,
    IconStar,
    IconMoodSmile,
    IconBorderAll,
    IconBorderHorizontal,
    IconBorderInner,
    IconBorderVertical,
    IconBorderTop,
    IconUserCircle,
    IconPackage,
    IconMessage2,
    IconBasket,
    IconChartLine,
    IconChartArcs,
    IconChartCandle,
    IconChartArea,
    IconChartDots,
    IconChartDonut3,
    IconChartRadar,
    IconLogin,
    IconUserPlus,
    IconRotate,
    IconBox,
    IconAperture,
    IconShoppingCart,
    IconHelp,
    IconBoxAlignBottom,
    IconBoxAlignLeft,
    IconLayout,
    IconZoomCode,
    IconSettings,
    IconBorderStyle2,
    IconAppWindow,
    IconLockAccess,
    IconWallet,
    IconBrandStackshare
  } from '@tabler/icons-react';
  
  import { uniqueId } from 'lodash';
  
  const Menuitems = [
    {
      navlabel: true,
      subheader: 'Home',
    },
  
    {
      id: uniqueId(),
      title: 'Modern',
      icon: IconAperture,
      href: '/dashboards/modern',
      chip: 'New',
      chipColor: 'secondary',
    },
    {
      id: uniqueId(),
      title: 'eCommerce',
      icon: IconShoppingCart,
      href: '/dashboards/ecommerce',
    },
    {
      navlabel: true,
      subheader: 'Inversiones',
    },
    {
      id: uniqueId(),
      title: 'Activos',
      icon: IconBrandStackshare,
      href: '/investments/assets',
    },    
    {
      navlabel: true,
      subheader: 'Settings',
    },
  ];
  
  export default Menuitems;
  