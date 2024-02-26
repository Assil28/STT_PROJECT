
import 'package:flutter/material.dart';
import 'package:stt/Services/TicketService.dart';

class ResultScreen extends StatefulWidget {
  final String code;

  final Function() closeScreen;

  const ResultScreen({Key? key, required this.closeScreen, required this.code}) : super(key: key);

  @override
  _ResultScreenState createState() => _ResultScreenState();
}

class _ResultScreenState extends State<ResultScreen> {
  late Future<bool> _ticketValidity;

  @override
  void initState() {
    super.initState();
    print("===");
    print(widget.code);
    print("===");
    _ticketValidity = TicketService().checkTicketValidity(widget.code);
  }

  // Ajoutez cette méthode pour fermer l'écran
  void closeScreen() {
    widget.closeScreen(); // Appel de la fonction closeScreen fournie par les propriétés du widget ResultScreen
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: FutureBuilder<bool>(
          future: _ticketValidity,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              // Affichez un indicateur de chargement pendant la vérification
              return CircularProgressIndicator();
            } else if (snapshot.hasError) {
              // Affichez un message d'erreur s'il y a une erreur pendant la vérification
              return Text('Erreur: ${snapshot.error}');
            } else {
              // Affichez le contenu en fonction de la validité du ticket
              if (snapshot.data == true) {
                print("id=");
                print(snapshot.data);
                // Le ticket est valide
                return Scaffold(
                  appBar: AppBar(),
                  body: LayoutBuilder(
                    builder: (context, constraints) {
                      return Container(
                        width: constraints.maxWidth,
                        height: constraints.maxHeight,
                        clipBehavior: Clip.antiAlias,
                        decoration: BoxDecoration(
                          image: DecorationImage(
                            image: AssetImage("images/backgroundSTT.jpg"),
                            fit: BoxFit.cover,
                          ),
                        ),
                        child: Stack(
                          children: [
                            Positioned(
                              left: 20,
                              top: 109,
                              child: Container(
                                width: constraints.maxWidth - 60,
                                height: constraints.maxHeight - 129, // Adjusted height
                                padding: const EdgeInsets.only(top: 20, right: 50, left: 50),
                                decoration: ShapeDecoration(
                                  color: Colors.white.withOpacity(0.6),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(32),
                                  ),
                                ),
                                child: Column(
                                  children: [
                                    Container(
                                      margin: EdgeInsets.only(bottom: 10),
                                      child: Text(
                                        'Booking Ticket',
                                        textAlign: TextAlign.center,
                                        style: TextStyle(
                                          color: Colors.black,
                                          fontSize: 32,
                                          fontFamily: 'Inter',
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            Container(
                              width: 400,
                              height: 812,
                              clipBehavior: Clip.antiAlias,
                              decoration: BoxDecoration(
                                image: DecorationImage(
                                  image: AssetImage("images/backgroundSTT.jpg"),
                                  fit: BoxFit.cover, // Ajuste l'image pour couvrir toute la zone
                                ),
                              ),
                              child: Stack(
                                children: [
                                  Positioned(
                                    left: 42,
                                    top: 175,
                                    child: Container(
                                      width: 280,
                                      height: 280,
                                      padding: const EdgeInsets.only(top:20,right: 50,left: 50),
                                      decoration: ShapeDecoration(
                                        color: Colors.white.withOpacity(0.6000000238418579),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(32),
                                        ),
                                      ),
                                      child: Column(
                                        children: [
                                          Text(
                                            'Check Ticket',
                                            textAlign: TextAlign.center,
                                            style: TextStyle(
                                              color: Colors.black,
                                              fontSize: 30,
                                              fontFamily: 'Inter',
                                              fontWeight: FontWeight.w600,
                                              height: 0,
                                            ),
                                          ),

                                          SizedBox(height: 20,),
                                          Container(
                                            width: 320,
                                            height: 4,
                                            decoration: ShapeDecoration(
                                              color: Color(0xFFD9D9D9),
                                              shape: RoundedRectangleBorder(
                                                borderRadius: BorderRadius.circular(10),
                                              ),
                                            ),
                                          ),
                                          SizedBox(height: 15,),

                                          Text(
                                            'Ticket verified successfully',
                                            textAlign: TextAlign.center,
                                            style: TextStyle(
                                              color: Colors.black,
                                              fontSize: 31,
                                              fontFamily: 'Inter',
                                              fontWeight: FontWeight.w600,
                                              height: 0,
                                            ),
                                          ),

                                          SizedBox(height: 10,),

                                          Align(
                                            alignment: Alignment.center,
                                            child: MaterialButton(
                                              onPressed: () async {
                                                try {
                                                  TicketService().CheckTicket(widget.code);
                                                  print("--------");

                                                  print(widget.closeScreen());
                                                  widget.closeScreen();
                                                  print("--------");
                                                  print(widget.closeScreen());

                                                  Navigator.pop(context);

                                                } catch (error) {
                                                  print('Error scan ticket par le controlleur');

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
                                                "Go Back",
                                                style: TextStyle(fontSize: 25),
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            )
                          ],
                        ),
                      );
                    },
                  ),
                );

              } else {
                // Le ticket n'est pas valide
                return  Scaffold(
                  appBar: AppBar(),
                  body: LayoutBuilder(
                    builder: (context, constraints) {
                      return Container(
                        width: constraints.maxWidth,
                        height: constraints.maxHeight,
                        clipBehavior: Clip.antiAlias,
                        decoration: BoxDecoration(
                          image: DecorationImage(
                            image: AssetImage("images/backgroundSTT.jpg"),
                            fit: BoxFit.cover,
                          ),
                        ),
                        child: Stack(
                          children: [
                            Positioned(
                              left: 20,
                              top: 109,
                              child: Container(
                                width: constraints.maxWidth - 60,
                                height: constraints.maxHeight - 129, // Adjusted height
                                padding: const EdgeInsets.only(top: 20, right: 50, left: 50),
                                decoration: ShapeDecoration(
                                  color: Colors.white.withOpacity(0.6),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(32),
                                  ),
                                ),
                                child: Column(
                                  children: [
                                    Container(
                                      margin: EdgeInsets.only(bottom: 10),
                                      child: Text(
                                        'Booking Ticket',
                                        textAlign: TextAlign.center,
                                        style: TextStyle(
                                          color: Colors.black,
                                          fontSize: 32,
                                          fontFamily: 'Inter',
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            Container(
                              width: 400,
                              height: 812,
                              clipBehavior: Clip.antiAlias,
                              decoration: BoxDecoration(
                                image: DecorationImage(
                                  image: AssetImage("images/backgroundSTT.jpg"),
                                  fit: BoxFit.cover, // Ajuste l'image pour couvrir toute la zone
                                ),
                              ),
                              child: Stack(
                                children: [
                                  Positioned(
                                    left: 42,
                                    top: 105,
                                    child: Container(
                                      width: 280,
                                      height: 350,
                                      padding: const EdgeInsets.only(top:20,right: 50,left: 50),
                                      decoration: ShapeDecoration(
                                        color: Colors.white.withOpacity(0.6000000238418579),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(32),
                                        ),
                                      ),
                                      child: Column(
                                        children: [
                                          /*Text(
                                            'Check Ticket',
                                            textAlign: TextAlign.center,
                                            style: TextStyle(
                                              color: Colors.black,
                                              fontSize: 30,
                                              fontFamily: 'Inter',
                                              fontWeight: FontWeight.w600,
                                              height: 0,
                                            ),
                                          ),*/
                                          Container(
                                            margin: EdgeInsets.only(left: 30),
                                            alignment: Alignment.center,
                                            child:Icon(Icons.bus_alert, color:Colors.red, size:100) ,),

                                          SizedBox(height: 10,),
                                          Container(
                                            width: 320,
                                            height: 4,
                                            decoration: ShapeDecoration(
                                              color: Color(0xFFD9D9D9),
                                              shape: RoundedRectangleBorder(
                                                borderRadius: BorderRadius.circular(10),
                                              ),
                                            ),
                                          ),
                                          SizedBox(height: 20,),

                                          Text(
                                            'Invalid Ticket',
                                            textAlign: TextAlign.center,
                                            style: TextStyle(
                                              color: Colors.red,
                                              fontSize: 41,
                                              fontFamily: 'Inter',
                                              fontWeight: FontWeight.w600,
                                              height: 0,
                                            ),
                                          ),

                                          SizedBox(height: 15,),

                                          Align(
                                            alignment: Alignment.center,
                                            child: MaterialButton(
                                              onPressed: () async {
                                                try {
                                                  TicketService().CheckTicket(widget.code);
                                                  print("--------");

                                                  print(widget.closeScreen());
                                                  widget.closeScreen();
                                                  print("--------");
                                                  print(widget.closeScreen());

                                                  Navigator.pop(context);

                                                } catch (error) {
                                                  print('Error scan ticket par le controlleur');

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
                                                "Go Back",
                                                style: TextStyle(fontSize: 25),
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            )
                          ],
                        ),
                      );
                    },
                  ),
                );
              }
            }
          },
        ),
      ),
    );
  }
}

