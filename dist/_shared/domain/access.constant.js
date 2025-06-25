"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULES = void 0;
const domain_1 = require("../../user/domain");
exports.RULES = [
    {
        designation: 'Gestion des utilisateurs',
        description: 'Gérer tout ce qui concerne les utilisateurs',
        tag: null,
        permissions: [
            {
                designation: 'Afficher les utilisateurs',
                value: domain_1.AccessEnum.CAN_SHOW_USER_LIST,
                description: null,
            },
            {
                designation: 'Créer un utilisateur',
                value: domain_1.AccessEnum.CAN_CREATE_USER,
                description: null,
            },
            {
                designation: 'Afficher un utilisateur',
                value: domain_1.AccessEnum.CAN_SHOW_USER,
                description: null,
            },
            {
                designation: 'Modifier un utilisateur',
                value: domain_1.AccessEnum.CAN_UPDATE_USER,
                description: null,
            },
            {
                designation: 'Supprimer un utilisateur',
                value: domain_1.AccessEnum.CAN_DELETE_USER,
                description: null,
            },
            {
                designation: 'Activer ou désactiver un utilisateur',
                value: domain_1.AccessEnum.CAN_SET_USER_STATE,
                description: null,
            },
        ],
    },
];
//# sourceMappingURL=access.constant.js.map