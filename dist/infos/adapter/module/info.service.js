"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const info_factory_1 = require("../info.factory");
let InfoService = class InfoService {
    constructor(infoRepository) {
        this.infoRepository = infoRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.infoRepository.infos.find();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::InfoService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const Info = await this.infoRepository.infos.findOneByID(id);
            if (Info) {
                return Info;
            }
            throw new common_1.NotFoundException('Info not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::InfoService.fetchOne');
            throw error;
        }
    }
    async search(data) {
        return await this.infoRepository.infos.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            const { title } = data;
            const existed = await this.infoRepository.infos.findOneBy({ title });
            if (existed)
                throw new common_1.ConflictException('Info already exist');
            return await this.infoRepository.infos.create(await info_factory_1.InfoFactory.create(data));
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::InfoService.add');
            throw error;
        }
    }
    async edit(data) {
        try {
            const { id } = data;
            const info = id && (await this.infoRepository.infos.findOneByID(id));
            if (info) {
                return await this.infoRepository.infos.update(info_factory_1.InfoFactory.update(info, data));
            }
            throw new common_1.NotFoundException();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::InfoService.editInfo');
            throw error;
        }
    }
    async setState(id) {
        return false;
    }
    async remove(id) {
        try {
            const info = await this.infoRepository.infos.findOneByID(id);
            if (info) {
                return await this.infoRepository.infos.remove(info).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::InfoService.remove');
            return false;
        }
    }
};
InfoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [domain_1.IInfoRepository])
], InfoService);
exports.InfoService = InfoService;
//# sourceMappingURL=info.service.js.map