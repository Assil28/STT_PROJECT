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
  String? id; // changer en _id
  String? userName; // garder tel quel
  String? matricule; // garder tel quel
  String? email;
  String? password;
  String? phone_number;
  DateTime? birthday;
  String? role;
  String? cin;

  User({
    required this.id, // changer en _id
    required this.userName,
    required this.email,
    required this.password,
    required this.phone_number,
    required this.birthday,
    required this.role,
    required this.cin,
    required this.matricule, // garder tel quel
  });
  Map<String, dynamic> toJson() {
    return {
      '_id': id, // changer en _id
      'userName': userName,
      'email': email,
      'password': password,
      'phone_number': phone_number,
      'role': role,
      'cin': cin,
      'matricule': matricule, // garder tel quel
      'birthday': birthday?.toIso8601String(),
    };
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['_id'], // changer en _id
      userName: json['userName'],
      email: json['email'],
      password: json['password'],
      phone_number: json['phone_number'],
      role: json['role'],
      cin: json['cin'],
      matricule: json['matricule'], // garder tel quel
      birthday: json['birthday'] != null
          ? DateTime.parse(json['birthday'])
          : DateTime.now(),
    );
  }
}
