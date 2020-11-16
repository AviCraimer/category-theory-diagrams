type Dimension = 0 | 1 | 2 | 3;

type NetworkElementBase = {
    id: string;
    label: string;
    data: object;
    type: string;
    dimension: Dimension
}

export type Vertex = NetworkElementBase & {
    dimension: 0
}

export type Edge_1 = NetworkElementBase & {
    dimension: 1;
    source: Vertex;
    target: Vertex;
}

export type Edge_2 = NetworkElementBase & {
    dimension: 2;
    source: Edge_1;
    target: Edge_1;
}

export type Edge_3 = NetworkElementBase & {
    dimension: 3;
    source: Edge_2;
    target: Edge_2;
}

export type NetworkElement = Vertex | Edge_1 | Edge_2 | Edge_3;
export type NetworkElements = [Set<Vertex>, Set<Edge_1>, Set<Edge_2>, Set<Edge_3>];
