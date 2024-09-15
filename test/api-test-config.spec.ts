/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { faker } from '@faker-js/faker';

export abstract class TestMockAPI {
  static mockAPIResponse = async (x: any): Promise<any> => {
    return Promise.resolve({
      ...x,
      isActivated: x.isActivated ?? true,
      id: x.id ?? faker.string.uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  static mockRestAPI = () => ({
    create: jest.fn().mockImplementation(this.mockAPIResponse),
    update: jest.fn().mockImplementation(this.mockAPIResponse),
    remove: jest.fn().mockResolvedValue(true),
    getOne: jest.fn((x) => Promise.resolve(x)),
    getMany: jest.fn((x) => Promise.resolve([x])),
    setState: jest.fn(() => Promise.resolve(true)),
    filter: jest.fn((x) => Promise.resolve(x)),
    tokenLogin: jest.fn((x) => Promise.resolve(x)),
    signin: jest.fn((x) => Promise.resolve(x)),
  });

  static mockService = () => ({
    add: jest.fn().mockImplementation(this.mockAPIResponse),
    edit: jest.fn().mockImplementation(this.mockAPIResponse),
    fetchOne: jest.fn((x) => Promise.resolve(x)),
    fetchAll: jest.fn((x) => Promise.resolve([x])),
    setState: jest.fn(() => Promise.resolve(true)),
    fetchBy: jest.fn((x) => Promise.resolve(x)),
    remove: jest.fn().mockResolvedValue(true),
  });

  static mockEventAPI = () => ({
    connect: jest.fn(),
    publish: jest.fn(),
    subscribe: jest.fn(),
    disconnect: jest.fn(),
  });

  static mockAPIconfig = () => ({
    rest: this.mockRestAPI(),
    event: this.mockEventAPI(),
  });
}
