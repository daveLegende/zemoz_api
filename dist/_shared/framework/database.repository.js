"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBGenericRepository = void 0;
const typeorm_1 = require("typeorm");
class DBGenericRepository {
    constructor(repository) {
        this._repository = repository;
    }
    find(options) {
        return this._repository.find(options);
    }
    findBy(options) {
        return this._repository.find(Object.assign({}, options));
    }
    async findOneByID(id, options) {
        options = Object.assign(Object.assign({}, options), { id });
        return await this._repository.findOne({ where: Object.assign({}, options) });
    }
    async findByIds(ids, options) {
        const customQuery = Object.assign({ id: (0, typeorm_1.In)(ids) }, options);
        if ((ids === null || ids === void 0 ? void 0 : ids.length) > 0) {
            return await this._repository.findBy(Object.assign({}, customQuery));
        }
        return [];
    }
    findOne(options) {
        return this._repository.findOne(Object.assign({}, options));
    }
    findForLogin(options) {
        return this._repository.findOne(Object.assign(Object.assign({}, options), { select: Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.select), { password: true }) }));
    }
    findOneBy(options) {
        return this._repository.findOneBy(options);
    }
    create(item) {
        return this._repository.save(item);
    }
    createMany(items) {
        return this._repository.save(items);
    }
    updateMany(items) {
        return this._repository.save(items);
    }
    update(item) {
        return this._repository.save(item);
    }
    clean(items) {
        return this._repository.remove(items);
    }
    removeMany(items) {
        return this._repository.softRemove(items);
    }
    remove(item) {
        return this._repository.softRemove(item);
    }
}
exports.DBGenericRepository = DBGenericRepository;
//# sourceMappingURL=database.repository.js.map