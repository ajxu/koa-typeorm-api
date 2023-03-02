import * as typeorm from "typeorm";
import CompanyUserController from "./company-user-controller";

describe("CompanyUserController", () => {
  const companyUserController = new CompanyUserController();
  const mockCtx: any = {
    request: {
      get: jest.fn(),
      header: {},
      body: {}
    },
    state: {}
  };
  const mockData = [
    {
      guid: "test",
      company: { name: "company-name" },
      first_name: "test",
      last_name: "test"
    }
  ];

  const mockResponse = [
    {
      company_name: mockData[0].company.name,
      user_guid: mockData[0].guid,
      user_name: `${mockData[0].first_name} ${mockData[0].guid}`
    },
    { company_name: "MOM-Officer1", user_guid: "MOM-Officer1", user_name: "" }
  ];
  beforeEach(() => {
    // @ts-ignore
    typeorm.getRepository = jest.fn().mockImplementation(() => {
      return {
        find: () => mockData,
        findOne: () => mockData
      };
    });
  });

  describe("findAll()", () => {
    it("should return company user data", async () => {
      const data = await companyUserController.findAll(mockCtx);

      expect(data).toMatchObject(mockResponse);
    });

    it("should throw error", async () => {
      //@ts-ignore
      typeorm.getRepository = jest.fn().mockImplementationOnce(() => {
        throw "error";
      });

      expect.assertions(1);
      try {
        await companyUserController.findAll(mockCtx);
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });

  describe("getUserDetailsByGUID()", () => {
    it("should return user details", async () => {
      const data = await CompanyUserController.getUserDetailsByGUID(mockCtx);

      expect(data).toMatchObject(mockData);
    });

    it("should throw error", async () => {
      //@ts-ignore
      typeorm.getRepository = jest.fn().mockImplementationOnce(() => {
        throw "error";
      });

      expect.assertions(1);
      try {
        await CompanyUserController.getUserDetailsByGUID(mockCtx);
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });
});
