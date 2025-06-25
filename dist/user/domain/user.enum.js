"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRole = exports.AccessEnum = exports.SexEnum = void 0;
var SexEnum;
(function (SexEnum) {
    SexEnum["MALE"] = "MALE";
    SexEnum["FEMALE"] = "FEMALE";
    SexEnum["UNKNOW"] = "UNKNOW";
})(SexEnum = exports.SexEnum || (exports.SexEnum = {}));
var AccessEnum;
(function (AccessEnum) {
    AccessEnum["CAN_CREATE_USER"] = "CAN_CREATE_USER";
    AccessEnum["CAN_UPDATE_USER"] = "CAN_UPDATE_USER";
    AccessEnum["CAN_DELETE_USER"] = "CAN_DELETE_USER";
    AccessEnum["CAN_SHOW_USER"] = "CAN_SHOW_USER";
    AccessEnum["CAN_SET_USER_STATE"] = "CAN_SET_USER_STATE";
    AccessEnum["CAN_SHOW_USER_LIST"] = "CAN_SHOW_USER_LIST";
})(AccessEnum = exports.AccessEnum || (exports.AccessEnum = {}));
var AccountRole;
(function (AccountRole) {
    AccountRole["SUPER_ADMIN"] = "SUPER ADMIN";
    AccountRole["ADMIN"] = "ADMIN";
    AccountRole["USER"] = "USER";
    AccountRole["MANAGER"] = "MANAGER";
    AccountRole["EMPLOYEE"] = "EMPLOYEE";
})(AccountRole = exports.AccountRole || (exports.AccountRole = {}));
//# sourceMappingURL=user.enum.js.map