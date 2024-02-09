import 'package:calendar_agenda/calendar_agenda.dart';
import 'package:flutter/material.dart';
import 'package:stt/Models/TicketModel.dart';
import 'package:stt/Models/VoyageModel.dart';
import 'package:stt/Services/TicketService.dart';

import '../Services/VoyageService.dart';

//import 'Models/VoyageModel.dart';

List<Voyage> listVoyages =
    <Voyage>[]; // Définir le type de la liste comme Voyage

void main() {
  runApp(const FormVoyage());
}

class FormVoyage extends StatefulWidget {
  const FormVoyage({Key? key}) : super(key: key);

  @override
  State<FormVoyage> createState() => _FormVoyageState();
}

class _FormVoyageState extends State<FormVoyage> {
  GlobalKey<FormState> form = GlobalKey<FormState>();

  late TicketModel ticket;
  late String villeDepart, villeArrive, heureVoyage, dateVoyage;

  late TicketService ticketService;

  @override
  void initState() {
    super.initState();
    ticket = TicketModel(
      dateAchat: DateTime.now(),
      etat: false,
      cinVoyageur: '',
      numTel: '',
      qrCode: '',
      voyageId: '',
    );
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text("Formulaire Voyageur")),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: form,
            child: Column(
              children: [
                /*TextFormField(
                  onSaved: (val) {
                    dateVoyage = val! ;
                    setState(() {
                      print(val);
                    });
                  },
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Champs vide";
                    }
                    if (value.length < 3) {
                      return "format yyyy-mm-jj";
                    }
                    return null;
                  },
                  decoration:const InputDecoration(
                    hintText: 'selected date',
                  ),
                ),*/ // pour la date

                CalendarAgenda(
                  initialDate: DateTime.now(),
                  firstDate: DateTime.now().subtract(Duration(days: 140)),
                  lastDate: DateTime.now().add(Duration(days: 4)),
                  onDateSelected: (date) async {
                    dateVoyage = date.toString().substring(0, 10);
                    print(dateVoyage);
                    listVoyages = await VoyageService.getVoyagesByDate(
                      dateVoyage,
                    );

                    print("voyages:");
                    print(listVoyages[0].ville_arrive);
                  },
                ),
                TextFormField(
                  onSaved: (val) {
                    villeDepart = val!;
                  },
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Champs vide";
                    }
                    return null;
                  },
                  decoration: const InputDecoration(
                    hintText: 'selected depart city',
                  ),
                ), //pour la ville_dep
                TextFormField(
                  obscureText: false,
                  onSaved: (val) {
                    villeArrive = val!;
                  },
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Champs vide";
                    }
                    return null;
                  },
                  decoration: const InputDecoration(
                    hintText: 'selected arrival city',
                  ),
                ),
                TextFormField(
                  obscureText: false,
                  onSaved: (val) {
                    heureVoyage = val!;
                  },
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Champs vide";
                    }

                    return null;
                  },
                  decoration: const InputDecoration(
                    hintText: 'Time',
                  ),
                ),
                //DropdownButtonExample(),
                TextFormField(
                  obscureText: false,
                  onSaved: (val) {
                    ticket?.cinVoyageur = val!;
                  },
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Champs vide";
                    }
                    if (value.length > 8) {
                      return "Nombre de caractères doit être < 9";
                    }
                    return null;
                  },
                  decoration: const InputDecoration(
                    hintText: 'identity card',
                  ),
                ),
                TextFormField(
                  obscureText: false,
                  onSaved: (val) {
                    ticket?.numTel = val!;
                  },
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Champs vide";
                    }
                    if (value.length > 8) {
                      return "Nombre de caractères doit être < 9";
                    }
                    return null;
                  },
                  decoration: const InputDecoration(
                    hintText: 'phone number',
                  ),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () async {
                    if (form.currentState!.validate()) {
                      form.currentState!.save();
                      print("Ticket:");
                      print(
                          "Date: ${dateVoyage}\n VilleDepart :${villeDepart}\n Ville Arrivé : ${villeArrive}\n Heure :${heureVoyage}\n Cin Voyageur :${ticket!.cinVoyageur}\n NumTell : ${ticket!.numTel}\n");

                      try {
                        // Appeler la fonction getVoyageByVilleDateTime pour obtenir l'ID du voyage
                        final voyageId =
                            await VoyageService.getVoyageByVilleDateTime({
                          'ville_depart': villeDepart,
                          'ville_arrive': villeArrive,
                          'heure_depart_voyage': heureVoyage,
                          'date': dateVoyage,
                        });

                        print("ID du voyage trouvé: $voyageId");

                        // Mettre l'ID du voyage dans ticket.voyageId
                        if (voyageId != null) {
                          ticket.voyageId = voyageId;
                          print("ID du voyage trouvé: $voyageId");
                        } else {
                          print(
                              "Aucun voyage trouvé avec les critères spécifiés");
                        }

                        // Appeler le service TicketService pour ajouter le ticket
                        print(
                            "ID du voyage trouvé dans ticket: ${ticket.voyageId}");
                        ticket.qrCode = "qr code pour tester";
                        print(
                            "ID du voyage trouvé dans ticket: ${ticket.toJson()}");
                        await TicketService.createTicket(ticket.toJson());

                        print("Ticket ajouté avec succès");
                        // Afficher un message ou effectuer une action supplémentaire si nécessaire
                      } catch (error) {
                        print("Erreur lors de l'ajout du ticket: $error");
                        // Gérer l'erreur (afficher un message à l'utilisateur, par exemple)
                      }
                    } else {
                      print("Formulaire invalide");
                    }
                  },
                  child: Text("Valider"),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class DropdownButtonExample extends StatefulWidget {
  const DropdownButtonExample({Key? key});

  @override
  State<DropdownButtonExample> createState() => _DropdownButtonExampleState();
}

class _DropdownButtonExampleState extends State<DropdownButtonExample> {
  late String dropdownValue;

  @override
  void initState() {
    super.initState();
    // Assurez-vous que listVoyages n'est pas vide avant d'essayer d'accéder à son premier élément
    dropdownValue = listVoyages.isNotEmpty ? listVoyages[0].toString() : '';
  }

  @override
  Widget build(BuildContext context) {
    return DropdownButton<String>(
        value: dropdownValue,
        icon: const Icon(Icons.arrow_downward),
        elevation: 16,
        style: const TextStyle(color: Colors.deepPurple),
        underline: Container(
          height: 2,
          color: Colors.deepPurpleAccent,
        ),
        onChanged: (String? value) {
          setState(() {
            dropdownValue = value!;
          });
        },
        items: listVoyages.map<DropdownMenuItem<String>>((Voyage voyage) {
          return DropdownMenuItem<String>(
            value: voyage.toString(),
            child: Text(voyage.toString()),
          );
        }).toList());
  }
}
