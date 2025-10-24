// Role-based permissions configuration
const roles = {
  admin: {
    permissions: [
      'read:all',
      'write:all',
      'delete:all',
      'manage:users',
      'manage:content',
      'manage:settings',
      'manage:analytics',
      'manage:system'
    ],
    description: 'Full system access'
  },
  manager: {
    permissions: [
      'read:all',
      'write:content',
      'delete:content',
      'manage:users',
      'manage:content',
      'manage:analytics'
    ],
    description: 'Content and user management access'
  },
  customer: {
    permissions: [
      'read:own',
      'write:own',
      'read:public'
    ],
    description: 'Basic user access'
  }
};

// Function to check if a role has a specific permission
const hasPermission = (role, permission) => {
  const roleConfig = roles[role];
  if (!roleConfig) {
    return false;
  }
  
  return roleConfig.permissions.includes(permission) || 
         roleConfig.permissions.includes('read:all') ||
         roleConfig.permissions.includes('write:all') ||
         roleConfig.permissions.includes('delete:all');
};

// Function to get all permissions for a role
const getRolePermissions = (role) => {
  const roleConfig = roles[role];
  return roleConfig ? roleConfig.permissions : [];
};

// Function to check if user can perform action on resource
const canAccess = (userRole, action, resource) => {
  const permission = `${action}:${resource}`;
  return hasPermission(userRole, permission);
};

// Function to get user capabilities
const getUserCapabilities = (role) => {
  const roleConfig = roles[role];
  if (!roleConfig) {
    return {
      canRead: false,
      canWrite: false,
      canDelete: false,
      canManage: false
    };
  }
  
  return {
    canRead: roleConfig.permissions.some(p => p.startsWith('read:')),
    canWrite: roleConfig.permissions.some(p => p.startsWith('write:')),
    canDelete: roleConfig.permissions.some(p => p.startsWith('delete:')),
    canManage: roleConfig.permissions.some(p => p.startsWith('manage:'))
  };
};

module.exports = {
  roles,
  hasPermission,
  getRolePermissions,
  canAccess,
  getUserCapabilities
};


