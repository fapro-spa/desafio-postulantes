import requestSupertest from "supertest";
import app from "../app.js";


const request = requestSupertest(app);

describe("Endpoint test", () => {
    test("GET / should return an array with json objects", async () => {
        const response = await request.get("/");
        expect(response.statusCode).toBe(200);
        const first = response.body[1];
        expect(first["RAZÓN SOCIAL"]).toContain('AB SVENSK EXPORTKREDIT');
    });
}); 