import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { User } from 'user/domain';

export const GetAccount = createParamDecorator((data, context): User => {
    const req = context.switchToHttp().getRequest();
    console.log('Request in GetAccount:', req); // Log pour vérifier la requête

    if (req?.user) {
        console.log('User found in request:', req.user); // Log pour l'utilisateur trouvé
        return req.user;
    }
    throw new UnauthorizedException('User not found in request');
});
