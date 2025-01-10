import "@testing-library/jest-dom";
import { render, fireEvent, screen, act } from "@testing-library/react";
import DraggableRange, { RangeData } from "../DraggableRange";
import { getNearestIndex } from "../utils";

// Mocking the utility function
jest.mock("./utils", () => ({
    getNearestIndex: jest.fn(),
}));

describe("DraggableRange Component", () => {
    const mockRangeData: RangeData = { minLimit: 0, maxLimit: 100 };
    const mockRangeValues = [10, 20, 30, 40, 50, 60, 70, 80, 90];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders with min and max limits", () => {
        render(<DraggableRange data={mockRangeData} valueLabel="€" />);

        // Check if the min and max values are rendered
        expect(screen.getByText("0")).toBeInTheDocument();
        expect(screen.getByText("100")).toBeInTheDocument();
    });

    test("updates minValueDisplay when the input value is changed", async () => {
        render(<DraggableRange data={mockRangeData} valueLabel="€" />);

        // Simulate typing a value into the minValue input
        const minInput = screen.getAllByRole("textbox")[0];
        await act(async () => {
            fireEvent.change(minInput, { target: { value: "50" } });
        });

        // Verify that the value was updated
        expect(screen.getByText("50")).toBeInTheDocument();
    });

    test("updates maxValueDisplay when the input value is changed", async () => {
        render(<DraggableRange data={mockRangeData} valueLabel="€" />);

        // Simulate typing a value into the maxValue input
        const maxInput = screen.getAllByRole("textbox")[1];
        await act(async () => {
            fireEvent.change(maxInput, { target: { value: "80" } });
        });

        // Verify that the value was updated
        expect(screen.getByText("80")).toBeInTheDocument();
    });

    test("minValue should not exceed maxValue", async () => {
        render(
            <DraggableRange
                data={mockRangeData}
                valueLabel="€"
                rangeValues={mockRangeValues}
            />
        );

        // Simulate changing minValue to be higher than maxValue
        const minInput = screen.getAllByRole("textbox")[0];
        await act(async () => {
            fireEvent.change(minInput, { target: { value: "90" } });
        });

        // Ensure that the minValue is adjusted to be less than maxValue
        expect(screen.getByText("80")).toBeInTheDocument(); // Assuming 80 is the nearest value
    });

    test("minValue should adjust to nearest range value when exceeding maxValue", async () => {
        (getNearestIndex as jest.Mock).mockReturnValue(3); // Mocking getNearestIndex to return index 3

        render(
            <DraggableRange
                data={mockRangeData}
                valueLabel="€"
                rangeValues={mockRangeValues}
            />
        );

        // Simulate changing minValue to be higher than maxValue
        const minInput = screen.getAllByRole("textbox")[0];
        await act(async () => {
            fireEvent.change(minInput, { target: { value: "85" } });
        });

        // Ensure that the minValue is adjusted based on nearest value
        expect(screen.getByText("80")).toBeInTheDocument(); // The nearest value to 85 should be 80
    });

    test("minLimit and maxLimit are respected", async () => {
        render(<DraggableRange data={mockRangeData} valueLabel="€" />);

        // Simulate typing values that go beyond the minLimit or maxLimit
        const minInput = screen.getAllByRole("textbox")[0];
        const maxInput = screen.getAllByRole("textbox")[1];

        await act(async () => {
            fireEvent.change(minInput, { target: { value: "-10" } });
            fireEvent.change(maxInput, { target: { value: "110" } });
        });

        // Ensure the minLimit and maxLimit are respected
        expect(screen.getByText("0")).toBeInTheDocument();
        expect(screen.getByText("100")).toBeInTheDocument();
    });
});
