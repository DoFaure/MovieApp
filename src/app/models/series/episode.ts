export interface EpisodeResponse {
    page: number;
    results: Episode[];
    total_results: number;
    total_pages: number;
}

export interface Episode {
    air_date : string;
    episode_number : Number;
    id : Number;
    name : string;
    overview : string;
    production_code : string | null;
    season_number : Number;
    show_id : Number;
    still_path : string | null;
    vote_average : Number;
    vote_count : Number;

    crew : Array<any> | null ;
    guest_stars : Array<any> | null ;

}