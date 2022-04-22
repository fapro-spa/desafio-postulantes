import requestSupertest from "supertest";
import app from "../app";

const request = requestSupertest(app);

describe("Test endpoint", () => {
    test("GET / should return an object with header and data", async () => {
        const response = await request.get("/");
        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveProperty("header");
        const header = response.body.header;
        expect(header.businessName).toContain('RAZÓN SOCIAL');

        expect(response.body).toHaveProperty("data");
        const firstRecord = response.body.data[0];
        expect(firstRecord.businessName).toContain('BIRCHMOUNT INVESTMENTS LIMITED');
    });
});