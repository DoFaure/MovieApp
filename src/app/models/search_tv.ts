import { Serie } from "./series/serie";

export interface SearchTvResponse {
    page: number;
    results: SearchTv[];
    total_results: number;
    total_pages: number;
}

export interface SearchTv {
    page: Number;
    results: Array<Serie>
    total_pages: Number;
    total_results: Number;
}