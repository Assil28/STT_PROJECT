
class TicketModel {
  DateTime dateAchat;
  bool etat;
  String cinVoyageur;
  String numTel;
  String qrCode;
  String voyageId; // Notez que vous pouvez utiliser une classe ObjectId si nécessaire

  TicketModel({
    required this.dateAchat,
    this.etat=false,
    required this.cinVoyageur,
    required this.numTel,
    required this.qrCode,
    required this.voyageId,
  });

  factory TicketModel.fromJson(Map<String, dynamic> json) {
    return TicketModel(
      //id: json['_id'],
      dateAchat: DateTime.parse(json['date_achat']),
      etat: json['etat'],
      cinVoyageur: json['cin_voyageur'],
      numTel: json['num_tel'],
      qrCode: json['qr_code'],
      voyageId: json['voyage_id'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      //'id': id,
      'date_achat': dateAchat.toIso8601String(),
      'etat': etat,
      'cin_voyageur': cinVoyageur,
      'num_tel': numTel,
      'qr_code': qrCode,
      'voyage_id': voyageId,
    };
  }
}

