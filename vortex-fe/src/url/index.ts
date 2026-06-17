export const urls = {
  auth: {
    login: 'Auth/login',
    me: 'User/me',
  },
  project: {
    getProject: '/Project/get-projects',
    getUsersToInvite: '/Project/get-projects-user-to-invite',
    upsertProject: '/Project/upsert-project',
    deleteProject: '/Project/delete-project',
    getProjectDetailsForUpdate: '/Project/get-project-details-for-edit',
  },
} as const;
