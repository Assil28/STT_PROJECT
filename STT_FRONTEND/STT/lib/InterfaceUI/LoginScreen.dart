import 'package:flutter/material.dart';
import 'package:flutter_login/flutter_login.dart';
import 'package:stt/InterfaceUI/qr_scanner.dart';

const users = {
  'assil.dkhil28@gmail.com': '12345',
  'hunter@gmail.com': 'hunter',
};

class LoginScreen extends StatelessWidget {
  const LoginScreen({Key? key});

  Duration get loginTime => const Duration(milliseconds: 2250);

  Future<String?> _authUser(LoginData data) {
    debugPrint('Name: ${data.name}, Password: ${data.password}');
    return Future.delayed(loginTime).then((_) {
      if (!users.containsKey(data.name)) {
        return 'User not exists';
      }
      if (users[data.name] != data.password) {
        return 'Password does not match';
      }
      return null;
    });
  }



  Future<String?> _signupUser(SignupData data) {
    debugPrint('Signup Name: ${data.name}, Password: ${data.password}');
    return Future.delayed(loginTime).then((_) {
      return null;
    });
  }

  Future<String> _recoverPassword(String name) {
    debugPrint('Name: $name');
    return Future.delayed(loginTime).then((_) {
      if (!users.containsKey(name)) {
        return 'User not exists';
      }
      return "null";
    });
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        // Retourner false pour désactiver le bouton de retour
        return false;
      },
      child: FlutterLogin(
        theme: LoginTheme(
          pageColorLight: Colors.blueGrey, // Couleur de fond de la page de connexion
        ),
        title: 'STT tansport',
        logo: const AssetImage("images/stt_logo.png"),
        onLogin: (loginData) async {
          String? authResult = await _authUser(loginData);
          if (authResult == null) {
            // L'authentification a réussi, vous pouvez accéder aux données de l'utilisateur ici
            String email = loginData.name;
            String password = loginData.password;

            // Faites quelque chose avec les données de l'utilisateur
            print('Email de l\'utilisateur connecté : $email');
            print('Mot de passe de l\'utilisateur connecté : $password');

            // Naviguez vers une autre page ou effectuez d'autres actions nécessaires
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => Qr_Scanner()),
            );
          } else {
            // L'authentification a échoué, gérer en conséquence
            print('Erreur d\'authentification : $authResult');
          }
        },


        onSubmitAnimationCompleted: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => Qr_Scanner()),
          );
        },
        onRecoverPassword: _recoverPassword,
      ),
    );
  }
}
