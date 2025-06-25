"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosRest = void 0;
const common_1 = require("@nestjs/common");
class AxiosRest {
    constructor(axios) {
        this.axios = axios;
    }
    async getResponse(rep) {
        return rep
            .then((res) => res.data)
            .catch((error) => {
            var _a, _b;
            if (error.response)
                throw new common_1.HttpException((_a = error.response) === null || _a === void 0 ? void 0 : _a.data, (_b = error.response) === null || _b === void 0 ? void 0 : _b.status);
            throw error;
        });
    }
    async get(url, config) {
        return await this.getResponse(this.axios.get(url, config));
    }
    async post(url, data, config) {
        return await this.getResponse(this.axios.post(url, data, config));
    }
    async login(url, data, config) {
        return await this.getResponse(this.axios.post(url, data, config));
    }
    async put(url, data, config) {
        return await this.getResponse(this.axios.put(url, data, config));
    }
    async delete(url, config) {
        return await this.getResponse(this.axios.delete(url, config));
    }
    async patch(url, data, config) {
        return await this.getResponse(this.axios.patch(url, data, config));
    }
}
exports.AxiosRest = AxiosRest;
//# sourceMappingURL=rest.adapter.js.map