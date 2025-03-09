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
    IconDeviceRemote,
    IconHelp,
    IconBoxAlignBottom,
    IconBoxAlignLeft,
    IconLayout,
    IconZoomCode,
    IconSettings,
    IconBorderStyle2,
    IconAppWindow,
    IconLockAccess,
    IconBrandDocker,
    IconWallet,
    IconCloudComputing,
    IconBrandStackshare,
    IconTransactionDollar,
    IconUsers,
    IconDeviceTvOld,
    IconAccessPoint,
    IconContainer
  } from '@tabler/icons-react';
  
  import { uniqueId } from 'lodash';
  
  const Menuitems = [
    {
      navlabel: true,
      subheader: 'Home',
      role: 'USER_ROLE'
    },
  
    {
      id: uniqueId(),
      title: 'Modern',
      icon: IconAperture,
      href: '/dashboards/modern',
      chip: 'New',
      chipColor: 'secondary',
      role: 'USER_ROLE'
    },
    {
      id: uniqueId(),
      title: 'eCommerce',
      icon: IconShoppingCart,
      href: '/dashboards/ecommerce',
      role: 'USER_ROLE'
    },
    {
      navlabel: true,
      subheader: 'TV',
      role: 'USER_ROLE'
    },
    {
      id: uniqueId(),
      title: 'Canales',
      icon: IconDeviceTvOld,
      href: '/tv/channels',
      role: 'USER_ROLE'
    },
    {
      id: uniqueId(),
      title: 'Programas',
      icon: IconDeviceRemote,
      href: '/settings/programs',
      role: 'USER_ROLE'
    },
    {
      navlabel: true,
      subheader: 'Homelab',
      role: 'USER_ROLE'
    },
    {
      id: uniqueId(),
      title: 'Podman',
      icon: IconBrandDocker,
      href: '/containers/podman',
      role: 'USER_ROLE'
    },
    {
      id: uniqueId(),
      title: 'Qemu',
      icon: IconCloudComputing,
      href: '/vm/qemu',
      role: 'USER_ROLE'
    },
    {
      id: uniqueId(),
      title: 'IoT',
      icon: IconAccessPoint,
      href: '/vm/qemu',
      role: 'USER_ROLE'
    },
    {
      navlabel: true,
      subheader: 'Inversiones',
      role: 'USER_ROLE'
    },
    {
      id: uniqueId(),
      title: 'Assets',
      icon: IconBrandStackshare,
      href: '/investments/assets',
      role: 'USER_ROLE'
    },
    {
      id: uniqueId(),
      title: 'Transactions',
      icon: IconTransactionDollar,
      href: '/investments/transactions',
      role: 'USER_ROLE'
    },
    {
      id: uniqueId(),
      title: 'Wallet',
      icon: IconWallet,
      href: '/investments/wallet',
      role: 'USER_ROLE'
    },
    {
      navlabel: true,
      subheader: 'Settings',
    },
    {
      id: uniqueId(),
      title: 'Users',
      icon: IconUsers,
      href: '/settings/users',
    },
    {
      id: uniqueId(),
      title: 'Canales',
      icon: IconDeviceTvOld,
      href: '/settings/channels',
    },
  ];
  
  export default Menuitems;
  