import {render, fireEvent, waitFor, screen, getByText, cleanup} from '@testing-library/react';
import About from "../../Components/About/About";

afterEach(cleanup);

test("About contains correct content", () => {
    const beginningText = "Temporary About";

    const about = render(<About></About>);

    expect(about.getByTestId("about-content").textContent.startsWith(beginningText)).toBe(true);
});