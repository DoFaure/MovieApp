export interface Cast {
  cast_id: number,
  character: string,
  credit_id: string,
  gender: number,
  id: number,
  name: string,
  order: number,
  profile_path: string
}

export interface CreditResponse {
  cast: Cast[],
  crew: any[],
  id: number,
}