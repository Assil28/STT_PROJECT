import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'package:intl/intl.dart';
import 'package:stt/Models/TicketModel.dart';
import 'package:stt/Services/TicketService.dart';
import 'package:stt/Services/VoyageService.dart';

import '../Models/VoyageModel.dart';
import 'payment_scree.dart';



List<Voyage> voyages = []; // Définir le type de la liste comme Voyage
List<dynamic> uniqueHours=[];

void main() {
  runApp(const FormVoyage());
}

class FormVoyage extends StatefulWidget {
  const FormVoyage({Key? key}) : super(key: key);

  @override
  State<FormVoyage> createState() => _FormVoyageState();
}

class _FormVoyageState extends State<FormVoyage> {
  DateTime? _selectedDate;
  String? _selectedUser;
  VoyageService voyageService=new VoyageService();



  List<String> getUniqueDepartureCities() {
    return voyages
        .map((voyage) => voyage.ville_depart)
        .where((city) => city != null)
        .map((city) => city!) // Convertir String? en String après vérification non nulle
        .toSet()
        .toList();
  }

  List<String> getUniqueArrivalCities() {
    return voyages
        .map((voyage) => voyage.ville_arrive)
        .where((city) => city != null)
        .map((city) => city!) // Convertir String? en String après vérification non nulle
        .toSet()
        .toList();
  }


  void _presentDatePicker() {
    // showDatePicker is a pre-made funtion of Flutter
    showDatePicker(
            context: context,
            initialDate: DateTime.now(),
            firstDate: DateTime(2020),
            lastDate: DateTime(2050))
        .then((pickedDate) {
      // Check if no date is selected
      if (pickedDate == null) {
        return;
      }
      setState(() {
        _selectedDate = pickedDate;
        this.dateVoyage = _selectedDate.toString().substring(0, 10);
        print(_selectedDate.toString().substring(0, 10));
        fetchVoyage(_selectedDate!);
      });
    });
  }


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
    List<String> uniqueDepartureCities = getUniqueDepartureCities();
    List<String> uniqueArrivalCities = getUniqueArrivalCities();
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
              padding: EdgeInsets.only(
                  left: 25.0, right: 25.0, top: 0.0, bottom: 25.0),
              child: Form(
                key: form,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Image.asset(
                      "images/stt_logo.png",
                      height: 200, // Définit la hauteur de l'image à 100 pixels
                      width: 400, // Définit la largeur de l'image à 100 pixels
                    ),
                    ElevatedButton(
                      onPressed: _presentDatePicker,
                      style: ElevatedButton.styleFrom(
                        minimumSize: Size(500.0, 60.0), // Set minimum size
                        primary: Colors.white, // Button background color
                        onPrimary: Color(0xFF7949FF), // Button text color
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(
                              40), // Border radius set to 40
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment
                            .center, // Center the icon and text horizontally
                        children: [
                          Icon(Icons.calendar_today), // Add icon
                          SizedBox(
                              width:
                                  8), // Add some space between the icon and the text
                          Text(
                              'Selected Date: ${_selectedDate != null ? DateFormat('yyyy-MM-dd').format(_selectedDate!) : 'No date selected'}'),
                          // Add button text
                        ],
                      ),
                    ),
                    SizedBox(height: 20),

                    // Dropdown pour sélectionner les villes de departs
                    DropdownButtonFormField<String>(
                      value: uniqueDepartureCities.isNotEmpty ? uniqueDepartureCities[0] : null,
                      items: uniqueDepartureCities.map((city) {
                        return DropdownMenuItem<String>(
                          value: city,
                          child: Text(city),
                        );
                      }).toList(),
                      onChanged: (value) {
                        setState(() {

                          villeDepart = value!;
                        });
                      },
                      decoration: InputDecoration(
                        hintText: 'Ex: Tunis',
                        labelText: 'Depart City',
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(
                              40), // Border radius set to 40
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(
                              width: 2,
                              color: Color(
                                  0xFF7949FF)), // Largeur et couleur de la bordure avant le clic
                          borderRadius: BorderRadius.circular(
                              40), // Rayon de bordure défini sur 40
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(
                              width: 2,
                              color:
                                  Colors.red), // Red border color when focused
                          borderRadius: BorderRadius.circular(
                              40), // Border radius set to 40
                        ),
                      ),
                    ),

