import { Episode } from "./episode";

export interface SeasonResponse {
    page: number;
    results: Season[];
    total_results: number;
    total_pages: number;
}

export interface Season {
    
    air_date : string;
    episode_count : Number;
    id : Number;
    name : string;
    overview : string;
    poster_path : string;
    season_number : Number;

    _id: string | null;
    episodes : Array<Episode> | null;

}

