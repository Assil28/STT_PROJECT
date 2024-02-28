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
  String qrCodeBase64="";

  @override
  void initState() {
    super.initState();
    print("ticket=");

    print(widget.ticket.qrCode.split(",")[1]);
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
                  child:
                  Image.memory(
                    base64Decode(widget.ticket.qrCode.split(",")[1]),
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
                                child: Row(
                                  children: [
                                    MaterialButton(
                                      onPressed: () async {
                                        try {} catch (error) {}
                                      },
                                      color: Color(0x99FF79B9),
                                      textColor: Colors.white,
                                      padding: EdgeInsets.all(10),
                                      minWidth: 100,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(20),
                                      ),
                                      child: Text(
                                        "Share",
                                        style: TextStyle(fontSize: 25),
                                      ),
                                    ),
                                    Container(
                                      width: 20,
                                    ),
                                    MaterialButton(
                                      onPressed: () async {
                                        try {} catch (error) {}
                                      },
                                      color: Color(0x99FF79B9),
                                      textColor: Colors.white,
                                      padding: EdgeInsets.all(10),
                                      minWidth: 100,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(20),
                                      ),
                                      child: Text(
                                        "Save",
                                        style: TextStyle(fontSize: 25),
                                      ),
                                    ),
                                  ],
                                )
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
