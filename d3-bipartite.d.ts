export = bipartite;

declare function bipartite<T>(): bipartite.Layout<T>;

declare namespace bipartite {
  export interface StartEndPoint {
    x: number;
    y: number;
    height: number;
  }

  export interface BiFlow<T> {
    start: StartEndPoint;
    end: StartEndPoint;
    path: string;
    source: string;
    target: string;
    value: number;
    thickness: number;
    original: T;
  }

  export interface BiLocation<T> {
    key: string;
    height: number;
    max: number;
    value: number;
    values: Array<BiFlow<T>>;
    x: number;
    y: number;
  }

  export interface LayoutResult<T> {
    sources: Array<BiLocation<T>>;
    targets: Array<BiLocation<T>>;
    flows: Array<BiFlow<T>>;
  }

  export interface Layout<T> {
    (dataPoints: T[]): LayoutResult<T>;
    width(width: number): Layout<T>;
    height(height: number): Layout<T>;
    source(source: (dataPoint: T) => string): Layout<T>;
    target(target: (dataPoint: T) => string): Layout<T>;
    value(value: (dataPoint: T) => number): Layout<T>;
    padding(padding: number): Layout<T>;
  }
}
