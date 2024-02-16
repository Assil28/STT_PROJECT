import 'package:flutter/material.dart';

class ResultScreen extends StatelessWidget {
  final String code;

  final Function() closeScreen;

  const ResultScreen({super.key,required this.closeScreen,required this.code});


  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
          margin: EdgeInsets.all(30),
          width: 100,
          child:Column(
              children: [
                Text("page result"),
                Text(this.code),
                MaterialButton(onPressed: (){
                  closeScreen();
                  Navigator.pop(context);
                },
                  child: Text("Click"),)

              ]
          )

      ),

    );
  }
}