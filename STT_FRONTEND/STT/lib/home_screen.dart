import 'package:flutter/material.dart';
import 'package:stt/payment_manager.dart';

const int prixTicket = 25;

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Column(
        children: [
          ElevatedButton(
            onPressed: () => PaymentManager.makePayment(prixTicket, "USD"),
            child: const Text("Pay $prixTicket"),
          )
        ],
      ),
    );
  }
}
