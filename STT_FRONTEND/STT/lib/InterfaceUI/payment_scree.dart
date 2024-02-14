import 'package:flutter/material.dart';
import 'package:stt/Models/TicketModel.dart';
import 'package:stt/Services/VoyageService.dart';
import 'package:stt/payment_manager.dart';

class PaymentScreen extends StatefulWidget {
  final TicketModel ticket;
  const PaymentScreen({Key? key, required this.ticket}) : super(key: key);

  @override
  _PaymentScreenState createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  double _price = 0.0;

  @override
  void initState() {
    super.initState();
    _initializePrice();
  }

  Future<void> _initializePrice() async {
    try {
      double price = await _fetchPrice();
      setState(() {
        _price = price;
      });
    } catch (error) {
      print('Error initializing price: $error');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error initializing price'),
          duration: Duration(seconds: 3),
        ),
      );
    }
  }

  Future<double> _fetchPrice() async {
    if (widget.ticket == null) {
      print("ticket is null");
    }
    try {
      VoyageService voyageService = VoyageService();
      return await voyageService.getPriceByVoyage(widget.ticket.voyageId);
    } catch (error) {
      print('Error fetching voyage price: $error');
      throw 'Error fetching price';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Card(
            color: Color(0xFFAE5498),
            elevation: 20,
            shadowColor: Colors.green,
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            margin: EdgeInsets.all(20),
            child: ListTile(
              title: Text('Numero de cin : ${widget.ticket.numTel}'),
              subtitle: Text("Date d'achat :${widget.ticket.dateAchat}"),
            ),
          ),
          ElevatedButton(
            onPressed: () async {
              try {
                PaymentManager.makePayment(_price, "TND");
                print('Fetched price: $_price');
              } catch (error) {
                print('Error making payment: $error');
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Error making payment'),
                    duration: Duration(seconds: 3),
                  ),
                );
              }
            },
            child: Text("Pay $_price"),
          )
        ],
      ),
    );
  }
}
