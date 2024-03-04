// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:qr_scanner_overlay/qr_scanner_overlay.dart';
import 'package:stt/InterfaceUI/result_screenScanner.dart';
import 'package:stt/Models/LoginResponseModel.dart';

import 'LoginScreen.dart';

const bgColor = Color(0xfffafafa);

class Qr_Scanner extends StatefulWidget {
  final LoginResponseModel loginResponse;

  const Qr_Scanner({
    Key? key,
    required this.loginResponse,
  }) : super(key: key);

  @override
  State<StatefulWidget> createState() => Qr_ScannerState();
}

class Qr_ScannerState extends State<Qr_Scanner> {
  bool isScanCompleted = false;

  void closeScreen() {
    this.isScanCompleted = false;
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        backgroundColor: Color(0x99FF79B9),
        centerTitle: true,
        title: Container(
          child: Row(
            children: [
              const Icon(
                Icons.person,
                color: Colors.white,
              ),
              Container(
                width: 5,
              ),
              Text(
                widget.loginResponse.user.userName.toString(),
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                    color: Colors.white),
              ),
              Container(
                width: 10,
              ),
              const Text(
                "Controller",
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                    color: Colors.lightBlue),
              ),
              Container(
                width: 1,
              ),
              IconButton(
                icon: const Icon(Icons.logout),
                onPressed: () {
                  Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => LoginScreen()));
                },
              ),
            ],
          ),
        ),
      ),
      drawer: Drawer(
        child: ListView(
          // Important: Remove any padding from the ListView.
          padding: EdgeInsets.zero,
          children: [
            const DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Text('Username:'),
            ),
            ListTile(
              title: const Text('Home'),
            ),
            ListTile(
              title: const Text('Business'),
            ),
            ListTile(
              title: const Text('School'),
            ),
          ],
        ),
      ),
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage("images/backgroundSTT.jpg"),
            fit: BoxFit.cover, // Ajuste l'image pour couvrir toute la zone
          ),
        ),
        width: double.infinity,
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            Expanded(
                child: Container(
                    child: Column(children: [
              SizedBox(
                height: 50,
              ),
              Text(
                "Place the QR code in the area",
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                    color: Colors.white),
              ),
              Text(
                "Scanning will be automaticaly",
                style:
                    TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
              ),
            ]))),
            Expanded(
                flex: 4,
                child: Stack(
                  children: [
                    MobileScanner(
                      //allowDuplicates: true,
                      controller: MobileScannerController(
                          detectionSpeed: DetectionSpeed.noDuplicates),
                      onDetect: (capture) {
                        if (!isScanCompleted && capture.barcodes.isNotEmpty) {
                          final String code =
                              capture.barcodes.first.rawValue ?? '---';
                          print("fl cam id= " + code);
                          isScanCompleted = true;
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => ResultScreen(
                                    closeScreen: closeScreen, code: code)),
                          );
                        }
                      },
                    ),
                    QRScannerOverlay(imagePath: "images/backgroundSTT.jpg"),
                  ],
                )),
            Expanded(child: Container()),
          ],
        ),
      ),
    );
  }
}
