import {Vertex, Edge_1, Edge_2, Edge_3} from "../types/index";
import {v1 as uuid} from "uuid";



export const MkVertex = (label: string = ""): Vertex => {
   return {
       id: uuid(),
       type: "Vertex",
       label,
       data: null,
       degree: 0
   }
}

export const MkEdge_1 = (label: string = "", source: Vertex = MkVertex(), target: Vertex = MkVertex()): Edge_1 => {
    return {
        id: uuid(),
        type: "Edge_1",
        label,
        data: null,
        degree: 1,
        source,
        target
    }
}

export const MkEdge_2 = (label: string = "", source: Edge_1 = MkEdge_1(), target: Edge_1 = MkEdge_1()): Edge_2 => {
    return {
        id: uuid(),
        type: "Edge_2",
        label,
        data: null,
        degree: 2,
        source,
        target
    }
}

export const MkEdge_3 = (label: string = "", source: Edge_2 = MkEdge_2(), target: Edge_2 = MkEdge_2()): Edge_3 => {
    return {
        id: uuid(),
        type: "Edge_3",
        label,
        data: null,
        degree: 3,
        source,
        target
    }
}


//Just for runtime testing
export const v = MkEdge_3();