                    SizedBox(height: 20),
                    // Dropdown pour sélectionner sélectionner les villes darrivee
                    DropdownButtonFormField<String>(
                      value: uniqueArrivalCities.isNotEmpty ? uniqueArrivalCities[0] : null,

                      items:  uniqueArrivalCities.map((city) {
                        return DropdownMenuItem<String>(
                          value: city,
                          child: Text(city),
                        );
                      }).toList(),
                      onChanged: (value) async {
                        setState(() {
                          villeArrive = value!;
                        });
                        try {

                          uniqueHours = await voyageService.getUniqueHoursOfVoyages(dateVoyage, villeDepart, villeArrive);
                          for (var unHour in uniqueHours) {
                            print('Hour of trip: $unHour');
                          }
                        } catch (error) {
                          print('Error fetching unique hours: $error');
                          // Gérer l'erreur, par exemple afficher un message à l'utilisateur
                        }
                      },
                      decoration: InputDecoration(
                        hintText: 'Ex: Djerba',
                        labelText: 'Arrived City',
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(
                              40), // Border radius set to 40
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(
                              width: 2,
                              color: Color(
                                  0xFF7949FF)), // Largeur et couleur de la bordure avant le clic
                          borderRadius: BorderRadius.circular(
                              40), // Rayon de bordure défini sur 40
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(
                              width: 2,
                              color:
                                  Colors.red), // Red border color when focused
                          borderRadius: BorderRadius.circular(
                              40), // Border radius set to 40
                        ),
                      ),
                    ),



                    SizedBox(height: 20),


                    // Dropdown pour sélectionner sélectionner l'heure de voyage
                    DropdownButtonFormField<String>(
                      value: uniqueHours.isNotEmpty ? uniqueHours[0] : null,
                      items: uniqueHours.isNotEmpty
                          ? uniqueHours.map((hr) {
                        return DropdownMenuItem<String>(
                          value: hr,
                          child: Text(hr),
                        );
                      }).toList()
                          : [
                        DropdownMenuItem<String>(
                          value: null,
                          child: Text('No available hours'),
                        ),
                      ],
                      onChanged: (value) {
                        setState(() {
                          heureVoyage = value!;
                        });
                      },
                      decoration: InputDecoration(
                        hintText: 'Ex: 21:00',
                        labelText: 'Time of trip',
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(40),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(
                            width: 2,
                            color: Color(0xFF7949FF),
                          ),
                          borderRadius: BorderRadius.circular(40),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(
                            width: 2,
                            color: Colors.red,
                          ),
                          borderRadius: BorderRadius.circular(40),
                        ),
                      ),
                    ),

                    /*SizedBox(height: 20),

                    TextFormField(
                      decoration: InputDecoration(
                        hintText: 'Ex: 21:00',
                        labelText: "Time of trip",
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(
                              40), // Border radius set to 40
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(
                              width: 2,
                              color: Color(
                                  0xFF7949FF)), // Largeur et couleur de la bordure avant le clic
                          borderRadius: BorderRadius.circular(
                              40), // Rayon de bordure défini sur 40
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(
                              width: 2,
                              color:
                                  Colors.red), // Red border color when focused
                          borderRadius: BorderRadius.circular(
                              40), // Border radius set to 40
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

*/
                    SizedBox(height: 20),
                    TextFormField(
                      decoration: InputDecoration(
                        hintText: 'Ex: 99999999',
                        labelText: "Phone Number",
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(
                              40), // Border radius set to 40
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(
                              width: 2,
                              color: Color(
                                  0xFF7949FF)), // Largeur et couleur de la bordure avant le clic
                          borderRadius: BorderRadius.circular(
                              40), // Rayon de bordure défini sur 40
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(
                              width: 2,
                              color:
                                  Colors.red), // Red border color when focused
                          borderRadius: BorderRadius.circular(
                              40), // Border radius set to 40
                        ),
                      ),
                      onSaved: (val) {
                        ticket?.numTel = val!;
                      },
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Champs vide";
                        }
                        if ((value.length > 8)||(value.length < 8)) {
                          return "Nombre de caractères doit être egale a 8";
                        }
                        return null;
                      },
                    ), // pour tell

                    SizedBox(height: 40),
                    Align(
                      alignment: Alignment.center,
                      child: MaterialButton(
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
                              //ticket.qrCode ="${ticket.voyageId} / ${ticket.dateAchat} /" ;
                              print(
                                  "ID du voyage trouvé dans ticket: ${ticket.toJson()}");
                              Map<String, dynamic> ticketMap =
                                  await TicketService.createTicket(
                                      ticket.toJson());
                              TicketModel ticketCreated =
                                  TicketModel.fromJson(ticketMap);
                              print("Ticket ajouté avec succès");

                              var voyage;
                               Map<String,dynamic> voyageMap =
                              await VoyageService.getVoyage(ticket.voyageId);
                              voyage = Voyage.fromJson(voyageMap);
                              print(" voy date :" + (voyage.heure_depart_voyage ?? ""));


                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) =>
                                        PaymentScreen(ticket: ticketCreated,voyage: voyage,)),
                              );
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
                        child: Text(
                          "NEXT",
                          style: TextStyle(fontSize: 25),
                        ),
                      ),
                    ),
                    Container(height: 80,),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Future<void> fetchVoyage(DateTime selectedDate) async {

    final formattedDate = DateFormat('yyyy-MM-dd').format(selectedDate);
    final response = await http.post(Uri.parse('http://192.168.1.166:3800/api/voyages/getVoyagesByDate/$formattedDate'));

    if (response.statusCode == 200) {
      final List<dynamic> jsonData = json.decode(response.body)['result']; // Extract 'result' key from the response JSON
      setState(() {
        voyages.clear();
        voyages = jsonData.map((item) => Voyage.fromJson(item)).toList(); // Map each JSON object to Voyage object
        for (var voyage in voyages) {
          print('Voyage details:');
          print('Date: ${voyage.date}');
          print('Departure: ${voyage.ville_depart}');
          print('Arrival: ${voyage.ville_arrive}');
          print('Departure time: ${voyage.heure_depart_voyage}');
          print('Arrival time: ${voyage.heure_arrive_voyage}');
          print('Price: ${voyage.prix}');
          print('----------------------');
        }

      });
    } else {
      throw Exception('Failed to load voyages Response body: ${response.body}');
    }
  }



}

