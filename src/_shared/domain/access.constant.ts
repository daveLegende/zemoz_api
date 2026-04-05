import { AccessEnum } from '../../user/domain';

export const RULES = [
  {
    designation: 'Gestion des utilisateurs',
    description: 'Gérer tout ce qui concerne les utilisateurs',
    tag: null,
    permissions: [
      {
        designation: 'Afficher les utilisateurs',
        value: AccessEnum.CAN_SHOW_USER_LIST,
        description: null,
      },
      {
        designation: 'Créer un utilisateur',
        value: AccessEnum.CAN_CREATE_USER,
        description: null,
      },
      {
        designation: 'Afficher un utilisateur',
        value: AccessEnum.CAN_SHOW_USER,
        description: null,
      },
      {
        designation: 'Modifier un utilisateur',
        value: AccessEnum.CAN_UPDATE_USER,
        description: null,
      },
      {
        designation: 'Supprimer un utilisateur',
        value: AccessEnum.CAN_DELETE_USER,
        description: null,
      },
      {
        designation: 'Activer ou désactiver un utilisateur',
        value: AccessEnum.CAN_SET_USER_STATE,
        description: null,
      },
    ],
  },
];
