import {MkVertex, MkEdge_1, MkEdge_2, MkEdge_3} from "../lib/networkElements";
import Network from "../lib/Network";


describe("Network", () => {
    it("Instantiate new network", () => {
        console.log( new Network() )

    });

    it("Make Edge_1", () => {
        const f = MkEdge_1("f");

        expect(f.label).toBe("f");
        expect(f.source.label).toBe("");
        expect(f.target.label).toBe("");

        const A = MkVertex("A");
        const B = MkVertex("B");

        const g = MkEdge_1("g", A, B);
        expect(g.label).toBe("g");
        expect(g.source).toBe(A);
        expect(g.source.label).toBe("A");
        expect(g.target).toBe(B);
        expect(g.target.label).toBe("B");
    });
} )