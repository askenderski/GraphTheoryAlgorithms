import {render} from "@testing-library/react";
import Loading from "../../Components/Loading/Loading";

test("Loading has correct text", () => {
    const loading = render(<Loading/>);

    expect(loading.getByText("Loading...")).toBeInTheDocument();
});