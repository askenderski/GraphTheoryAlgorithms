import {useEffect, useState} from "react";

const useStateWithShallowMerge = defaultValue => {
    const [state, setState] = useState(defaultValue);

    return [state, val => setState(prevState => ({...prevState, ...val}))];
}

export const useFilter = function ({defaultFilters, elements, setElements, filterElementsOfType, makeRequest}) {
    const [filters, setFilters] = useStateWithShallowMerge(defaultFilters);
    useEffect(() => {
        async function fetchAndSetElements() {
            const elements = await makeRequest(defaultFilters);
            setElements(elements);
        }

        fetchAndSetElements();
    }, []);

    async function addFilter(filter) {
        setFilters({[filter]: true});

        setElements(await makeRequest({...filters, [filter]: true}));
    }

    function removeFilter(filter) {
        setFilters({[filter]: false});
        setElements(elements => filterElementsOfType(elements, filter));
    }

    return {addFilter, removeFilter};
};