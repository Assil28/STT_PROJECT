import 'package:flutter/material.dart';

import 'package:calendar_agenda/calendar_agenda.dart';
import 'package:stt/Models/TicketModel.dart';
import 'package:stt/Models/VoyageModel.dart';
import 'package:stt/Services/TicketService.dart';
import 'package:stt/Services/VoyageService.dart';
import 'package:stt/home_screen.dart';

import 'package:intl/intl.dart';

List<Voyage> listVoyages = <Voyage>[]; // Définir le type de la liste comme Voyage


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
    // selectedDate = DateTime.now();
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
        appBar: AppBar(title: const Text("STT")),
        body: SingleChildScrollView(
          child: Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage("images/backgroundSTT.jpg"),
                fit: BoxFit.cover, // Ajuste l'image pour couvrir toute la zone
              ),
            ),
            child: Padding(
              padding: EdgeInsets.only(left: 25.0, right: 25.0, top: 0.0,bottom: 25.0),
              child: Form(
                key: form,
                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Image.asset("images/stt_logo.png",
                      height: 200, // Définit la hauteur de l'image à 100 pixels
                      width: 400, // Définit la largeur de l'image à 100 pixels
                    ),

                    TextFormField(
                      decoration: InputDecoration(
                        hintText: 'Ex: 2024-02-08',
                        labelText: 'Trip Date',
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(40), // Border radius set to 40
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(width: 2, color: Color(0xFF7949FF)), // Largeur et couleur de la bordure avant le clic
                          borderRadius: BorderRadius.circular(40), // Rayon de bordure défini sur 40
                        ),

                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(width: 2, color: Colors.red), // Red border color when focused
                          borderRadius: BorderRadius.circular(40), // Border radius set to 40
                        ),
                      ),
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
                    ), // pour la date



                    /*  TextFormField(
                      decoration: InputDecoration(
                        hintText: 'Ex: Tunis',
                        labelText: 'Depart City',
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(40), // Border radius set to 40
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(width: 2, color: Color(0xFF7949FF)), // Largeur et couleur de la bordure avant le clic
                          borderRadius: BorderRadius.circular(40), // Rayon de bordure défini sur 40
                        ),

                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(width: 2, color: Colors.red), // Red border color when focused
                          borderRadius: BorderRadius.circular(40), // Border radius set to 40
                        ),
                      ),
                      onSaved: (val) {
                        villeDepart = val!;
                      },
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Champs vide";
                        }
                        return null;
                      },
                    ), // pour la ville depart

                    SizedBox(height: 20),
                    TextFormField(
                      decoration: InputDecoration(

                        hintText: 'Ex: Tunis',
                        labelText: "Destination City",
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(40), // Border radius set to 40
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(width: 2, color: Color(0xFF7949FF)), // Largeur et couleur de la bordure avant le clic
                          borderRadius: BorderRadius.circular(40), // Rayon de bordure défini sur 40
                        ),

                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(width: 2, color: Colors.red), // Red border color when focused
                          borderRadius: BorderRadius.circular(40), // Border radius set to 40
                        ),
                      ),
                      onSaved: (val) {
                        villeArrive = val!;
                      },
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Champs vide";
                        }
                        return null;
                      },
                    ), //pour la ville darrivé

                    SizedBox(height: 20),
                    TextFormField(
                      decoration: InputDecoration(

                        hintText: 'Ex: 21:00',
                        labelText: "Time of trip",
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(40), // Border radius set to 40
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(width: 2, color: Color(0xFF7949FF)), // Largeur et couleur de la bordure avant le clic
                          borderRadius: BorderRadius.circular(40), // Rayon de bordure défini sur 40
                        ),

                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(width: 2, color: Colors.red), // Red border color when focused
                          borderRadius: BorderRadius.circular(40), // Border radius set to 40
                        ),
                      ),
                      onSaved: (val) {
                        heureVoyage = val!;
                      },
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Champs vide";
                        }

                        return null;
                      },
                    ), // pour time


                    SizedBox(height: 20),
                    TextFormField(
                      decoration: InputDecoration(

                        hintText: 'Ex: 000000001',
                        labelText: "CIN Number",
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(40), // Border radius set to 40
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(width: 2, color: Color(0xFF7949FF)), // Largeur et couleur de la bordure avant le clic
                          borderRadius: BorderRadius.circular(40), // Rayon de bordure défini sur 40
                        ),

                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(width: 2, color: Colors.red), // Red border color when focused
                          borderRadius: BorderRadius.circular(40), // Border radius set to 40
                        ),
                      ),
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
                    ), // pour cin

                    SizedBox(height: 20),
                    TextFormField(
                      decoration: InputDecoration(

                        hintText: 'Ex: 99999999',
                        labelText: "Phone Number",
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(40), // Border radius set to 40
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(width: 2, color: Color(0xFF7949FF)), // Largeur et couleur de la bordure avant le clic
                          borderRadius: BorderRadius.circular(40), // Rayon de bordure défini sur 40
                        ),

                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(width: 2, color: Colors.red), // Red border color when focused
                          borderRadius: BorderRadius.circular(40), // Border radius set to 40
                        ),
                      ),
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
                    ), // pour tell

                    SizedBox(height: 20),
                    Align(
                      alignment: Alignment.center,
                      child: MaterialButton(
                        onPressed: () async {
                          if (form.currentState!.validate()) {
                            form.currentState!.save();
                            print("Ticket:");
                            print("Date: ${dateVoyage}\n VilleDepart :${villeDepart}\n Ville Arrivé : ${villeArrive}\n Heure :${heureVoyage}\n Cin Voyageur :${ticket!.cinVoyageur}\n NumTell : ${ticket!.numTel}\n");

                            try {
                              // Appeler la fonction getVoyageByVilleDateTime pour obtenir l'ID du voyage
                              final voyageId = await VoyageService.getVoyageByVilleDateTime({
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
                                print("Aucun voyage trouvé avec les critères spécifiés");
                              }

                              // Appeler le service TicketService pour ajouter le ticket
                              print("ID du voyage trouvé dans ticket: ${ticket.voyageId}");
                              print("ID du voyage trouvé dans ticket: ${ticket.toJson()}");
                              await TicketService.createTicket(ticket.toJson());
                              Navigator.push(  context,
                                MaterialPageRoute(builder: (context) => HomeScreen()),
                              );
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
                        color: Color(0x99FF79B9),
                        textColor: Colors.white,
                        padding: EdgeInsets.all(10),
                        minWidth: 200,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text("NEXT", style: TextStyle(fontSize: 25),),
                      ),
                    ),


                  ],
                ),
              ),
            ),
          ),
        ),

      ),
    );
  }
}

