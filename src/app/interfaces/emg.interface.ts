export interface emgs{
    "_id" : string,
    "qr" : string,
    "info" : Info,
    "client" : string,
    "plant" : string,
    "line" : string,
    "status" : number,
    "active" : boolean,
    "cod_pro" : string,
    "meta" : Meta
}
export interface Meta{
    "registred_by" : string,
    "registred_date" : string
}
export interface Info{
    "name" :string,
    "type" :string,
    "model" : string,
    "description" : string,
    "serial" : string
}