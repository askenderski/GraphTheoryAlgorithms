import { Record } from "immutable";
import { v4 as uuidv4 } from 'uuid';

const defaultWeighted = true;
const getDefaultValueForWeighted = (weighted: boolean) => weighted ? 0 : false;

export interface IEdgeStyle {
    [key: string]: any
}

interface IEdgeRecordInternal {
    style: IEdgeStyle;
    value: number | boolean;
    id: string;
    weighted: boolean;
    from: string;
    to: string;
}

export type IEdgeRecord = Record<IEdgeRecordInternal>;

const EdgeRecordWithoutWeightednessAndId = Record<IEdgeRecordInternal>({
    style: {},
    value: 0,
    id: "",
    weighted: true,
    from: "",
    to: ""
});

export const getEdgeRecord = 
    (
        {value, style, id, weighted = defaultWeighted, from, to}:
        {
            value?: number | boolean, style?: IEdgeStyle,
            id?: string, weighted: boolean, from: string, to: string
        }
    ) => {
        return EdgeRecordWithoutWeightednessAndId({
            value: value === undefined ? getDefaultValueForWeighted(weighted) : value,
            id: id === undefined ? uuidv4() : id,
            style: style || {},
            weighted,
            from,
            to
        });
    };

export const EdgeRecord = EdgeRecordWithoutWeightednessAndId;