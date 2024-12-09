import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, render, act, within, waitFor, cleanup } from "../../../TestUtils/testing-library";
import { Dashboard } from "../Dashboard";

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

describe("Dashboard", () => {
  afterEach(() => {
    cleanup();
  });

  const user = userEvent.setup();

  test("renders Dashboard component", async () => {
    await act(async () => {
      render(<Dashboard />);
    });

    expect(screen.getByText("My Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Open Projects")).toBeInTheDocument();
  });

  test("opens create project modal on button click", async () => {
    await act(async () => {
      render(<Dashboard />);
    });

    const createProjectButton = screen.getByText("Create project");

    await act(async () => {
      user.click(createProjectButton);
    });

    const createProjectModal = await screen.findByRole("dialog");
    expect(createProjectModal).toHaveTextContent("Create new project");
  });

  test("displays skeleton loader when projects are being fetched", async () => {
    const fetchingState = {
      project: {
        projects: [],
        isFetching: true,
      },
    };

    await act(async () => {
      render(<Dashboard />, { initialState: fetchingState });
    });

    expect(screen.getAllByTestId("skeleton-card")).toHaveLength(3);
  });

  test("opens edit modal on project card edit button click", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    const projectCardHeading = await screen.findByRole("heading", { name: /project 1/i, level: 3 });
    const projectCardContainer = projectCardHeading.closest(".ant-list-item");

    expect(projectCardHeading).toBeInTheDocument();
    expect(projectCardContainer).not.toBeNull();

    const editButton = within(projectCardContainer as HTMLElement).getByRole("button", { name: /edit/i });
    expect(editButton).toBeInTheDocument();

    user.click(editButton);

    const editProjectModal = await screen.findByRole("dialog");
    expect(editProjectModal).toHaveTextContent("Edit project");

    const projectNameInput = (await screen.findByDisplayValue("Project 1")) as HTMLInputElement;
    expect(projectNameInput).toBeInTheDocument();
  });

  test("opens and closes the modal correctly", async () => {
    render(<Dashboard />);

    const createProjectButton = screen.getByText("Create project");
    user.click(createProjectButton);

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeVisible();
    });

    const closeButton = screen.getByText(/cancel/i);
    await act(async () => {
      user.click(closeButton);
    });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  test("creates a new project when 'Create' button is clicked", async () => {
    const { store } = render(<Dashboard />);

    await waitFor(() => {
      const state = store.getState();
      expect(state.project.projects).toHaveLength(2);
    });

    const projectCards = await screen.findAllByRole("heading", { level: 3, name: /^Project \d+$/i });
    expect(projectCards).toHaveLength(2);

    const createProjectButton = screen.getByText("Create project");
    await act(async () => {
      user.click(createProjectButton);
    });

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeVisible();
    });

    const projectNameInput = screen.getByLabelText("Project name");
    await user.clear(projectNameInput);
    await user.type(projectNameInput, "Project 3");

    const projectDescriptionInput = screen.getByLabelText("Description");
    await user.clear(projectDescriptionInput);
    await user.type(projectDescriptionInput, "New project");

    const createButton = screen.getByText("Create");
    expect(createButton).not.toBeDisabled();
    await act(async () => {
      user.click(createButton);
    });

    await waitFor(() => {
      const state = store.getState();
      expect(state.project.projects).toHaveLength(3);
    });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    const newProjectCard = screen.getByRole("heading", { name: /project 3/i, level: 3 });
    expect(newProjectCard).toBeInTheDocument();
  });
});
