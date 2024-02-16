class Voyage {
  String? id;
  String? date;
  String? ville_depart;
  String? ville_arrive;
  String? heure_depart_voyage;
  String? heure_arrive_voyage;
  double? prix;

  Voyage({
    this.id,
    this.date,
    this.ville_depart,
    this.ville_arrive,
    this.heure_depart_voyage,
    this.heure_arrive_voyage,
    this.prix,
  });

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
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
      prix: json['prix']?.toDouble(), // Convert null to double or keep null if it's null
    );
  }
}
