import {render, fireEvent, waitFor, screen, getByText, cleanup} from '@testing-library/react';
import NavigationBar from "../../../Components/Header/NavigationBar/NavigationBar";
import navigationBarItems from "../../../Data/NavigationBarItems";
import {MemoryRouter} from "react-router";

afterEach(cleanup);

test("All elements appear in navigation bar", () => {
    const navigationBar = render(<MemoryRouter><NavigationBar></NavigationBar></MemoryRouter>);

    navigationBarItems.forEach(({text})=>{
        expect(navigationBar.getByText(text)).toBeInTheDocument();
    });
});