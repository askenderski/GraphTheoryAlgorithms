import { Record } from "immutable";
import { v4 as uuidv4 } from 'uuid';

const defaultWeighted = true;
const getDefaultValueForWeighted = weighted => weighted ? 0 : false;

const EdgeRecordWithoutWeightednessAndId = Record({
    style: {},
    value: 0,
    id: undefined,
    weighted: true,
    from: undefined,
    to: undefined
});

export const getEdgeRecord = ({value, style, id, weighted = defaultWeighted, from, to} = {}) => {
    return EdgeRecordWithoutWeightednessAndId({
        value: value === undefined ? getDefaultValueForWeighted(weighted) : value,
        id: id === undefined ? uuidv4() : id,
        style,
        weighted,
        from,
        to
    });
};

export const EdgeRecord = EdgeRecordWithoutWeightednessAndId;