class LoginRequestModel {
  LoginRequestModel({
    this.matricule,
    this.password,
  });
  late final String? matricule;
  late final String? password;

  LoginRequestModel.fromJson(Map<String, dynamic> json) {
    matricule = json['matricule'];
    password = json['password'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['matricule'] = matricule;
    _data['password'] = password;
    return _data;
  }
}
