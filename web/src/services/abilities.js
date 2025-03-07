import { defineAbility } from '@casl/ability';

export default (user) => defineAbility((can) => {
  if (user.roles.includes('ADMIN_ROLE')) {
    can('view', 'MenuItem');
    can('manage', 'Asset'); // can create, edit, delete
    can('manage', 'Channel'); // can create, edit, delete
    can('manage', 'User'); // can create, edit, delete
    can('manage', 'Container'); // can create, edit, delete
  } else {
    can('view', 'MenuItem', { role: 'USER_ROLE' });
  }
  can('manage', 'Transaction'); // TODO limt to own transactions
});