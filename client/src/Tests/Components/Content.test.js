import {render, fireEvent, waitFor, screen, getByText, cleanup} from '@testing-library/react';
import Content from "../../Components/Content/Content";

afterEach(cleanup);

test("Content does not throw", () => {
    expect(() => render(<Content></Content>)).not.toThrow();
});