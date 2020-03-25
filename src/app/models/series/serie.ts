import { Genre } from "../genre";
import { Created_Serie } from "./created_serie";
import { Episode } from "./episode";
import { Season } from "./season";


export interface SerieResponse {
    page: number;
    results: Serie[];
    total_results: number;
    total_pages: number;
}

export interface Serie {
    backdrop_path : string | null;
    created_by : Array<Created_Serie>;
    episode_run_time: Array<Number>;
    first_air_date : string;
    genres : Array<Genre>;
    homepage : string;
    id : Number;
    in_production : boolean;
    languages : Array<string>;
    last_air_date : string,
    last_episode_to_air: Episode;
    name : string;
    next_episode_to_air : null;
    networks: Array<any>;
    number_of_episodes : Number;
    number_of_seasons : Number;
    origin_country : Array<string>;
    original_language : string;
    original_name : string;
    overview : string;
    popularity : Number ;
    poster_path : null | string ;
    production_companies : Array<any> ;
    seasons : Array<Season>;
    status : string;
    type : string;
    vote_average : Number;
    vote_count : Number;  
}


