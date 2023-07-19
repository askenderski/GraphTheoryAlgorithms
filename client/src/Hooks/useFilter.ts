import {useEffect} from "react";
import useStateWithShallowMerge from "./useStateWithShallowMerge";

export const useFilter = function (
    {defaultFilters, elements, setElements, filterElementsOfType, makeRequest}:
    {
        defaultFilters: {[key:string]:boolean}, elements: any[], setElements: (els: any[])=>void,
        filterElementsOfType: (els: any[], filter: string)=>any[],
        makeRequest: (filters: {[key:string]:boolean})=>Promise<any[]>
    }
) {
    const [filters, setFilters] = useStateWithShallowMerge(defaultFilters);
    useEffect(() => {
        async function fetchAndSetElements() {
            const elements = await makeRequest(defaultFilters);
            setElements(elements);
        }

        fetchAndSetElements();
    }, []);

    async function addFilter(filter: string) {
        setFilters({[filter]: true});

        setElements(await makeRequest({...filters, [filter]: true}));
    }

    function removeFilter(filter: string) {
        setFilters({[filter]: false});
        setElements(filterElementsOfType(elements, filter));
    }

    return {addFilter, removeFilter};
};