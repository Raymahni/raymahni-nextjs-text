import { render } from "@testing-library/react";
import ExchangeInput from "@/app/ExchangeInput";

describe("ExchangeInput", () => {
  it("renders the exchange input component", () => {
    render(<ExchangeInput />);
    const element = screen.getByText("Balance");
    expect(element).toBeInDocument();
  });
});
