import { Record } from "immutable";
import { v4 as uuidv4 } from 'uuid';
import { defaultNodeStyle } from "../../Data/Algorithms/graph";

const NodeRecordWithoutId = Record({
    style: defaultNodeStyle,
    value: undefined,
    id: undefined,
    label: undefined
});

export const NodeRecord = ({id, ...rest} = {}) =>
    NodeRecordWithoutId({id: id === undefined ? uuidv4() : id, ...rest});