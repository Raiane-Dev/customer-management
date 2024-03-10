class Point {
    constructor(public x: number, public y: number) {}
  }
  
  class Path {
    public points: Point[];
    public distanceFunc: (p: Point, q: Point) => number;
    public order: number[];
    public distances: number[];
  
    constructor(points: Point[], distanceFunc: (p: Point, q: Point) => number) {
      this.points = points;
      this.distanceFunc = distanceFunc;
      this.initializeOrder();
      this.initializeDistances();
    }
  
    private initializeOrder(): void {
      this.order = new Array(this.points.length);
      for (let i = 0; i < this.order.length; i++) this.order[i] = i;
    }
  
    private initializeDistances(): void {
      this.distances = new Array(this.points.length * this.points.length);
      for (let i = 0; i < this.points.length; i++) {
        for (let j = i + 1; j < this.points.length; j++) {
          this.distances[j + i * this.points.length] = this.distanceFunc(this.points[i], this.points[j]);
        }
      }
    }
  
    public change(temp: number): void {
      const i = this.randomPos(), j = this.randomPos();
      const delta = this.delta_distance(i, j);
      if (delta < 0 || Math.random() < Math.exp(-delta / temp)) {
        this.swap(i, j);
      }
    }
  
    public swap(i: number, j: number): void {
      const tmp = this.order[i];
      this.order[i] = this.order[j];
      this.order[j] = tmp;
    }
  
    private delta_distance(i: number, j: number): number {
      const jm1 = this.index(j - 1),
            jp1 = this.index(j + 1),
            im1 = this.index(i - 1),
            ip1 = this.index(i + 1);
      let s = (
        this.distance(jm1, i) +
        this.distance(i, jp1) +
        this.distance(im1, j) +
        this.distance(j, ip1) -
        this.distance(im1, i) -
        this.distance(i, ip1) -
        this.distance(jm1, j) -
        this.distance(j, jp1)
      );
      if (jm1 === i || jp1 === i)
        s += 2 * this.distance(i, j);
      return s;
    }
  
    private index(i: number): number {
      return (i + this.points.length) % this.points.length;
    }
  
    public access(i: number): Point {
      return this.points[this.order[this.index(i)]];
    }
  
    public distance(i: number, j: number): number {
      if (i === j) return 0;
      const low = this.order[i], high = this.order[j];
      return this.distances[low * this.points.length + high] || 0;
    }
  
    private randomPos(): number {
      return 1 + Math.floor(Math.random() * (this.points.length - 1));
    }
  }
  
  function solve(points: Point[], temp_coeff = 0.999, callback?: (order: number[]) => void, distance = euclidean): number[] {
    const path = new Path(points, distance);
    if (points.length < 2) return path.order;
    if (temp_coeff >= 1 || temp_coeff <= 0) return path.order;
  
    if (!temp_coeff)
      temp_coeff = 1 - Math.exp(-10 - Math.min(points.length, 1e6) / 1e5);
    const hasCallback = typeof(callback) === "function";
  
    for (let temperature = 100 * distance(path.access(0), path.access(1)); temperature > 1e-6; temperature *= temp_coeff) {
      path.change(temperature);
      if (hasCallback) callback(path.order);
    }
    return path.order;
  }
  
  function euclidean(p: Point, q: Point): number {
    const dx = p.x - q.x, dy = p.y - q.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  export { solve, Point };
  