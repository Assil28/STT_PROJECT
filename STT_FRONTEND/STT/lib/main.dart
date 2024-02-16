import 'package:flutter/material.dart';
import 'package:stt/InterfaceUI/FomVoyage.dart';

//import 'package:flutter_pro/LoginScreen.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:stt/InterfaceUI/payment_scree.dart';
import 'package:stt/InterfaceUI/qr_scanner.dart';

void main() {
  Stripe.publishableKey =
      "pk_test_51ObMplKMb9izxsLhCho5F2R9fvurExAmUzn2Nu9EeLC9szpEGkPAPGuKGaAnlT63cP3fNHNwIdDA9oqQ4gCmCJEy00t1cIJOoN";

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Flutter Demo',
      home: const Qr_Scanner(),
    );
  }
}