class DatePickerExample extends StatefulWidget {
  const DatePickerExample(
      {Key? key,
      this.restorationId,
      required this.initialDate,
      required this.onDateSelected})
      : super(key: key);

  final String? restorationId;
  final DateTime initialDate;
  final Function(DateTime)? onDateSelected;

  @override
  State<DatePickerExample> createState() => _DatePickerExampleState();
}

/// RestorationProperty objects can be used because of RestorationMixin.
class _DatePickerExampleState extends State<DatePickerExample>
    with RestorationMixin {
  // In this example, the restoration ID for the mixin is passed in through
  // the [StatefulWidget]'s constructor.
  @override
  String? get restorationId => widget.restorationId;

  final RestorableDateTime _selectedDate =
      RestorableDateTime(DateTime(2021, 7, 25));
  late final RestorableRouteFuture<DateTime?> _restorableDatePickerRouteFuture =
      RestorableRouteFuture<DateTime?>(
    onComplete: _selectDate,
    onPresent: (NavigatorState navigator, Object? arguments) {
      return navigator.restorablePush(
        _datePickerRoute,
        arguments: _selectedDate.value.millisecondsSinceEpoch,
      );
    },
  );

  @pragma('vm:entry-point')
  static Route<DateTime> _datePickerRoute(
    BuildContext context,
    Object? arguments,
  ) {
    return DialogRoute<DateTime>(
      context: context,
      builder: (BuildContext context) {
        return DatePickerDialog(
          restorationId: 'date_picker_dialog',
          initialEntryMode: DatePickerEntryMode.calendarOnly,
          initialDate: DateTime.fromMillisecondsSinceEpoch(arguments! as int),
          firstDate: DateTime(2021),
          lastDate: DateTime(2022),
        );
      },
    );
  }

  @override
  void restoreState(RestorationBucket? oldBucket, bool initialRestore) {
    registerForRestoration(_selectedDate, 'selected_date');
    registerForRestoration(
        _restorableDatePickerRouteFuture, 'date_picker_route_future');
  }

  void _selectDate(DateTime? newSelectedDate) {
    if (newSelectedDate != null) {
      setState(() {
        _selectedDate.value = newSelectedDate;
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text(
              'Selected: ${_selectedDate.value.day}/${_selectedDate.value.month}/${_selectedDate.value.year}'),
        ));
      });

      // Call the onDateSelected function with the selected date
      if (widget.onDateSelected != null) {
        widget.onDateSelected!(newSelectedDate);
      }
    }
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: OutlinedButton(
          onPressed: () {
            _restorableDatePickerRouteFuture.present();
          },
          child: const Text('Open Date Picker'),
        ),
      ),
    );
  }
}
