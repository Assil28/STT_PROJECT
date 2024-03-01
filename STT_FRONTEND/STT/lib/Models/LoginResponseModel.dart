import 'dart:convert';

LoginResponseModel loginResponseJson(String str) =>
    LoginResponseModel.fromJson(json.decode(str));

class LoginResponseModel {
  LoginResponseModel({
    required this.message,
    required this.user,
  });
  late final String message;
  late final User user;

  LoginResponseModel.fromJson(Map<String, dynamic> json) {
    message = json['message'];
    user = User.fromJson(json['user']);
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['message'] = message;
    _data['user'] = user.toJson();
    return _data;
  }
}

class User {
  String? id;
  String? userName;
  String? matricule;
  String? email;
  String? password;
  String? phone_number;
  DateTime? birthday;
  String? role;
  String? cin;

  User({
    required this.userName,
    required this.email,
    required this.password,
    required this.phone_number,
    required this.birthday,
    required this.role,
    required this.cin,
    String? matricule,
  });
  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'birthday': birthday?.toIso8601String(),
      'email': email,
      'password': password,
      'phone_number': phone_number,
      'role': role,
      'cin': cin,
      'matricule': matricule,
    };
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
        userName: json['userName'],
        email: json['email'],
        phone_number: json['phone_number'],
        password: json['password'],
        role: json['role'],
        cin: json['cin'],
        matricule: json['matricule'],
        birthday: json['birthday'] != null
            ? DateTime.parse(json['birthday'])
            : DateTime.now());
  }
}
