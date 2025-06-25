import { AccessEnum } from 'user/domain';
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const HasPermission: (p: AccessEnum) => import("@nestjs/common").CustomDecorator<string>;
