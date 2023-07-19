import { Record } from "immutable";
import { v4 as uuidv4 } from 'uuid';
import { defaultNodeStyle } from "../../Data/Algorithms/graph";

export interface INodeRecordStyle {
    [key : string]: any
}

interface INodeRecordInternal {
    style: INodeRecordStyle,
    value: any,
    id: string,
    label: string
}

export type INodeRecord = Record<INodeRecordInternal>;

const NodeRecordWithoutId = Record<INodeRecordInternal>({
    style: defaultNodeStyle,
    value: undefined,
    id: "",
    label: ""
});

export const getNodeRecord = ({id, ...rest}: {id?: string, value?: any, label?: string, style?: INodeRecordStyle} = {}):
    INodeRecord => NodeRecordWithoutId({id: id === undefined ? uuidv4() : id, ...rest});