import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../Models/LoginResponseModel.dart';

class LoginDetailsScreen extends StatefulWidget {
  final LoginResponseModel loginResponseModel;
  const LoginDetailsScreen({Key? key, required this.loginResponseModel})
      : super(key: key);

  @override
  _LoginDetailsScreen createState() => _LoginDetailsScreen();
}

class _LoginDetailsScreen extends State<LoginDetailsScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          const Text("hello the user name is :"),
          Text(
            widget.loginResponseModel.user.userName.toString(),
            style: TextStyle(
                fontWeight: FontWeight.bold, fontSize: 20, color: Colors.white),
          ),
        ],
      ),
    );
  }
}