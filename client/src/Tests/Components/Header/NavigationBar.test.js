import {render, fireEvent, waitFor, screen, getByText, cleanup} from '@testing-library/react';
import NavigationBar from "../../../Components/Header/NavigationBar/NavigationBar";
import navigationBarItems from "../../../Data/NavigationBarItems";

afterEach(cleanup);

test("All elements appear in navigation bar", () => {
    const navigationBar = render(<NavigationBar></NavigationBar>);

    navigationBarItems.forEach(({text})=>{
        expect(navigationBar.getByText(text)).toBeInTheDocument();
    });
});