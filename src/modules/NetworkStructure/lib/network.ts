import {Vertex, Edge_1, Edge_2, Edge_3, Network, NetworkElements} from "../types/index";
import {v1 as uuid} from "uuid";

const MkNetworkElements = (
    e0 : Set<Vertex> = new Set(),
    e1: Set<Edge_1> = new Set(),
    e2: Set<Edge_2> = new Set(),
    e3 : Set<Edge_3> = new Set()  ): NetworkElements => {

        //Copies each set so that input sets will not be mutated.
        return [new Set(e0), new Set(e1), new Set(e2), new Set(e3)];
}

const networkElementClosure = (elements : NetworkElements): NetworkElements => {
    const clonedElements = MkNetworkElements(...elements);
    const [ , es1, es2, es3] = clonedElements;

    function addSourceTarget<T>(eSet: Set<T & {target, source, degree: 1 | 2 | 3}>): void  {
        eSet.forEach( e => {
            const {target, source} = e;

            //Get the element set one degree lower
            const eMinusOneSet = clonedElements[e.degree - 1];

            //Add target and source
            eMinusOneSet.add(target);
            eMinusOneSet.add(source);
        })
    }

    addSourceTarget(es3)
    addSourceTarget(es2)
    addSourceTarget(es1)
    return elements;
}

export const MkNetwork = (label = "", elements : NetworkElements = MkNetworkElements()) : Network => {

    const closedElements = networkElementClosure(elements);

    return {
        id: uuid(),
        label,
        elements: closedElements,
        data: null
    }
}
