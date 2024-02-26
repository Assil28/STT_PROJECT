// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:stt/Models/TicketModel.dart';

class QrCodeSave extends StatelessWidget {
  final TicketModel ticket;

  const QrCodeSave({
    Key? key,
    required this.ticket,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        margin: EdgeInsets.all(30),
        width: 100,
        child: Column(
          children: [
            Text("Qr code "),
            MaterialButton(
              onPressed: () {
                try {
                  // Remove unnecessary characters from the base64 string
                  String cleanedBase64String =
                      this.ticket.qrCode.replaceAll(RegExp('[\r\n]'), '');

                  Uint8List bytes = base64.decode(cleanedBase64String);

                  // Display image directly
                  Image.memory(bytes);

                  // Print success message
                  print('Decoding successful. Bytes length: ${bytes.length}');
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Decoding successful!'),
                      duration: Duration(seconds: 3),
                    ),
                  );
                } catch (e, stackTrace) {
                  // Print error details
                  print('Error decoding base64 string: $e');
                  print('Stack trace: $stackTrace');

                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Error decoding image'),
                      duration: Duration(seconds: 3),
                    ),
                  );
                }
              },
              child: Text("Save"),
            )
          ],
        ),
      ),
    );
  }
}
