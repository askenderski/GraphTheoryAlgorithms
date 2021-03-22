import {render, fireEvent, waitFor, screen, getByText, cleanup} from '@testing-library/react';
import Header from "../../Components/Header/Header";
import navigationBarItems from "../../Data/navigationBarItems";

afterEach(cleanup);

test("Navigation bar appears in Header", () => {
    const header = render(<Header></Header>);

    //If the first item of the navigation bar appears in the header, then the navigation bar as a whole appears in the header
    expect(header.getByText(navigationBarItems[0].text)).toBeInTheDocument();
});