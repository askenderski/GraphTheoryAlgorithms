import {render, fireEvent, waitFor, screen, getByText, cleanup} from '@testing-library/react';
import Header from "../../../Components/Header/Header";
import navigationBarItems from "../../../Data/NavigationBarItems";
import {MemoryRouter} from "react-router";
import {useLocation} from "react-router";
import {useState} from "react";

jest.mock("react-router", () => {
    const original = jest.requireActual("react-router");

    return {
        ...original,
        useLocation: jest.fn()
    };
});
afterEach(cleanup);

test("Navigation bar appears in Header", () => {
    //NavigationBar uses location and so useLocation needs to be mocked
    useLocation.mockReturnValue({pathname: ""});
    const header = render(<MemoryRouter><Header></Header></MemoryRouter>);

    //If the first item of the navigation bar appears in the header, then the navigation bar as a whole appears in the header
    expect(header.getByText(navigationBarItems[0].text)).toBeInTheDocument();
});