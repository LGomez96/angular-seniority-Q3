export interface Player {

    id?:         number;
   firstName?:  string;
   lastName?:   string;
   image?:      string;
   attack?:     number;
   defense?:    number;
   skills?:     number;
   idAuthor?:   number;
   idPosition?: number;
}



export interface Position {
   id:          number;
    description: string;
}

export interface SearchPlayerDto{
search: string;

}