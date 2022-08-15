import { Record } from "immutable";
import { v4 as uuidv4 } from 'uuid';

const defaultWeighted = true;
const getDefaultValue = weighted => weighted ? 1 : true;

const NodeRecordWithoutId = Record({
    style: {},
    value: "Node",
    id: 0
});

export const NodeRecord = ({value, id, style} = {}) =>
    NodeRecordWithoutId({value, id: id === undefined ? uuidv4() : id, style});