import CompanyController from "./company-controller";
import * as typeorm from "typeorm";

describe("CompanyController", () => {
  const companyController = new CompanyController();
  const mockCtx: any = {
    request: {
      get: jest.fn(),
      header: {},
      body: {}
    },
    state: {}
  };
  const mockData = {
    guid: "testID"
  };
  
  beforeEach(() => {
    // @ts-ignore
    typeorm.getRepository = jest.fn().mockImplementation(() => {
      return {
        find: () => mockData,
        create: () => true,
        save: () => mockData,
        findOne: () => mockData,
        softDelete: () => true,
        update: () => mockData
      };
    });
  });

  describe("create()", () => {
    it("should save data", async () => {
      const data = await companyController.create(mockCtx);

      expect(data).toBe(true);
    });

    it("should throw error", async () => {
      //@ts-ignore
      typeorm.getRepository = jest.fn().mockImplementationOnce(() => {
        throw "error";
      });

      expect.assertions(1);
      try {
        await companyController.create(mockCtx);
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });

  describe("findAll()", () => {
    it("should return data", async () => {
      const data = await companyController.findAll(mockCtx);

      expect(data).toBe(mockData);
    });

    it("should throw error", async () => {
      //@ts-ignore
      typeorm.getRepository = jest.fn().mockImplementationOnce(() => {
        throw "error";
      });

      expect.assertions(1);
      try {
        await companyController.findAll(mockCtx);
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });

  describe("findOne()", () => {
    it("should return data ", async () => {
      mockCtx.request.body= {};

      mockCtx.params = {
        company_uen: "test_uen"
      };
      const data = await companyController.findOne(mockCtx);

      expect(data).toBe(mockData);
    });

    it("should return undefined", async () => {
      mockCtx.params = {
        company_uen: undefined
      };

      const data = await companyController.findOne(mockCtx);

      expect(data).toBe(undefined);
    });

    it("should throw error", async () => {
      //@ts-ignore
      typeorm.getRepository = jest.fn().mockImplementationOnce(() => {
        throw "error";
      });

      expect.assertions(1);
      try {
        await companyController.findOne(mockCtx);
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });

  describe("update()", () => {
    it("should return data ", async () => {
      mockCtx.params = {
        company_uen: "test_uen"
      };
      const data = await companyController.update(mockCtx);

      expect(data).toBe(mockData);
    });

    it("should return undefined", async () => {
      mockCtx.params = {
        company_uen: undefined
      };

      const data = await companyController.update(mockCtx);

      expect(data).toBe(undefined);
    });

    it("should throw error", async () => {
      mockCtx.params = {
        company_uen: "test_uen"
      };

      //@ts-ignore
      typeorm.getRepository = jest.fn().mockImplementationOnce(() => {
        throw "error";
      });

      expect.assertions(1);
      try {
        await companyController.update(mockCtx);
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });

  describe("delete()", () => {
    it("should delete data ", async () => {
      mockCtx.params = {
        company_uen: "test_uen"
      };
      const result = await companyController.delete(mockCtx);

      expect(result).toBe(true);
    });

    it("should return undefined", async () => {
      mockCtx.params = {
        company_uen: undefined
      };

      const result = await companyController.delete(mockCtx);

      expect(result).toBe(undefined);
    });

    it("should throw error", async () => {
      mockCtx.params = {
        company_uen: "test_uen"
      };
      //@ts-ignore
      typeorm.getRepository = jest.fn().mockImplementationOnce(() => {
        throw "error";
      });

      expect.assertions(1);
      try {
        await companyController.delete(mockCtx);
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });

  describe("getCompanyByUEN()", () => {
    it("should return user details", async () => {
      const data = await CompanyController.getCompanyByUEN(mockCtx);

      expect(data).toMatchObject(mockData);
    });

    it("should throw error", async () => {
      //@ts-ignore
      typeorm.getRepository = jest.fn().mockImplementationOnce(() => {
        throw "error";
      });

      expect.assertions(1);
      try {
        await CompanyController.getCompanyByUEN(mockCtx);
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });
});
