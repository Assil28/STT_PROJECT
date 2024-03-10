export class Voyage {
    constructor(
      public _id: string,
    public heure_depart_voyage: String,
    public heure_arrive_voyage: String,
    public date: Date,
    public nbr_places_reserve: Number,
    public ville_depart: String,
    public ville_arrive: String,
    public prix: Number,
    public bus_id: {
          ref: 'Bus',
          required: true
      },
      public busDetails?: any
    ){}
  }
  