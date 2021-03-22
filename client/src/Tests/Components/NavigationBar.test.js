import {render, fireEvent, waitFor, screen, getByText, cleanup} from '@testing-library/react';
import NavigationBar from "../../Components/NavigationBar/NavigationBar";
import navigationBarItems from "../../Data/navigationBarItems";

afterEach(cleanup);

test("All elements appear in navigation bar", () => {
    const navigationBar = render(<NavigationBar></NavigationBar>);

    navigationBarItems.forEach(({text})=>{
        expect(navigationBar.getByText(text)).toBeInTheDocument();
    });
});