import { http, HttpResponse, delay } from "msw";
import { BACKEND_URL } from "../../config";

export const handlers = [
  // Handles a GET /projects/:projectId request
  http.get("http://localhost:9000/projects/:projectId", async () => {
    await delay(100);
    return HttpResponse.json({
      id: "1",
      name: "Project 1",
    });
  }),
  // Handles a GET /projects request
  http.get(`${BACKEND_URL}/projects`, async () => {
    await delay(50);
    return HttpResponse.json(
      [
        { id: "1", name: "Project 1" },
        { id: "2", name: "Project 2" },
      ],
      { status: 200 }
    );
  }),

  // Handles a POST /projects/create request
  http.post(`${BACKEND_URL}/projects/create`, async (req) => {
    await delay(250);
    return HttpResponse.json(
      {
        id: "3",
        name: "Project 3",
        description: "New project",
      },
      { status: 200 }
    );
  }),

  // Handles a GET /current/:id request
  http.get(`${BACKEND_URL}/current/:id`, async (req) => {
    const { id } = req.params;
    await delay(250);
    return HttpResponse.json({
      id,
      name: `User ${id}`,
    });
  }),

  // Handles a GET /users request
  http.get(`${BACKEND_URL}/users`, async () => {
    await delay(250);
    return HttpResponse.json(
      [
        { id: "1", name: "User 1" },
        { id: "2", name: "User 2" },
      ],
      { status: 200 }
    );
  }),

  // Handles OPTIONS requests
  http.options(`${BACKEND_URL}/*`, async () => {
    return HttpResponse.text("", { status: 204 });
  }),
];
