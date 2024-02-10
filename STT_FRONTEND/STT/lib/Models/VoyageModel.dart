class Voyage {
  late String _id;
  late String date;
  late String ville_depart;
  late String ville_arrive;
  late String heure_depart_voyage;
  late String heure_arrive_voyage;
  late double prix;

  Voyage({
    this.date = '',
    this.ville_depart = '',
    this.ville_arrive = '',
    this.heure_depart_voyage = '',
    this.heure_arrive_voyage = '',
    this.prix = 0.0,
  });

  Map<String, dynamic> toJson() {
    return {
      '_id': _id,
      'date': date,
      'ville_depart': ville_depart,
      'ville_arrive': ville_arrive,
      'heure_depart_voyage': heure_depart_voyage,
      'heure_arrive_voyage': heure_arrive_voyage,
      'prix': prix,
    };
  }

  factory Voyage.fromJson(Map<String, dynamic> json) {
    return Voyage(

      date: json['date'],
      ville_depart: json['ville_depart'],
      ville_arrive: json['ville_arrive'],
      heure_depart_voyage: json['heure_depart_voyage'],
      heure_arrive_voyage: json['heure_arrive_voyage'],
      prix: json['prix'],
    );
  }
}
