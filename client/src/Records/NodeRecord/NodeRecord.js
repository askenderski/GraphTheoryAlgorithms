import { Record } from "immutable";
import { v4 as uuidv4 } from 'uuid';

const NodeRecordWithoutId = Record({
    style: {},
    value: undefined,
    id: undefined
});

export const NodeRecord = ({value, id, style} = {}) =>
    NodeRecordWithoutId({value, id: id === undefined ? uuidv4() : id, style});