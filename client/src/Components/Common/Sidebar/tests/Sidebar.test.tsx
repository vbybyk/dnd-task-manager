import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, render, waitFor, within } from "../../../../TestUtils/testing-library";
import { Sidebar } from "../Sidebar";
import { AppLayout } from "../../../../App/AppLayout/AppLayout";
import { Dashboard } from "../../../../Pages/Dashboard/Dashboard";
import { Project } from "../../../../Pages/Project/Project";
import { RouterProvider, createMemoryRouter, NavLink } from "react-router-dom";

// Mock window.matchMedia
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

const initialState = {
  project: {
    projects: [
      {
        id: 1,
        name: "Project 1",
        description: "Project 1 description",
      },
      {
        id: 2,
        name: "Project 2",
        description: "Project 2 description",
      },
    ],
    isFetching: false,
  },
};

describe("Sidebar", () => {
  test("renders Sidebar component", async () => {
    render(<Sidebar />);
    const dashboardMenuItem = await screen.findByRole("menuitem", { name: /dashboard/i });
    expect(dashboardMenuItem).toBeInTheDocument();
  });

  test("renders available projects as menu items", async () => {
    render(<Sidebar />, { initialState });
    const projectMenuItems = await screen.findAllByRole("menuitem", { name: /project/i });
    expect(projectMenuItems).toHaveLength(2);
  });

  test("click on project menu item navigates to project page and back to dashboard", async () => {
    const routes = [
      {
        path: "/dashboard",
        element: (
          <AppLayout>
            <Dashboard />
          </AppLayout>
        ),
      },
      {
        path: "/projects/1",
        element: (
          <AppLayout>
            <Project />
          </AppLayout>
        ),
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/projects/1", "/dashboard"],
    });

    render(<RouterProvider router={router} />, { initialState, withRouter: false });

    const projectMenuItem = await screen.findByRole("menuitem", { name: /project 1/i });
    const linkWithinMenuItem = within(projectMenuItem).getByRole("link", { name: /project 1/i });
    expect(linkWithinMenuItem).toBeInTheDocument();

    await userEvent.click(linkWithinMenuItem);

    const heading = await screen.findByRole("heading", { level: 2, name: "Project 1" });
    expect(heading).toBeInTheDocument();

    const dashboardMenuItem = await screen.findByRole("menuitem", { name: /dashboard/i });
    const linkWithinDashboardMenuItem = within(dashboardMenuItem).getByRole("link", { name: /dashboard/i });
    expect(linkWithinDashboardMenuItem).toBeInTheDocument();

    await userEvent.click(linkWithinDashboardMenuItem);

    await waitFor(() => {
      const heading = screen.getByRole("heading", { level: 2, name: "My Dashboard" });
      expect(heading).toBeInTheDocument();
    });
  });
});
