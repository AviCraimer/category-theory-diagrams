type Degree = 0 | 1 | 2 | 3;

type NetworkElementBase = {
    id: string;
    label: string;
    data: object;
    type: string;
    degree: Degree
}

export type Vertex = NetworkElementBase & {
    degree: 0
}

export type Edge_1 = NetworkElementBase & {
    degree: 1;
    source: Vertex;
    target: Vertex;
}

export type Edge_2 = NetworkElementBase & {
    degree: 2;
    source: Edge_1;
    target: Edge_1;
}

export type Edge_3 = NetworkElementBase & {
    degree: 3;
    source: Edge_2;
    target: Edge_2;
}

export type NetworkElements = [Set<Vertex>, Set<Edge_1>, Set<Edge_2>, Set<Edge_3>];

export type Network = {
    id: string;
    elements: NetworkElements;
    label: string;
    data: object;
};
