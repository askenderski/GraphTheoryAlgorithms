import {render, fireEvent, waitFor, screen, getByText, cleanup} from '@testing-library/react';
import HorizontalList from "../../Components/HorizontalList/HorizontalList";

afterEach(cleanup);

test("All elements appear in horizontal list", () => {
    const listElementsContents = new Array(10).fill().map((_, i)=> {
        return `${i}th element`;
    });
    const listElements = listElementsContents.map((content, i) => <div style={{display: "inline"}} key={i}>{content}</div>);

    const horizontalList = render(
        <HorizontalList>{listElements}</HorizontalList>
    );

    listElementsContents.forEach(content=>{
        expect(horizontalList.getByText(content)).toBeInTheDocument();
    });
});