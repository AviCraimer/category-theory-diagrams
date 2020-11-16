import {Vertex, Edge_1, Edge_2, Edge_3, NetworkElement, NetworkElements} from "../types/index";
import {MkVertex,
    MkEdge_1,
    MkEdge_2,
    MkEdge_3} from "./networkElements";
import {v1 as uuid} from "uuid";

const emptyNetworkElements = () : NetworkElements => [new Set(),new Set(),new Set(),new Set(),]

class Network {
    readonly id: string  = uuid();
    protected label : string;
    protected elements: NetworkElements;
    data: unknown;


    constructor (
        elements: NetworkElements = emptyNetworkElements(), label = "", data = null ) {

        this.label = label;
        this.data = data;
        this.elements = elements;
        this.add(elements);
    }

    /* Shallow copy of network elements */
    static copyNetworkElements = (els :  NetworkElements ): NetworkElements => {
        const [e0, e1, e2, e3] = els;
        return [new Set(e0), new Set(e1), new Set(e2), new Set(e3)];
    }


    /* Ensures that any new elements added to the network also have their sources and targets added to the network */

    add(newElements : NetworkElements): Network {
        const elements = Network.copyNetworkElements(this.elements);
        const [es0, es1, es2, es3] = newElements;

        es0.forEach(e => elements[0].add(e));

        function addSourceTarget(eSet: Set<Edge_1> | Set<Edge_2> | Set<Edge_3> ) : void  {
            eSet.forEach( e => {
                const { dimension} = e;
                elements[dimension].add(e);

                const {target, source} = e;

                //Get the element set one dimension lower
                const eMinusOneSet = newElements[e.dimension - 1];

                //Add target and source
                eMinusOneSet.add(target);
                eMinusOneSet.add(source);
                //Note, these lower order edges will get added to aNetwork.elements on the next pass through since we start with 3-edges.
            });
        }

        addSourceTarget(es3);
        addSourceTarget(es2);
        addSourceTarget(es1);

        //replace elements with new
        this.elements = elements;
        return this;
    }

    //Returns a shallow copy of network elements so that elements cannot be added or removed outside of the class
    get() : NetworkElements {
        return Network.copyNetworkElements(this.elements);
    }

    //removes elements passed in as well as any higher-order elements that depend on these.
    //remove(elsToRemove : NetworkElements) : Network {

    //}

    map ( f:(e:NetworkElement)=>NetworkElement ): Network {
        const mappedElements = [new Set(),new Set(),new Set(),new Set()];
        const oldToNew :  Map<NetworkElement,NetworkElement> = new Map();
        this.elements.forEach(elementSet => {
            elementSet.forEach( (e:NetworkElement) => {
                const mappedElement = f(e);
                oldToNew.set(e, mappedElement);
                const {dimension} = mappedElement;

                 //Note that f might change the dimension of the mapped element. If dimension is moved outside bounds 0-3 it will be left out of the new network.
                if (dimension >=0 && dimension < 4) {
                    mappedElements[mappedElement.dimension].add(mappedElement)
                    if (mappedElement.dimension !== 0) {
                        const edge  = e as Edge_1 | Edge_2 | Edge_3;


                //f should change dimensions of all elements of all dimensions consistently, i.e., reducing them all by 1. I won't check for this however. As a result we must disable type checking for the mapped edge.
                        const mappedEdge:any  = mappedElement;


                        //it also needs to respect the arrow structure of the original network like a functor (subject to the caveat about reducing dimension).

                        const mappedSource = oldToNew.get(edge.source)
                        mappedEdge.source = mappedSource;
                        const mappedTarget = oldToNew.get(edge.target)
                        mappedEdge.target = mappedTarget;
                    }
                }
            })

        });
        const [e0, e1, e2, e3] =  mappedElements as NetworkElements;
        return new Network([e0, e1, e2, e3])
    }

    newV (label : string = ""): Network {
        const vertex = MkVertex(label);
        const els = emptyNetworkElements()
        els[0].add(vertex);
        this.add(els);
        return this;
    }
    newE1 (label?: string, source?: Vertex, target?: Vertex): Network  {
        const vertex = MkEdge_1(label, source, target);
        const els = emptyNetworkElements();
        els[1].add(vertex);
        this.add(els);
        return this;
    }
    newE2 (label?: string, source?: Edge_1, target?: Edge_1): Network  {
        const vertex = MkEdge_2(label, source, target);
        const els = emptyNetworkElements();
        els[2].add(vertex);
        this.add(els);
        return this;
    }
    newE3 (label?: string, source?: Edge_2, target?: Edge_2): Network {
        const vertex = MkEdge_3(label, source, target);
        const els = emptyNetworkElements();
        els[3].add(vertex);
        this.add(els);
        return this;
    }
}//End of Network class

export default Network;

