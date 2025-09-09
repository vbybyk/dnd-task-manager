import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, render, waitFor, within } from "../../../../TestUtils/testing-library";
import { AssigneesDropdown } from "../AssigneesDropdown";
import { generateColor } from "../../../../Utils/color-generator";
import { hslToRgb, parseHsl } from "./helper";

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
  users: {
    users: [
      {
        id: 1,
        name: "User 1",
        profileImage: "",
      },
      {
        id: 2,
        name: "User 2",
        profileImage: "https://example.com/user_2.jpg",
      },
    ],
  },
};

describe("AssigneesDropdown", () => {
  const user = userEvent.setup();

  test("renders AssigneesDropdown component", async () => {
    render(<AssigneesDropdown value={1} onChange={vi.fn()} />, { initialState });
    const assigneesDropdown = screen.getByText(/user 1/i).closest(".ant-dropdown-trigger");
    expect(assigneesDropdown).toBeInTheDocument();
  });

  test("generates userMenu correctly", async () => {
    render(<AssigneesDropdown value={1} onChange={vi.fn()} />, { initialState });
    const dropdown = screen.getByText(/user 1/i).closest(".ant-dropdown-trigger");
    expect(dropdown).toBeInTheDocument();

    if (dropdown) {
      await user.click(dropdown);

      const userMenuItems = await screen.findAllByRole("menuitem", { name: /user/i });
      expect(userMenuItems).toHaveLength(2);

      const firstItem = userMenuItems[0];
      expect(firstItem).toHaveTextContent("User 1");

      const hslColor = generateColor("User 1");
      const [h, s, l] = parseHsl(hslColor);
      const rgbColor = hslToRgb(h, s, l);

      const avatarElement = firstItem.querySelector(".ant-avatar");

      expect(avatarElement).toHaveAttribute("style", expect.stringContaining(`background-color: ${rgbColor}`));

      const secondItem = userMenuItems[1];
      expect(secondItem).toHaveTextContent("User 2");
      expect(secondItem.querySelector(".ant-avatar img")).toHaveAttribute("src", "https://example.com/user_2.jpg");
    }
  });

  test("click on user menu item selects user", async () => {
    const onChange = vi.fn();
    render(<AssigneesDropdown value={1} onChange={onChange} />, { initialState });
    const dropdown = screen.getByText(/user 1/i).closest(".ant-dropdown-trigger");
    expect(dropdown).toBeInTheDocument();

    if (dropdown) {
      await user.click(dropdown);

      const userMenuItems = await screen.findAllByRole("menuitem", { name: /user/i });
      expect(userMenuItems).toHaveLength(2);

      const userMenuItem = userMenuItems[0];
      userEvent.click(userMenuItem);
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(1);
      });
    }
  });
});
