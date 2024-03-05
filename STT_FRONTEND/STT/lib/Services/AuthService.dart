import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:stt/Models/LoginRequestModel.dart';
import 'package:stt/Models/LoginResponseModel.dart';
import 'package:stt/Services/SharedService.dart';

class AuthService {
  static var client = http.Client();
  static const loginAPI = "api/users/login";
  static const String apiURL = '192.168.1.166:3800';
  static Future<bool> login(
    LoginRequestModel model,
  ) async {
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
    };
    var url = Uri.http(
      apiURL,
      loginAPI,
    );

    var response = await client.post(
      url,
      headers: requestHeaders,
      body: jsonEncode(model.toJson()),
    );

    if (response.statusCode == 200) {
      await SharedService.setLoginDetails(
        loginResponseJson(response.body),
      );
      print('sayeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

      return true;
    } else {
      return false;
    }
  }

  /* static Future<String> getUserProfile() async {
    var loginDetails = await SharedService.loginDetails();

    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ${loginDetails!.user.token}'
    };

    var url = Uri.http(Config.apiURL, Config.userProfileAPI);

    var response = await client.get(
      url,
      headers: requestHeaders,
    );

    if (response.statusCode == 200) {
      return response.body;
    } else {
      return "";
    }
  }
  */
}
