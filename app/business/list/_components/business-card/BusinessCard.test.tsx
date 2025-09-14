import { render, screen } from "@testing-library/react";
import { BusinessCard } from "./BusinessCard";

describe("BusinessCard", () => {
  const defaultProps = {
    name: "John Doe",
    company: "Acme Corp",
    phone: "07700900123",
    postCode: "SW1A 1AA",
    mail: "john.doe@acme.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all business card details correctly", () => {
    render(<BusinessCard {...defaultProps} />);

    const card = screen.getByTestId("business-card");
    expect(card).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(screen.getByText("07700900123")).toBeInTheDocument();
    expect(screen.getByText("SW1A 1AA")).toBeInTheDocument();
    expect(screen.getByText("john.doe@acme.com")).toBeInTheDocument();
  });

  it("has correct HTML structure with dl, dt, and dd elements", () => {
    render(<BusinessCard {...defaultProps} />);

    const dl = screen.getAllByRole("definition");
    expect(dl).toHaveLength(4);

    expect(screen.getByText("Company").tagName).toBe("DT");
    expect(screen.getByText("Acme Corp").tagName).toBe("DD");
    expect(screen.getByText("Phone").tagName).toBe("DT");
    expect(screen.getByText("07700900123").tagName).toBe("DD");
    expect(screen.getByText("Email").tagName).toBe("DT");
    expect(screen.getByText("john.doe@acme.com").tagName).toBe("DD");
    expect(screen.getByText("Postcode").tagName).toBe("DT");
    expect(screen.getByText("SW1A 1AA").tagName).toBe("DD");
  });

  it("applies correct CSS classes", () => {
    render(<BusinessCard {...defaultProps} />);

    const card = screen.getByTestId("business-card");
    expect(card).toHaveClass("card");

    expect(screen.getByText("John Doe")).toHaveClass("font-md-plus-bold mb-5");
    expect(screen.getByText("Company")).toHaveClass("font-sm-bold");
    expect(screen.getByText("Acme Corp")).toHaveClass("font-sm");
    expect(screen.getByText("Phone").parentElement).toHaveClass(
      "flex justify-between items-center py-4 border-b border-brand-primary-gray"
    );
  });

  it("renders correctly with empty strings", () => {
    const emptyProps = {
      name: "",
      company: "",
      phone: "",
      postCode: "",
      mail: "",
    };

    render(<BusinessCard {...emptyProps} />);

    expect(screen.getByTestId("business-card")).toBeInTheDocument();

    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Postcode")).toBeInTheDocument();

    const companyDt = screen.getByText("Company").closest("dt");
    const companyDd = companyDt?.nextElementSibling;
    expect(companyDd).toBeInTheDocument();
    expect(companyDd?.tagName).toBe("DD");
    expect(companyDd?.textContent).toBe("");

    const phoneDt = screen.getByText("Phone").closest("dt");
    const phoneDd = phoneDt?.nextElementSibling;
    expect(phoneDd).toBeInTheDocument();
    expect(phoneDd?.tagName).toBe("DD");
    expect(phoneDd?.textContent).toBe("");

    const emailDt = screen.getByText("Email").closest("dt");
    const emailDd = emailDt?.nextElementSibling;
    expect(emailDd).toBeInTheDocument();
    expect(emailDd?.tagName).toBe("DD");
    expect(emailDd?.textContent).toBe("");

    const postcodeDt = screen.getByText("Postcode").closest("dt");
    const postcodeDd = postcodeDt?.nextElementSibling;
    expect(postcodeDd).toBeInTheDocument();
    expect(postcodeDd?.tagName).toBe("DD");
    expect(postcodeDd?.textContent).toBe("");
  });

  it("renders name as h2 element", () => {
    render(<BusinessCard {...defaultProps} />);

    const nameElement = screen.getByText("John Doe");
    expect(nameElement.tagName).toBe("H2");
    expect(nameElement).toHaveClass("font-md-plus-bold mb-5");
  });
});
