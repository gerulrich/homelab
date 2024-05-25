import img1 from '@app/assets/images/profile/user-1.jpg';
import LedFxIcon from '@app/assets/apps/ledfx.png';
import MongoExpressIcon from '@app/assets/apps/mongo-express.png';

//
// Notifications dropdown
//
const notifications = [
  {
    avatar: img1,
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
  },
  {
    avatar: img1,
    title: 'New message received',
    subtitle: 'Salma sent you new message',
  }
];

//
// Profile dropdown
//
const profile = [
  {
    href: '/user-profile',
    title: 'My Profile',
    subtitle: 'Account Settings',
    icon: img1,
  },
  {
    href: '/apps/email',
    title: 'My Inbox',
    subtitle: 'Messages & Emails',
    icon: img1,
  },
  {
    href: '/apps/notes',
    title: 'My Tasks',
    subtitle: 'To-do and Daily Tasks',
    icon: img1,
  },
];

// apps dropdown

const appsLink = [
  {
    href: 'https://plex.homelab.net.ar',
    title: 'Plex',
    subtext: 'Media Server',
    avatar: "/src/assets/apps/plex.svg",
  },
  {
    href: '/apps/ecommerce/shop',
    title: 'Pi Hole',
    subtext: 'Ad Blocking',
    avatar: "/src/assets/apps/pihole.svg",
  },
  {
    href: 'https://guacamole.homelab.net.ar/',
    title: 'Guacamole',
    subtext: 'Remote Access',
    avatar: "/src/assets/apps/guacamole.svg",
  },
  {
    href: '/apps/calendar',
    title: 'Photo Prism',
    subtext: 'Photo Organization & Storage',
    avatar: "/src/assets/apps/photoprism.svg",
  },
  {
    href: '/apps/contacts',
    title: 'Node Red',
    subtext: 'Task Automation and Workflow',
    avatar: "/src/assets/apps/node-red.svg",
  },
  {
    href: 'https://hassio.homelab.net.ar',
    title: 'Home Assistant',
    subtext: 'Home Control and Automation',
    avatar: "/src/assets/apps/homeassistant.svg",
  },
  {
    href: '/apps/email',
    title: 'ESP Home',
    subtext: 'Microcontrollers & Home Automation',
    avatar: "/src/assets/apps/esphome.svg",
  },
  {
    href: '/dashboards/ecommerce',
    title: 'Vault Garden ',
    subtext: 'Password Manager',
    avatar: "/src/assets/apps/vaultwarden.svg"
  },
  {
    href: '/dashboards/ecommerce',
    title: 'LedFX ',
    subtext: 'LED Light Control and Visual Effects',
    avatar: LedFxIcon,
  },
  {
    href: '/dashboards/ecommerce',
    title: 'Zigbee2MQTT ',
    subtext: 'Zigbee Devices and MQTT',
    avatar: "/src/assets/apps/zigbee2mqtt.svg",
  },  
  {
    href: '/dashboards/ecommerce',
    title: 'Mongo DB ',
    subtext: 'Database explorer',
    avatar: MongoExpressIcon,
  },  
  {
    href: '/dashboards/ecommerce',
    title: 'MQTT explorer ',
    subtext: 'Explore messages & topics',
    avatar: "/src/assets/apps/mqtt.svg",
  }
];

const pageLinks = [
  {
    href: '/pricing',
    title: 'Pricing Page',
  },
  {
    href: '/auth/login',
    title: 'Authentication Design',
  },
  {
    href: '/auth/register',
    title: 'Register Now',
  },
  {
    href: '/404',
    title: '404 Error Page',
  },
  {
    href: '/apps/notes',
    title: 'Notes App',
  },
  {
    href: '/user-profile',
    title: 'User Application',
  },
  {
    href: '/apps/blog/posts',
    title: 'Blog Design',
  },
  {
    href: '/apps/ecommerce/eco-checkout',
    title: 'Shopping Cart',
  },
];

export { notifications, profile, pageLinks, appsLink };
