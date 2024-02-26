import 'package:flutter/material.dart';
import 'package:stt/Models/TicketModel.dart';
import 'package:stt/Models/VoyageModel.dart';
import 'package:stt/Services/VoyageService.dart';
import 'dart:convert';

class TicketFinal extends StatefulWidget {
  final TicketModel ticket;
  final Voyage voyage;
  const TicketFinal({Key? key, required this.ticket, required this.voyage})
      : super(key: key);

  @override
  _TicketFinalState createState() => _TicketFinalState();
}

class _TicketFinalState extends State<TicketFinal> {
  VoyageService voyageService = new VoyageService();

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
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
                    padding:
                        const EdgeInsets.only(top: 20, right: 50, left: 50),
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
                            'Ticket',
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
                  width: 500,
                  height: 812,
                  clipBehavior: Clip.antiAlias,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage("images/backgroundSTT.jpg"),
                      fit: BoxFit
                          .cover, // Ajuste l'image pour couvrir toute la zone
                    ),
                  ),
                  child: Stack(
                    children: [
                      Positioned(
                        left: 15,
                        top: 80,
                        child: Container(
                          width: 330,
                          height: 480,
                          padding: const EdgeInsets.only(
                              top: 20, right: 50, left: 50),
                          decoration: ShapeDecoration(
                            color: Colors.white.withOpacity(0.6000000238418579),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(32),
                            ),
                          ),
                          child: Column(
                            children: [
                              Container(
                                margin: EdgeInsets.only(bottom: 10),
                                child: Text(
                                  'Ticket',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 32,
                                    fontFamily: 'Inter',
                                    fontWeight: FontWeight.w600,
                                    height: 0,
                                  ),
                                ),
                              ),
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
                              SizedBox(
                                height: 15,
                              ),
                              SizedBox(
                                width: 215,
                                height: 46,
                                child: Text(
                                  ' Informations',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 25,
                                    fontFamily: 'Inter',
                                    fontWeight: FontWeight.w600,
                                    height: 0,
                                  ),
                                ),
                              ),
                              SizedBox(
                                height: 1,
                              ),
                              Row(
                                children: [
                                  Column(
                                    children: [
                                      Text(
                                        '${widget.voyage.heure_depart_voyage}',
                                        textAlign: TextAlign.start,
                                        style: TextStyle(
                                          color: Colors.black,
                                          fontSize: 28,
                                          fontFamily: 'Inter',
                                          fontWeight: FontWeight.w600,
                                          height: 0,
                                        ),
                                      ),
                                      Text(
                                        '${widget.voyage.ville_depart}',
                                        textAlign: TextAlign.center,
                                        style: TextStyle(
                                          color: Colors.black,
                                          fontSize: 26,
                                          fontFamily: 'Inter',
                                          fontWeight: FontWeight.w600,
                                          height: 0,
                                        ),
                                      ),
                                    ],
                                  ),
                                  Text(
                                    "------->",
                                    style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20),
                                  ),
                                  Column(
                                    children: [
                                      Text(
                                        '${widget.voyage.heure_arrive_voyage}',
                                        textAlign: TextAlign.start,
                                        style: TextStyle(
                                          color: Colors.black,
                                          fontSize: 28,
                                          fontFamily: 'Inter',
                                          fontWeight: FontWeight.w600,
                                          height: 0,
                                        ),
                                      ),
                                      Text(
                                        '${widget.voyage.ville_arrive}',
                                        textAlign: TextAlign.center,
                                        style: TextStyle(
                                          color: Colors.black,
                                          fontSize: 26,
                                          fontFamily: 'Inter',
                                          fontWeight: FontWeight.w600,
                                          height: 0,
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                              SizedBox(
                                height: 10,
                              ),
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
                              SizedBox(
                                height: 10,
                              ),
                              Column(
                                children: [
                                  Text(
                                    'Tipe Date ',
                                    style: TextStyle(
                                      color: Colors.black,
                                      fontSize: 26,
                                      fontFamily: 'Inter',
                                      fontWeight: FontWeight.w600,
                                      height: 0,
                                    ),
                                  ),
                                  Text(
                                    '${widget.voyage.date.toString().substring(0, 10)}',
                                    style: TextStyle(
                                      color: Colors.black,
                                      fontSize: 30,
                                      fontFamily: 'Inter',
                                      fontWeight: FontWeight.w800,
                                      height: 0,
                                    ),
                                  ),
                                  Container(
                                    width: 10,
                                  ),
                                ],
                              ),
                              SizedBox(height: 5),
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
                              SizedBox(height: 5),
                Container(
                  width: 100,
                  height: 100,
                  child: Image.memory(
                base64Decode(
                    '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'),
              ),
                ),
                              SizedBox(height: 5),
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
                              SizedBox(height: 10),
                              Align(
                                alignment: Alignment.center,
                                child: MaterialButton(
                                  onPressed: () async {
                                    try {} catch (error) {}
                                  },
                                  color: Color(0x99FF79B9),
                                  textColor: Colors.white,
                                  padding: EdgeInsets.all(10),
                                  minWidth: 200,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                  child: Text(
                                    "Share",
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
